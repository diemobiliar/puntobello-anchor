// SPFx-specific imports for service management and page context
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";

// PnP JS imports for SharePoint data access
import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

// Models defining types and interfaces
import { IAnchorTag, IAnchorTagProps, IRootEnv } from "../models";

// Utility imports
import { Logger } from "../utils"; // Logger utility for tracking events and errors
import { decode } from "html-entities"; // Decode HTML entities for readable tag values

/**
 * Interface for SharePoint service used to retrieve anchor tags.
 */
export interface ISharePointService {
    getPageAnchorTags(props: IAnchorTagProps): Promise<IAnchorTag[]>;
}

/**
 * SharePointService class provides methods for retrieving anchor tags and processing page data.
 * This service interacts with SharePoint to fetch page content, extract anchor tags from headings, 
 * and apply transformations for display.
 */
export default class SharePointService {
    public static readonly serviceKey: ServiceKey<ISharePointService> =
        ServiceKey.create<ISharePointService>('SPFx:SharePointService', SharePointService);

    private sp: SPFI;
    private serverRelativeUrl: string;
    private absoluteUrl: string;
    private listId: string;
    private listItemId: number;
    private pageContext: PageContext;
    private logger: Logger;
    private rootEnv: IRootEnv;

    /**
     * Initializes the SharePoint service and retrieves page context.
     * Sets up the SPFI instance to interact with SharePoint data.
     * @param serviceScope - The scope for dependency injection and service management.
     */
    constructor(serviceScope: ServiceScope) {
        this.logger = Logger.getInstance();

        serviceScope.whenFinished(() => {
            this.pageContext = serviceScope.consume(PageContext.serviceKey);
            this.serverRelativeUrl = this.pageContext.web.serverRelativeUrl;
            this.absoluteUrl = this.pageContext.site.absoluteUrl;
            this.listId = this.pageContext.list.id.toString();
            this.listItemId = this.pageContext.listItem.id;
            this.sp = spfi().using(SPFx({ pageContext: this.pageContext }));
        });
    }

    /**
     * Retrieves anchor tags from page content based on provided properties.
     * Filters headings according to the configuration and generates anchor tags.
     * @param props - Configuration properties specifying which headings to process.
     * @returns A promise resolving to an array of anchor tags.
     */
    public getPageAnchorTags = async (props: IAnchorTagProps): Promise<IAnchorTag[]> => {    
        let pageAnchorTags: IAnchorTag[] = [];
        const page = await this.sp.web.lists.getById(this.listId).items.getById(this.listItemId)
            .select('CanvasContent1', 'FileRef')();
    
        const content: string = page.CanvasContent1;
    
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
            const pageUrl = this.absoluteUrl.split(this.serverRelativeUrl)[0] + page.FileRef;
    
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
     * Generates a list of anchor tags from filtered headings and configuration options.
     * Each anchor tag includes a URL, an icon (if applicable), and the display value.
     * @param headings - Filtered heading elements from page content.
     * @param pageFileRef - Reference URL for the page.
     * @param props - Configuration for icon display and layout.
     * @returns An array of anchor tags formatted for display.
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
     * Generates a URL-safe anchor ID from a given heading text.
     * Replaces invalid characters, converts to lowercase, and encodes the result.
     * @param tag - The heading text content.
     * @returns A URL-safe, unique anchor ID.
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
     * This method removes ordering prefixes to simplify the display of tag values.
     * @param tag - The heading text content.
     * @returns A string with numeric ordering removed, if present.
     */
    private stripAlphaNumericOrdering(tag: string): string {
        const match = tag.match(/^\s*\d+\.\s*(.*)/);
        return match ? match[1].trim() : tag.trim();
    }
}
