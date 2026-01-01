"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollToTop = void 0;
var tslib_1 = require("tslib");
// React core library
var React = tslib_1.__importStar(require("react"));
// Fluent UI icons and hooks
var react_icons_mdl2_1 = require("@fluentui/react-icons-mdl2"); // Chevron icon for scroll-up functionality
var react_hooks_1 = require("@fluentui/react-hooks"); // Hook for managing boolean state
var react_1 = require("@fluentui/react"); // Link component for clickable elements
// Styles, services, models, and utilities
var ScrollToTop_module_scss_1 = tslib_1.__importDefault(require("./ScrollToTop.module.scss")); // Scoped CSS module for component styling
var services_1 = require("../services"); // Service for SharePoint data handling
var Anchors_1 = require("./Anchors/Anchors"); // Anchors component for displaying anchor tags
var AppContext_1 = require("../contexts/AppContext"); // Context provider for accessing global app context
var utils_1 = require("../utils"); // Utility for environment-based CSS styles
/**
 * ScrollToTop component that provides a scroll-to-top button,
 * displays anchor tags in a callout if configured,
 * and manages scroll visibility and anchor data dynamically.
 */
function ScrollToTop() {
    var _this = this;
    // Retrieve the application context
    var context = (0, AppContext_1.useAppContext)().context;
    // Boolean state for visibility of the scroll-to-top button
    var _a = (0, react_hooks_1.useBoolean)(false), isVisible = _a[0], _b = _a[1], setVisible = _b.setTrue, setInvisible = _b.setFalse;
    // State for storing configuration and anchor tags data
    var _c = React.useState(null), configuration = _c[0], setConfiguration = _c[1];
    var _d = React.useState([]), anchorTags = _d[0], setAnchorTags = _d[1];
    // Reference to the scroll region element
    var scrollRegionRef = React.useRef(null);
    /**
     * Callback to toggle the visibility of the scroll-to-top button
     * based on the scroll position within the scroll region.
     */
    var toggleVisibility = React.useCallback(function () {
        var scrollRegion = scrollRegionRef.current;
        if (scrollRegion) {
            // Show the button if scrolled more than 100px, otherwise hide it
            if (scrollRegion.scrollTop > 100) {
                setVisible();
            }
            else {
                setInvisible();
            }
        }
    }, [setVisible, setInvisible]);
    /**
     * Effect to set up the scroll region and attach scroll event listener
     * once the DOM is ready. Uses an interval to wait until the scroll region is available.
     */
    React.useEffect(function () {
        var intervalId = setInterval(function () {
            // Find the scroll region element if not yet set
            if (!scrollRegionRef.current) {
                scrollRegionRef.current = document.querySelector('[data-automation-id="contentScrollRegion"]');
                if (scrollRegionRef.current) {
                    scrollRegionRef.current.addEventListener('scroll', toggleVisibility); // Attach scroll listener
                    clearInterval(intervalId); // Clear interval once scroll region is found
                }
            }
        }, 100);
        return function () {
            clearInterval(intervalId); // Clean up interval on unmount
            if (scrollRegionRef.current) {
                scrollRegionRef.current.removeEventListener('scroll', toggleVisibility); // Remove event listener
            }
        };
    }, [toggleVisibility]);
    /**
     * Effect to load anchor data when the scroll-to-top button becomes visible.
     * Resets anchor tags and configuration on visibility change.
     */
    React.useEffect(function () {
        if (isVisible) {
            loadAnchorData();
        }
        return function () {
            setAnchorTags([]); // Clear anchor tags on cleanup
            setConfiguration(null); // Clear configuration on cleanup
        };
    }, [isVisible]);
    /**
     * Loads anchor configuration and tags data from the SharePointService
     * and updates the component state with the retrieved values.
     */
    var loadAnchorData = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var service, configuration, anchorTags;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    service = context.serviceScope.consume(services_1.SharePointService.serviceKey);
                    return [4 /*yield*/, service.getAnchorWebpartConfiguration()];
                case 1:
                    configuration = _a.sent();
                    return [4 /*yield*/, service.getPageAnchorTags(configuration)];
                case 2:
                    anchorTags = _a.sent();
                    setConfiguration(configuration);
                    setAnchorTags(anchorTags);
                    return [2 /*return*/];
            }
        });
    }); };
    /**
     * Scrolls the content region to the top smoothly when the button is clicked.
     */
    var scrollToTop = function () {
        var scrollFrame = scrollRegionRef.current;
        if (scrollFrame) {
            scrollFrame.scrollTo({
                top: 0,
                behavior: 'smooth', // Smooth scrolling behavior
            });
        }
    };
    return (React.createElement("div", { style: (0, utils_1.getRootEnv)().css, className: ScrollToTop_module_scss_1.default.scrollToTop }, isVisible && scrollRegionRef.current && scrollRegionRef.current.scrollTop > 0 ? (React.createElement("span", null,
        React.createElement(react_1.Link, { className: ScrollToTop_module_scss_1.default.link, onClick: scrollToTop },
            React.createElement(react_icons_mdl2_1.ChevronUpMedIcon, { className: ScrollToTop_module_scss_1.default.icon })),
        configuration && configuration.anchorWebpartFound && anchorTags.length > 0 && (React.createElement(Anchors_1.Anchors, { config: configuration, tags: anchorTags })))) : null));
}
exports.ScrollToTop = ScrollToTop;
//# sourceMappingURL=ScrollToTop.js.map