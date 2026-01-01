"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// SPFx-specific imports for service management and page context
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_page_context_1 = require("@microsoft/sp-page-context");
// PnP JS imports for SharePoint data access
var sp_1 = require("@pnp/sp");
require("@pnp/sp/webs");
require("@pnp/sp/lists");
require("@pnp/sp/items");
// Utility imports
var utils_1 = require("../utils"); // Logger utility for tracking events and errors
var html_entities_1 = require("html-entities"); // Decode HTML entities for readable tag values
/**
 * SharePointService class provides methods for retrieving anchor tags and processing page data.
 * This service interacts with SharePoint to fetch page content, extract anchor tags from headings,
 * and apply transformations for display.
 */
var SharePointService = /** @class */ (function () {
    /**
     * Initializes the SharePoint service and retrieves page context.
     * Sets up the SPFI instance to interact with SharePoint data.
     * @param serviceScope - The scope for dependency injection and service management.
     */
    function SharePointService(serviceScope) {
        var _this = this;
        /**
         * Retrieves anchor tags from page content based on provided properties.
         * Filters headings according to the configuration and generates anchor tags.
         * @param props - Configuration properties specifying which headings to process.
         * @returns A promise resolving to an array of anchor tags.
         */
        this.getPageAnchorTags = function (props) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var pageAnchorTags, page, content, parser, doc, headings, filteredHeadings, pageUrl;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageAnchorTags = [];
                        return [4 /*yield*/, this.sp.web.lists.getById(this.listId).items.getById(this.listItemId)
                                .select('CanvasContent1', 'FileRef')()];
                    case 1:
                        page = _a.sent();
                        content = page.CanvasContent1;
                        parser = new DOMParser();
                        doc = parser.parseFromString(content, 'text/html');
                        headings = Array.from(doc.querySelectorAll('h2, h3, h4'));
                        filteredHeadings = headings.filter(function (heading) {
                            var tagName = heading.tagName.toLowerCase();
                            var className = heading.getAttribute('class') || '';
                            // Exclude web part titles that have the lineHeight1_4 class
                            // Web part titles typically have: "headingSpacingAbove headingSpacingBelow lineHeight1_4"
                            if (className.includes('lineHeight1_4')) {
                                return false;
                            }
                            return (tagName === 'h2' && props.processH2) ||
                                (tagName === 'h3' && props.processH3) ||
                                (tagName === 'h4' && props.processH4);
                        });
                        if (filteredHeadings.length > 0) {
                            pageUrl = this.absoluteUrl.split(this.serverRelativeUrl)[0] + page.FileRef;
                            if (filteredHeadings.length > 1 && props.ignoreSecondLastTag) {
                                filteredHeadings.splice(filteredHeadings.length - 2, 1);
                            }
                            if (props.ignoreLastTag) {
                                filteredHeadings.pop();
                            }
                            pageAnchorTags = this.getAnchorTagsList(filteredHeadings, pageUrl, props);
                        }
                        return [2 /*return*/, pageAnchorTags];
                }
            });
        }); };
        this.logger = utils_1.Logger.getInstance();
        serviceScope.whenFinished(function () {
            _this.pageContext = serviceScope.consume(sp_page_context_1.PageContext.serviceKey);
            _this.serverRelativeUrl = _this.pageContext.web.serverRelativeUrl;
            _this.absoluteUrl = _this.pageContext.site.absoluteUrl;
            _this.listId = _this.pageContext.list.id.toString();
            _this.listItemId = _this.pageContext.listItem.id;
            _this.sp = (0, sp_1.spfi)().using((0, sp_1.SPFx)({ pageContext: _this.pageContext }));
        });
    }
    /**
     * Generates a list of anchor tags from filtered headings and configuration options.
     * Each anchor tag includes a URL, an icon (if applicable), and the display value.
     * @param headings - Filtered heading elements from page content.
     * @param pageFileRef - Reference URL for the page.
     * @param props - Configuration for icon display and layout.
     * @returns An array of anchor tags formatted for display.
     */
    SharePointService.prototype.getAnchorTagsList = function (headings, pageFileRef, props) {
        var anchorTagsList = [];
        for (var _i = 0, headings_1 = headings; _i < headings_1.length; _i++) {
            var heading = headings_1[_i];
            var cleanAnchorTag = heading.textContent || '';
            // Skip headings with no meaningful content (empty or whitespace only)
            if (!cleanAnchorTag.trim()) {
                continue;
            }
            var tagID = this.getAnchorID(cleanAnchorTag);
            var finalAnchorTag = this.stripAlphaNumericOrdering(cleanAnchorTag);
            var tagName = heading.tagName.toLowerCase();
            var iconValue = '';
            if (!props.toggleNumericLayout) {
                if (tagName === 'h2') {
                    iconValue = props.iconH2;
                }
                else if (tagName === 'h3') {
                    iconValue = props.iconH3;
                }
                else if (tagName === 'h4') {
                    iconValue = props.iconH4;
                }
            }
            anchorTagsList.push({
                TagUrl: "".concat(pageFileRef, "#").concat(tagID),
                TagIcon: iconValue,
                TagValue: (0, html_entities_1.decode)(finalAnchorTag, { level: 'html5' })
            });
        }
        return anchorTagsList;
    };
    /**
     * Generates a URL-safe anchor ID from a given heading text.
     * Replaces invalid characters, converts to lowercase, and encodes the result.
     * @param tag - The heading text content.
     * @returns A URL-safe, unique anchor ID.
     */
    SharePointService.prototype.getAnchorID = function (tag) {
        // Replace all not allowed characters
        var specialCharExcluderegex = /[^a-zA-Z0-9ÜÄÖäöü_,!.$£¨*ç()§+«»€°´‘\u2013\u2014ô’àÀèÈìÌòÒùÙáÁéÉíÍóÓúÚýÝâÂêÊîÎôÔûÛãÃñÑõÕÇç¢œŒÆæß¿]/gm;
        var trimSplCharStr = (0, html_entities_1.decode)(tag, { level: 'html5' }).replace(specialCharExcluderegex, '-');
        // Replace whitespaces with '-'
        var replaceSpaceStr = trimSplCharStr.replace(/\s+/gm, '-');
        // Replace multiple '-' with a single '-'
        var trimFinal = replaceSpaceStr.replace(/-+/gm, '-');
        // Remove '-' at the beginning or end
        var cleanID = trimFinal.replace(/^-+|-+$/g, '');
        // Convert to lowercase and encode URI component
        return encodeURIComponent(cleanID.toLowerCase());
    };
    /**
     * Strips leading numeric ordering from a tag string (e.g., '1. Title' becomes 'Title').
     * This method removes ordering prefixes to simplify the display of tag values.
     * @param tag - The heading text content.
     * @returns A string with numeric ordering removed, if present.
     */
    SharePointService.prototype.stripAlphaNumericOrdering = function (tag) {
        var match = tag.match(/^\s*\d+\.\s*(.*)/);
        return match ? match[1].trim() : tag.trim();
    };
    SharePointService.serviceKey = sp_core_library_1.ServiceKey.create('SPFx:SharePointService', SharePointService);
    return SharePointService;
}());
exports.default = SharePointService;
//# sourceMappingURL=SharePointService.js.map