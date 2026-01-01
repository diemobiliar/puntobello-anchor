"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anchors = void 0;
var tslib_1 = require("tslib");
// React core library and hooks
var React = tslib_1.__importStar(require("react"));
var react_1 = require("react");
// Fluent UI components and controls
var react_2 = require("@fluentui/react");
var Placeholder_1 = require("@pnp/spfx-controls-react/lib/Placeholder");
var SharePointService_1 = tslib_1.__importDefault(require("../services/SharePointService")); // Service for retrieving SharePoint data
var strings = tslib_1.__importStar(require("InPageNavWebPartStrings")); // Localization strings for the component
var Anchors_module_scss_1 = tslib_1.__importDefault(require("./Anchors.module.scss")); // Scoped CSS module for component styling
var sp_core_library_1 = require("@microsoft/sp-core-library"); // SPFx constant for display modes (Edit/Read)
var AppContext_1 = require("../contexts/AppContext"); // Context provider for accessing global app context
var utils_1 = require("../utils"); // Utility to retrieve environment-based CSS styles
/**
 * Anchors component displays a list of anchor tags (links to sections on the page).
 * Supports displaying in both numbered (ordered list) and icon-based (unordered list) formats.
 * @param props - Configuration options for the anchors, passed as IAnchorTagProps.
 */
function Anchors(props) {
    var _this = this;
    // Destructuring context values using the custom hook
    var _a = (0, AppContext_1.useAppContext)(), context = _a.context, logger = _a.logger;
    // Consume the SharePoint service from the service scope
    var spo = context.serviceScope.consume(SharePointService_1.default.serviceKey);
    // Retrieve environment settings
    var rootEnv = (0, utils_1.getRootEnv)();
    // State to store the list of page anchor tags
    var _b = (0, react_1.useState)([]), PageTags = _b[0], setPageAnchorTags = _b[1];
    /**
     * useEffect to load page anchor tags when the component mounts or props change.
     */
    (0, react_1.useEffect)(function () {
        getPageAnchorTags();
    }, [props]);
    /**
     * Fetches anchor tags from the SharePointService based on the provided configuration props.
     * Sets the retrieved tags in component state for rendering.
     */
    var getPageAnchorTags = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var resultdata, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, spo.getPageAnchorTags(props)];
                case 1:
                    resultdata = _a.sent();
                    setPageAnchorTags(resultdata);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    logger.error('Anchors.tsx', 'getPageAnchorTags', error_1); // Log any errors encountered
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    /**
     * Renders an individual anchor item with an icon.
     * @param anchorProps - The properties for the anchor item, containing tag data.
     * @returns JSX element for an anchor link with an icon.
     */
    function AnchorItem(anchorProps) {
        var item = anchorProps.data;
        return (React.createElement(react_2.Link, { className: Anchors_module_scss_1.default.itemLink, href: item.TagUrl },
            React.createElement("div", { className: Anchors_module_scss_1.default.itemCell },
                React.createElement(react_2.Icon, { iconName: item.TagIcon, className: Anchors_module_scss_1.default.chevronIcon }),
                React.createElement("span", { className: Anchors_module_scss_1.default.itemContent }, item.TagValue))));
    }
    /**
     * Renders an individual anchor item without an icon.
     * @param aProps - The properties for the anchor item, containing tag data.
     * @returns JSX element for an anchor link without an icon.
     */
    function AnchorItemWithoutIcon(aProps) {
        var aitem = aProps.data;
        return (React.createElement(react_2.Link, { className: Anchors_module_scss_1.default.nitemLink, href: aitem.TagUrl },
            React.createElement("div", { className: Anchors_module_scss_1.default.nitemCell },
                React.createElement("span", { className: Anchors_module_scss_1.default.nitemContent }, aitem.TagValue))));
    }
    return (
    // Conditionally render based on whether page tags are available
    (PageTags && PageTags.length > 0) ?
        (props.toggleNumericLayout ?
            // Render as ordered list (numeric layout) without icons if `toggleNumericLayout` is true
            React.createElement("div", { style: (0, utils_1.getRootEnv)().css, className: Anchors_module_scss_1.default.anchorNavNumeric },
                React.createElement("div", { className: Anchors_module_scss_1.default.row },
                    React.createElement("ol", { className: Anchors_module_scss_1.default.nanchorNavNumericOrderedList }, PageTags.map(function (item, index) { return (React.createElement("li", { className: Anchors_module_scss_1.default.nlistitem, key: index },
                        React.createElement(AnchorItemWithoutIcon, { data: item }))); }))))
            :
                // Render as unordered list with icons if `toggleNumericLayout` is false
                React.createElement("div", { style: (0, utils_1.getRootEnv)().css, className: Anchors_module_scss_1.default.puntoBelloPageAnchors },
                    React.createElement("div", { className: Anchors_module_scss_1.default.row }, PageTags.map(function (item, index) { return (React.createElement("div", { className: Anchors_module_scss_1.default.column, key: index },
                        React.createElement(AnchorItem, { data: item }))); }))))
        :
            // Display placeholder in Edit mode if no anchor tags are found
            (props.displayMode === sp_core_library_1.DisplayMode.Edit ?
                React.createElement(Placeholder_1.Placeholder, { iconName: 'Edit', iconText: strings.NoAnchorsFound, description: strings.NoAnchorsFoundDescription })
                : null));
}
exports.Anchors = Anchors;
//# sourceMappingURL=Anchors.js.map