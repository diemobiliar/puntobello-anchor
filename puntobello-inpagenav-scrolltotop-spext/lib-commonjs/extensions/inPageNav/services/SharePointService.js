"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharePointService = void 0;
var tslib_1 = require("tslib");
// SPFx-specific imports
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_page_context_1 = require("@microsoft/sp-page-context");
// PnP JS imports for SharePoint data access
var sp_1 = require("@pnp/sp");
// PnP SP Libraries for accessing SharePoint Webs, Lists, and Items
require("@pnp/sp/webs");
require("@pnp/sp/lists");
require("@pnp/sp/items");
// Utilities
var utils_1 = require("../utils");
var html_entities_1 = require("html-entities");
/**
 * Service for retrieving SharePoint page context and processing anchor tags within a page.
 */
var SharePointService = /** @class */ (function () {
    /**
     * Initializes SharePoint Service, retrieves page context, and establishes necessary service properties.
     * @param serviceScope - The scope in which the service operates, handling dependency injection.
     */
    function SharePointService(serviceScope) {
        var _this = this;
        this.isInitialized = false;
        /**
         * Retrieves the configuration settings of the anchor web part from the page content.
         * Parses the 'data-sp-webpartdata' JSON attribute for configuration.
         * @returns A promise resolving to IAnchorTagProps with the web part configuration.
         */
        this.getAnchorWebpartConfiguration = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var content, parser, doc, webPartElement, webPartDataAttr, webPartData, decodedWebPartData, toggleNumericLayout, processH2, processH3, processH4, ignoreLastTag, ignoreSecondLastTag, iconH2, iconH3, iconH4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialized()];
                    case 1:
                        _a.sent();
                        content = this.pageContent.CanvasContent1;
                        parser = new DOMParser();
                        doc = parser.parseFromString(content, 'text/html');
                        webPartElement = doc.querySelector('[data-sp-webpartdata*="69abf377-77b4-4042-9039-bd1f42a14d64"]');
                        if (!webPartElement) {
                            return [2 /*return*/, { anchorWebpartFound: false }];
                        }
                        webPartDataAttr = webPartElement.getAttribute('data-sp-webpartdata');
                        if (!webPartDataAttr) {
                            this.logger.error("No data found in 'data-sp-webpartdata' attribute.");
                            return [2 /*return*/, { anchorWebpartFound: false }];
                        }
                        try {
                            decodedWebPartData = JSON.parse(webPartDataAttr.replace(/&quot;/g, '"'));
                            webPartData = decodedWebPartData.properties;
                        }
                        catch (error) {
                            this.logger.error("Failed to parse web part data JSON.", error);
                            return [2 /*return*/, { anchorWebpartFound: false }];
                        }
                        toggleNumericLayout = webPartData.toggleNumericLayout === true;
                        processH2 = webPartData.processH2 === true;
                        processH3 = webPartData.processH3 === true;
                        processH4 = webPartData.processH4 === true;
                        ignoreLastTag = webPartData.ignoreLastTag === true;
                        ignoreSecondLastTag = webPartData.ignoreSecondLastTag === true;
                        iconH2 = webPartData.iconH2 || '';
                        iconH3 = webPartData.iconH3 || '';
                        iconH4 = webPartData.iconH4 || '';
                        return [2 /*return*/, {
                                anchorWebpartFound: true,
                                toggleNumericLayout: toggleNumericLayout,
                                processH2: processH2,
                                iconH2: iconH2,
                                processH3: processH3,
                                iconH3: iconH3,
                                processH4: processH4,
                                iconH4: iconH4,
                                ignoreSecondLastTag: ignoreSecondLastTag,
                                ignoreLastTag: ignoreLastTag
                            }];
                }
            });
        }); };
        /**
         * Retrieves anchor tags from the page content based on the provided properties.
         * Filters headings and configures anchor tags according to the specified properties.
         * @param props - The IAnchorTagProps object specifying heading processing rules and icon details.
         * @returns A promise resolving to an array of IAnchorTag objects for each valid heading.
         */
        this.getPageAnchorTags = function (props) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var pageAnchorTags, content, parser, doc, headings, filteredHeadings, pageUrl;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialized()];
                    case 1:
                        _a.sent();
                        pageAnchorTags = [];
                        content = this.pageContent.CanvasContent1;
                        parser = new DOMParser();
                        doc = parser.parseFromString(content, 'text/html');
                        headings = Array.from(doc.querySelectorAll('h2, h3, h4'));
                        filteredHeadings = headings.filter(function (heading) {
                            var tagName = heading.tagName.toLowerCase();
                            return (tagName === 'h2' && props.processH2) ||
                                (tagName === 'h3' && props.processH3) ||
                                (tagName === 'h4' && props.processH4);
                        });
                        if (filteredHeadings.length > 0) {
                            pageUrl = this.absoluteUrl.split(this.serverRelativeUrl)[0] + this.pageContent.FileRef;
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
        this.initializationPromise = new Promise(function (resolve, reject) {
            try {
                serviceScope.whenFinished(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var _a;
                    var _b, _c, _d, _e, _f;
                    return tslib_1.__generator(this, function (_g) {
                        switch (_g.label) {
                            case 0:
                                this.pageContext = serviceScope.consume(sp_page_context_1.PageContext.serviceKey);
                                this.serverRelativeUrl = this.pageContext.web.serverRelativeUrl;
                                this.absoluteUrl = this.pageContext.site.absoluteUrl;
                                this.listId = (_d = (_c = (_b = this.pageContext.list) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '';
                                this.listItemId = (_f = (_e = this.pageContext.listItem) === null || _e === void 0 ? void 0 : _e.id) !== null && _f !== void 0 ? _f : 0;
                                this.sp = (0, sp_1.spfi)().using((0, sp_1.SPFx)({ pageContext: this.pageContext }));
                                _a = this;
                                return [4 /*yield*/, this.sp.web.lists.getById(this.listId).items.getById(this.listItemId)
                                        .select('CanvasContent1', 'FileRef')()];
                            case 1:
                                _a.pageContent = _g.sent();
                                this.isInitialized = true;
                                resolve();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            catch (error) {
                _this.logger.error('Error initializing SharePointService', error);
                reject(error);
            }
        });
    }
    /**
     * Ensures the initialization of the service is complete before proceeding.
     */
    SharePointService.prototype.ensureInitialized = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.isInitialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initializationPromise];
                    case 1:
                        _a.sent(); // Wait for initialization to complete
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates a list of anchor tags from the filtered headings, configuring each tag's URL, icon, and value.
     * @param headings - Array of HTML elements representing the headings.
     * @param pageFileRef - The URL reference for the page.
     * @param props - The IAnchorTagProps for defining the structure of each anchor tag.
     * @returns Array of IAnchorTag objects created from the headings.
     */
    SharePointService.prototype.getAnchorTagsList = function (headings, pageFileRef, props) {
        var _a, _b, _c;
        var anchorTagsList = [];
        for (var _i = 0, headings_1 = headings; _i < headings_1.length; _i++) {
            var heading = headings_1[_i];
            var cleanAnchorTag = heading.textContent || '';
            var tagID = this.getAnchorID(cleanAnchorTag);
            var finalAnchorTag = this.stripAlphaNumericOrdering(cleanAnchorTag);
            var tagName = heading.tagName.toLowerCase();
            var iconValue = '';
            if (!props.toggleNumericLayout) {
                if (tagName === 'h2') {
                    iconValue = (_a = props.iconH2) !== null && _a !== void 0 ? _a : '';
                }
                else if (tagName === 'h3') {
                    iconValue = (_b = props.iconH3) !== null && _b !== void 0 ? _b : '';
                }
                else if (tagName === 'h4') {
                    iconValue = (_c = props.iconH4) !== null && _c !== void 0 ? _c : '';
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
     * Generates a URL-safe anchor ID from a given heading tag.
     * Replaces invalid characters, converts to lowercase, and encodes the result.
     * @param tag - The heading text content.
     * @returns A string representing a URL-safe, unique anchor ID.
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
     * @param tag - The heading text content.
     * @returns A string with the numeric ordering removed, if present.
     */
    SharePointService.prototype.stripAlphaNumericOrdering = function (tag) {
        var match = tag.match(/^\s*\d+\.\s*(.*)/);
        return match ? match[1].trim() : tag.trim();
    };
    SharePointService.serviceKey = sp_core_library_1.ServiceKey.create('SPFx:SharePointService', SharePointService);
    return SharePointService;
}());
exports.SharePointService = SharePointService;
//# sourceMappingURL=SharePointService.js.map