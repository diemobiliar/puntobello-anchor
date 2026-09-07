"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anchors = void 0;
var tslib_1 = require("tslib");
// Fluent UI imports for various components and hooks
var react_1 = require("@fluentui/react"); // UI components for icons, links, and modal dialogs
var react_hooks_1 = require("@fluentui/react-hooks"); // Hooks for managing boolean state and generating unique IDs
var react_icons_mdl2_1 = require("@fluentui/react-icons-mdl2"); // Specific Fluent UI icons
var React = tslib_1.__importStar(require("react")); // Core React library
var Anchors_module_scss_1 = tslib_1.__importDefault(require("./Anchors.module.scss")); // Scoped CSS module for component styling
var utils_1 = require("../../utils"); // Utility for retrieving environment variables for CSS
/**
 * Anchors component that displays a list of anchor tags within a modal.
 * The anchors can be displayed with or without icons, based on configuration.
 * @param props - The configuration and tags for rendering the anchor items.
 */
function Anchors(props) {
    // Boolean state to manage the visibility of the callout (modal)
    var _a = (0, react_hooks_1.useBoolean)(false), isCalloutVisible = _a[0], toggleIsCalloutVisible = _a[1].toggle;
    var buttonId = (0, react_hooks_1.useId)('anchors-callout-button'); // Unique ID for the callout button
    var titleId = (0, react_hooks_1.useId)('title'); // Unique ID for the modal title
    /**
     * Renders an anchor item with an icon.
     * @param item - An anchor tag to display with an icon.
     */
    var AnchorItem = function (item) {
        return (React.createElement(react_1.Link, { className: Anchors_module_scss_1.default.itemLink, href: item.TagUrl, onClick: toggleIsCalloutVisible },
            React.createElement("div", { className: Anchors_module_scss_1.default.itemCell },
                React.createElement(react_1.Icon, { iconName: item.TagIcon, className: Anchors_module_scss_1.default.chevronIcon }),
                React.createElement("span", { className: Anchors_module_scss_1.default.itemContent }, item.TagValue))));
    };
    /**
     * Renders an anchor item without an icon.
     * @param item - An anchor tag to display without an icon.
     */
    var AnchorItemWithoutIcon = function (item) {
        return (React.createElement(react_1.Link, { className: Anchors_module_scss_1.default.nitemLink, href: item.TagUrl, onClick: toggleIsCalloutVisible },
            React.createElement("div", { className: Anchors_module_scss_1.default.nitemCell },
                React.createElement("span", { className: Anchors_module_scss_1.default.nitemContent }, item.TagValue))));
    };
    // React effect to apply CSS environment variables when the callout (modal) is opened
    React.useEffect(function () {
        if (isCalloutVisible) {
            // Retrieve the root HTML element and environment-specific CSS variables
            var root_1 = document.documentElement;
            var envStyles_1 = (0, utils_1.getRootEnv)().css;
            // Apply each CSS variable to the root element
            Object.keys(envStyles_1).forEach(function (key) {
                root_1.style.setProperty(key, envStyles_1[key]);
            });
            return function () {
                // Optionally remove the variables when the modal is closed
                Object.keys(envStyles_1).forEach(function (key) {
                    root_1.style.removeProperty(key);
                });
            };
        }
    }, [isCalloutVisible]);
    return (React.createElement("div", { className: Anchors_module_scss_1.default.anchorsWrapper },
        React.createElement("div", { className: Anchors_module_scss_1.default.buttonMore },
            React.createElement(react_1.Link, { id: buttonId, className: Anchors_module_scss_1.default.link, onClick: toggleIsCalloutVisible },
                React.createElement(react_icons_mdl2_1.MoreVerticalIcon, { className: Anchors_module_scss_1.default.icon }))),
        React.createElement(react_1.Modal, { titleAriaId: titleId, isOpen: isCalloutVisible, onDismiss: toggleIsCalloutVisible, isClickableOutsideFocusTrap: true, isDarkOverlay: false, containerClassName: Anchors_module_scss_1.default.modalcontainer },
            React.createElement("div", { className: Anchors_module_scss_1.default.modalbody },
                (props.tags && props.tags.length > 0) ?
                    (props.config.toggleNumericLayout ?
                        // Numeric layout for anchors without icons
                        React.createElement("div", { className: Anchors_module_scss_1.default.anchorNavNumeric },
                            React.createElement("div", { className: Anchors_module_scss_1.default.row },
                                React.createElement("ol", { className: Anchors_module_scss_1.default.nanchorNavNumericOrderedList }, props.tags.map(function (item, index) { return (React.createElement("li", { className: Anchors_module_scss_1.default.nlistitem, key: index },
                                    React.createElement(AnchorItemWithoutIcon, tslib_1.__assign({}, item)))); }))))
                        :
                            // Default layout for anchors with icons
                            React.createElement("div", { className: Anchors_module_scss_1.default.PageAnchors },
                                React.createElement("div", { className: Anchors_module_scss_1.default.row }, props.tags.map(function (item, index) { return (React.createElement("div", { className: Anchors_module_scss_1.default.column, key: index },
                                    React.createElement(AnchorItem, tslib_1.__assign({}, item)))); }))))
                    : React.createElement(React.Fragment, null),
                React.createElement("div", { className: Anchors_module_scss_1.default.modalfooter },
                    React.createElement("div", { className: Anchors_module_scss_1.default.buttonModal },
                        React.createElement(react_1.Link, { className: Anchors_module_scss_1.default.link, onClick: toggleIsCalloutVisible },
                            React.createElement(react_icons_mdl2_1.CancelIcon, { className: Anchors_module_scss_1.default.icon }))))))));
}
exports.Anchors = Anchors;
//# sourceMappingURL=Anchors.js.map