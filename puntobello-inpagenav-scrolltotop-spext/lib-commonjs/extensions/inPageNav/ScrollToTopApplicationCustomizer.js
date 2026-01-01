"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// SPFx Base classes and placeholder handling utilities
var sp_application_base_1 = require("@microsoft/sp-application-base");
// React core libraries
var React = tslib_1.__importStar(require("react"));
var ReactDom = tslib_1.__importStar(require("react-dom"));
// Custom component for scroll-to-top functionality
var ScrollToTop_1 = require("./components/ScrollToTop");
// Logging utility for tracking events and errors
var utils_1 = require("./utils");
// Context and state management for app-wide settings and data sharing
var AppContext_1 = require("./contexts/AppContext");
// Service for SharePoint-specific operations and data retrieval
var services_1 = require("./services");
var ScrollToTopApplicationCustomizer = /** @class */ (function (_super) {
    tslib_1.__extends(ScrollToTopApplicationCustomizer, _super);
    function ScrollToTopApplicationCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Initialization method for the customizer
    ScrollToTopApplicationCustomizer.prototype.onInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // Initialize logger and set context for logging (alias and ID for identification)
                this.logger = utils_1.Logger.getInstance();
                this.logger.setContextInfo(this.context.manifest.alias + " with id " + this.context.manifest.id);
                this.logger.info('Logger initialized');
                // Consume SharePointService for handling SharePoint-related operations
                this.context.serviceScope.consume(services_1.SharePointService.serviceKey);
                // Register _renderPlaceHolders method to handle navigation events and ensure placeholders are rendered on page changes
                this.context.application.navigatedEvent.add(this, this._renderPlaceHolders);
                return [2 /*return*/, Promise.resolve()];
            });
        });
    };
    // Method to render placeholders in the designated areas of the page
    ScrollToTopApplicationCustomizer.prototype._renderPlaceHolders = function () {
        // Check and handle the bottom placeholder
        if (!this._bottomPlaceholder) {
            // Try to create the bottom placeholder content
            this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(sp_application_base_1.PlaceholderName.Bottom);
            // Log an error and exit if the expected bottom placeholder is unavailable
            if (!this._bottomPlaceholder) {
                this.logger.error("The expected placeholder (Bottom) was not found.");
                return;
            }
        }
        // If the placeholder's DOM element is available, proceed to render the component
        if (this._bottomPlaceholder.domElement) {
            // Create an app context instance for passing the SPFx context and logger
            var appContext = new AppContext_1.AppContext(this.context, this.logger);
            // Create the React element for the ScrollToTop component, wrapped in the AppContextProvider for context sharing
            var element = React.createElement(AppContext_1.AppContextProvider, { appContext: appContext }, React.createElement(ScrollToTop_1.ScrollToTop));
            // Render the ScrollToTop component into the bottom placeholder's DOM element
            ReactDom.render(element, this._bottomPlaceholder.domElement);
        }
    };
    // Cleanup method to unmount React components and prevent memory leaks
    ScrollToTopApplicationCustomizer.prototype.onDispose = function () {
        var _a;
        if ((_a = this._bottomPlaceholder) === null || _a === void 0 ? void 0 : _a.domElement) {
            ReactDom.unmountComponentAtNode(this._bottomPlaceholder.domElement);
        }
        _super.prototype.onDispose.call(this);
    };
    return ScrollToTopApplicationCustomizer;
}(sp_application_base_1.BaseApplicationCustomizer));
exports.default = ScrollToTopApplicationCustomizer;
//# sourceMappingURL=ScrollToTopApplicationCustomizer.js.map