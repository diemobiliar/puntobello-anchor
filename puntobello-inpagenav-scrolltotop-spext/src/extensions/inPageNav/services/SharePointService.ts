// SPFx-specific imports
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";

// PnP JS imports for SharePoint data access
import { SPFI, spfi, SPFx } from "@pnp/sp";
// PnP SP Libraries for accessing SharePoint Webs, Lists, and Items
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

// Models
import { IAnchorTag, IAnchorTagProps, IRootEnv } from "../models";

// Utilities
import { Logger } from "../utils";
import { decode } from "html-entities";

/**
 * Interface defining SharePoint Service methods
 */
export interface ISharePointService {
    getAnchorWebpartConfiguration(): Promise<IAnchorTagProps>;
    getPageAnchorTags(props: IAnchorTagProps): Promise<IAnchorTag[]>;
}

/**
 * Service for retrieving SharePoint page context and processing anchor tags within a page.
 */
export class SharePointService {
    public static readonly serviceKey: ServiceKey<ISharePointService> =
        ServiceKey.create<ISharePointService>('SPFx:SharePointService', SharePointService);

    private sp: SPFI;
    private serverRelativeUrl: string;
    private absoluteUrl: string;

    private listId: string;
    private listItemId: number;
    private pageContext: PageContext;
    private pageContent: any;
    private logger: Logger;
    private rootEnv: IRootEnv;
    private isInitialized = false;
    private initializationPromise: Promise<void>;

    /**
     * Initializes SharePoint Service, retrieves page context, and establishes necessary service properties.
     * @param serviceScope - The scope in which the service operates, handling dependency injection.
     */
    constructor(serviceScope: ServiceScope) {
        this.logger = Logger.getInstance();

        this.initializationPromise = new Promise((resolve, reject) => {
            try {
                serviceScope.whenFinished(async () => {
                    this.pageContext = serviceScope.consume(PageContext.serviceKey);
                    this.serverRelativeUrl = this.pageContext.web.serverRelativeUrl;
                    this.absoluteUrl = this.pageContext.site.absoluteUrl;
                    this.listId = this.pageContext.list.id.toString();
                    this.listItemId = this.pageContext.listItem.id;

                    this.sp = spfi().using(SPFx({ pageContext: this.pageContext }));
                    this.pageContent = await this.sp.web.lists.getById(this.listId).items.getById(this.listItemId)
                        .select('CanvasContent1', 'FileRef')();
                    this.isInitialized = true;
                    resolve();
                });
            } catch (error) {
                this.logger.error('Error initializing SharePointService', error);
                reject(error);
            }
        });
    }

    /**
     * Ensures the initialization of the service is complete before proceeding.
     */
    private async ensureInitialized(): Promise<void> {
        if (!this.isInitialized) {
            await this.initializationPromise; // Wait for initialization to complete
        }
    }

    /**
     * Retrieves the configuration settings of the anchor web part from the page content.
     * Parses the 'data-sp-webpartdata' JSON attribute for configuration.
     * @returns A promise resolving to IAnchorTagProps with the web part configuration.
     */
    public getAnchorWebpartConfiguration = async (): Promise<IAnchorTagProps> => {
        await this.ensureInitialized();
    
        const content = this.pageContent.CanvasContent1;
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
    
        // Locate the web part with the specific ID
        const webPartElement = doc.querySelector('[data-sp-webpartdata*="69abf377-77b4-4042-9039-bd1f42a14d64"]');
    
        if (!webPartElement) {
            return { anchorWebpartFound: false };
        }
    
        // Parse the data-sp-webpartdata JSON string
        const webPartDataAttr = webPartElement.getAttribute('data-sp-webpartdata');
        if (!webPartDataAttr) {
            this.logger.error("No data found in 'data-sp-webpartdata' attribute.");
            return { anchorWebpartFound: false };
        }
    
        // Decode and parse the JSON string
        let webPartData;
        try {
            const decodedWebPartData = JSON.parse(webPartDataAttr.replace(/&quot;/g, '"'));
            webPartData = decodedWebPartData.properties;
        } catch (error) {
            this.logger.error("Failed to parse web part data JSON.", error);
            return { anchorWebpartFound: false };
        }
    
        // Extract the configuration properties from the parsed JSON
        const toggleNumericLayout = webPartData.toggleNumericLayout === true;
        const processH2 = webPartData.processH2 === true;
        const processH3 = webPartData.processH3 === true;
        const processH4 = webPartData.processH4 === true;
        const ignoreLastTag = webPartData.ignoreLastTag === true;
        const ignoreSecondLastTag = webPartData.ignoreSecondLastTag === true;
        const iconH2 = webPartData.iconH2 || '';
        const iconH3 = webPartData.iconH3 || '';
        const iconH4 = webPartData.iconH4 || '';
    
        return {
            anchorWebpartFound: true,
            toggleNumericLayout,
            processH2,
            iconH2,
            processH3,
            iconH3,
            processH4,
            iconH4,
            ignoreSecondLastTag,
            ignoreLastTag
        };
    }
    

    /**
     * Retrieves anchor tags from the page content based on the provided properties.
     * Filters headings and configures anchor tags according to the specified properties.
     * @param props - The IAnchorTagProps object specifying heading processing rules and icon details.
     * @returns A promise resolving to an array of IAnchorTag objects for each valid heading.
     */
    public getPageAnchorTags = async (props: IAnchorTagProps): Promise<IAnchorTag[]> => {
        await this.ensureInitialized();
        let pageAnchorTags: IAnchorTag[] = [];

        const content: string = this.pageContent.CanvasContent1;
        
        // Use DOMParser to parse HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');

        // Collect all headings in document order
        const headings = Array.from(doc.querySelectorAll('h2, h3, h4'));

        // Filter headings based on props to maintain natural order
        const filteredHeadings = headings.filter(heading => {
            const tagName = heading.tagName.toLowerCase();
            return (tagName === 'h2' && props.processH2) ||
                (tagName === 'h3' && props.processH3) ||
                (tagName === 'h4' && props.processH4);
        });

        if (filteredHeadings.length > 0) {
            const pageUrl = this.absoluteUrl.split(this.serverRelativeUrl)[0] + this.pageContent.FileRef;

            if (filteredHeadings.length > 1 && props.ignoreSecondLastTag) {
                filteredHeadings.splice(filteredHeadings.length - 2, 1);
            }

            if (props.ignoreLastTag) {
                filteredHeadings.pop();
            }

            pageAnchorTags = this.getAnchorTagsList(filteredHeadings, pageUrl, props);
        }
        return pageAnchorTags;
    }

    /**
     * Creates a list of anchor tags from the filtered headings, configuring each tag's URL, icon, and value.
     * @param headings - Array of HTML elements representing the headings.
     * @param pageFileRef - The URL reference for the page.
     * @param props - The IAnchorTagProps for defining the structure of each anchor tag.
     * @returns Array of IAnchorTag objects created from the headings.
     */
    private getAnchorTagsList(headings: Element[], pageFileRef: string, props: IAnchorTagProps): IAnchorTag[] {
        const anchorTagsList: IAnchorTag[] = [];

        for (const heading of headings) {
            const cleanAnchorTag = heading.textContent || '';
            const tagID = this.getAnchorID(cleanAnchorTag);
            const finalAnchorTag = this.stripAlphaNumericOrdering(cleanAnchorTag);
            const tagName = heading.tagName.toLowerCase();

            let iconValue = '';
            if (!props.toggleNumericLayout) {
                if (tagName === 'h2') {
                    iconValue = props.iconH2;
                } else if (tagName === 'h3') {
                    iconValue = props.iconH3;
                } else if (tagName === 'h4') {
                    iconValue = props.iconH4;
                }
            }

            anchorTagsList.push({
                TagUrl: `${pageFileRef}#${tagID}`,
                TagIcon: iconValue,
                TagValue: decode(finalAnchorTag, { level: 'html5' })
            });
        }

        return anchorTagsList;
    }

    /**
     * Generates a URL-safe anchor ID from a given heading tag.
     * Replaces invalid characters, converts to lowercase, and encodes the result.
     * @param tag - The heading text content.
     * @returns A string representing a URL-safe, unique anchor ID.
     */
    private getAnchorID(tag: string): string {
        // Replace all not allowed characters
        const specialCharExcluderegex = /[^a-zA-Z0-9ÜÄÖäöü_,!.$£¨*ç()§+«»€°´‘\u2013\u2014ô’àÀèÈìÌòÒùÙáÁéÉíÍóÓúÚýÝâÂêÊîÎôÔûÛãÃñÑõÕÇç¢œŒÆæß¿]/gm;
        const trimSplCharStr = decode(tag, { level: 'html5' }).replace(specialCharExcluderegex, '-');

        // Replace whitespaces with '-'
        const replaceSpaceStr = trimSplCharStr.replace(/\s+/gm, '-');

        // Replace multiple '-' with a single '-'
        const trimFinal = replaceSpaceStr.replace(/-+/gm, '-');

        // Remove '-' at the beginning or end
        const cleanID = trimFinal.replace(/^-+|-+$/g, '');

        // Convert to lowercase and encode URI component
        return encodeURIComponent(cleanID.toLowerCase());
    }
    
    /**
     * Strips leading numeric ordering from a tag string (e.g., '1. Title' becomes 'Title').
     * @param tag - The heading text content.
     * @returns A string with the numeric ordering removed, if present.
     */
    private stripAlphaNumericOrdering(tag: string): string {
        const match = tag.match(/^\s*\d+\.\s*(.*)/);
        return match ? match[1].trim() : tag.trim();
    }
}
