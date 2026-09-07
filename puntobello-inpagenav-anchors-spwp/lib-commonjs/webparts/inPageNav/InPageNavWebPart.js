"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// React and SPFx imports for core functionalities
var React = tslib_1.__importStar(require("react"));
var ReactDom = tslib_1.__importStar(require("react-dom"));
var sp_core_library_1 = require("@microsoft/sp-core-library");
// SPFx Property Pane imports for web part configuration options
var sp_property_pane_1 = require("@microsoft/sp-property-pane");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var sp_component_base_1 = require("@microsoft/sp-component-base");
// Localization and component imports
var strings = tslib_1.__importStar(require("InPageNavWebPartStrings")); // Localization strings for the property pane
var Anchors_1 = require("./components/Anchors"); // Anchors component to display in-page navigation
var utils_1 = require("./utils"); // Logger utility for tracking events and errors
var SharePointService_1 = tslib_1.__importDefault(require("./services/SharePointService")); // SharePoint service for data handling
var AppContext_1 = require("./contexts/AppContext"); // Context provider for application-wide data
/**
 * InPageNavWebPart class manages the configuration, rendering, and theming for the in-page navigation web part.
 */
var InPageNavWebPart = /** @class */ (function (_super) {
    tslib_1.__extends(InPageNavWebPart, _super);
    function InPageNavWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initialized = false;
        return _this;
    }
    /**
     * Handles theme change events and re-renders the web part to apply the updated theme.
     * @param args - ThemeChangedEventArgs containing the new theme variant.
     */
    InPageNavWebPart.prototype._handleThemeChangedEvent = function (args) {
        this.themeVariant = args.theme;
        this.render();
    };
    /**
     * Initializes the web part, sets up theming and logging, and consumes the SharePoint service.
     * @returns A promise that resolves once initialization is complete.
     */
    InPageNavWebPart.prototype.onInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var spo, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger = utils_1.Logger.getInstance();
                        this.logger.setContextInfo(this.context.manifest.alias + " with id " + this.context.manifest.id);
                        this.logger.info('Logger initialized');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // Initialize theme provider to make web part theme-aware
                        this.themeProvider = this.context.serviceScope.consume(sp_component_base_1.ThemeProvider.serviceKey);
                        this.themeVariant = this.themeProvider.tryGetTheme();
                        this.themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);
                        return [4 /*yield*/, _super.prototype.onInit.call(this)];
                    case 2:
                        _a.sent();
                        spo = this.context.serviceScope.consume(SharePointService_1.default.serviceKey);
                        this.initialized = true;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.logger.error("Error in onInit Webpart: ", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Renders the Anchors component within an AppContextProvider.
     * Sets the properties for the Anchors component based on web part configuration.
     */
    InPageNavWebPart.prototype.render = function () {
        if (this.initialized) {
            var appContext = new AppContext_1.AppContext(this.context, this.logger);
            var anchorsProps = {
                toggleNumericLayout: this.properties.toggleNumericLayout,
                processH2: this.properties.processH2,
                iconH2: this.properties.iconH2,
                processH3: this.properties.processH3,
                iconH3: this.properties.iconH3,
                processH4: this.properties.processH4,
                iconH4: this.properties.iconH4,
                ignoreLastTag: this.properties.ignoreLastTag,
                ignoreSecondLastTag: this.properties.ignoreSecondLastTag,
                displayMode: this.displayMode,
            };
            var element = React.createElement(AppContext_1.AppContextProvider, { appContext: appContext }, React.createElement(Anchors_1.Anchors, tslib_1.__assign({}, anchorsProps)));
            ReactDom.render(element, this.domElement);
        }
    };
    /**
     * Unmounts the component from the DOM when the web part is disposed.
     */
    InPageNavWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(InPageNavWebPart.prototype, "dataVersion", {
        /**
         * Specifies the data version for the web part.
         */
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InPageNavWebPart.prototype, "disableReactivePropertyChanges", {
        /**
         * Enables or disables reactive property changes.
         * @returns A boolean indicating whether reactive changes are enabled.
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Validates the icon value entered in the property pane.
     * Ensures the field is not empty and returns an error message if invalid.
     * @param value - The input value to validate.
     * @returns A validation error message if the value is empty.
     */
    InPageNavWebPart.prototype.validateUIiconValue = function (value) {
        if (value === undefined || value.length === 0) {
            return strings.UIIconEmptyValue;
        }
        return '';
    };
    /**
     * Handles changes in the property pane fields, ensuring interdependent values are updated.
     * E.g., sets the icon value to `undefined` when process toggles change.
     * @param propertyPath - The property being changed.
     * @param oldValue - The previous value of the property.
     * @param newValue - The new value of the property.
     */
    InPageNavWebPart.prototype.onPropertyPaneFieldChanged = function (propertyPath, oldValue, newValue) {
        _super.prototype.onPropertyPaneFieldChanged.call(this, propertyPath, oldValue, newValue);
        if (propertyPath === 'processH2') {
            this.properties.iconH2 = oldValue !== newValue ? undefined : newValue;
            this.onPropertyPaneFieldChanged('iconH2', oldValue, newValue);
        }
        if (propertyPath === 'processH3') {
            this.properties.iconH3 = oldValue !== newValue ? undefined : newValue;
            this.onPropertyPaneFieldChanged('iconH3', oldValue, newValue);
        }
        if (propertyPath === 'processH4') {
            this.properties.iconH3 = oldValue !== newValue ? undefined : newValue;
            this.onPropertyPaneFieldChanged('iconH4', oldValue, newValue);
        }
        this.render();
        this.context.propertyPane.refresh();
    };
    /**
     * Defines the configuration options available in the web part's property pane.
     * Dynamically shows or hides icon fields based on layout and processing settings.
     */
    InPageNavWebPart.prototype.getPropertyPaneConfiguration = function () {
        var iconH2TextFieldProperty;
        var iconH3TextFieldProperty;
        var iconH4TextFieldProperty;
        // Conditional rendering of icon properties based on layout and processing settings
        if (this.properties.processH2 && !this.properties.toggleNumericLayout) {
            iconH2TextFieldProperty =
                (0, sp_property_pane_1.PropertyPaneTextField)('iconH2', {
                    label: strings.IconNameLabel,
                    value: this.properties.iconH2,
                    onGetErrorMessage: this.validateUIiconValue.bind(this)
                });
        }
        else {
            iconH2TextFieldProperty = '';
        }
        if (this.properties.processH3 && !this.properties.toggleNumericLayout) {
            iconH3TextFieldProperty =
                (0, sp_property_pane_1.PropertyPaneTextField)('iconH3', {
                    label: strings.IconNameLabel,
                    value: this.properties.iconH3,
                    onGetErrorMessage: this.validateUIiconValue.bind(this)
                });
        }
        else {
            iconH3TextFieldProperty = '';
        }
        if (this.properties.processH4 && !this.properties.toggleNumericLayout) {
            iconH4TextFieldProperty =
                (0, sp_property_pane_1.PropertyPaneTextField)('iconH4', {
                    label: strings.IconNameLabel,
                    value: this.properties.iconH4,
                    onGetErrorMessage: this.validateUIiconValue.bind(this)
                });
        }
        else {
            iconH4TextFieldProperty = '';
        }
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupFields: [
                                (0, sp_property_pane_1.PropertyPaneToggle)('toggleNumericLayout', {
                                    label: strings.ToggleNumericLayout,
                                    checked: this.properties.toggleNumericLayout
                                }),
                                (!this.properties.processH2 && !this.properties.processH3) ?
                                    (0, sp_property_pane_1.PropertyPaneLabel)('warningLabel', {
                                        text: strings.WarningHTagRequiredLabel
                                    }) : '',
                                (0, sp_property_pane_1.PropertyPaneCheckbox)('processH2', {
                                    text: strings.H2AnchorTag,
                                    checked: this.properties.processH2
                                }),
                                iconH2TextFieldProperty,
                                (0, sp_property_pane_1.PropertyPaneCheckbox)('processH3', {
                                    text: strings.H3AnchorTag,
                                    checked: this.properties.processH3
                                }),
                                iconH3TextFieldProperty,
                                (0, sp_property_pane_1.PropertyPaneCheckbox)('processH4', {
                                    text: strings.H4AnchorTag,
                                    checked: this.properties.processH4
                                }),
                                iconH4TextFieldProperty,
                                (0, sp_property_pane_1.PropertyPaneCheckbox)('ignoreSecondLastTag', {
                                    text: strings.IgnoreSecondLastTag,
                                    checked: this.properties.ignoreSecondLastTag
                                }),
                                (0, sp_property_pane_1.PropertyPaneCheckbox)('ignoreLastTag', {
                                    text: strings.IgnoreLastAnchorTag,
                                    checked: this.properties.ignoreLastTag
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return InPageNavWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = InPageNavWebPart;
//# sourceMappingURL=InPageNavWebPart.js.map