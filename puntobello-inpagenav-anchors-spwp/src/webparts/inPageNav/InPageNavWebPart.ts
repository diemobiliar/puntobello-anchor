// React and SPFx imports for core functionalities
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Version } from '@microsoft/sp-core-library';

// SPFx Property Pane imports for web part configuration options
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField,
    PropertyPaneCheckbox,
    PropertyPaneLabel,
    PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';

// Localization and component imports
import * as strings from 'InPageNavWebPartStrings'; // Localization strings for the property pane
import { Anchors } from './components/Anchors'; // Anchors component to display in-page navigation
import { Logger } from './utils'; // Logger utility for tracking events and errors
import { IAnchorTagProps } from './models'; // Interface for anchor tag properties
import SharePointService from './services/SharePointService'; // SharePoint service for data handling
import { AppContext, AppContextProvider } from './contexts/AppContext'; // Context provider for application-wide data

/**
 * Web part properties defining configuration options for the in-page navigation web part.
 */
export interface IInPageNavWebPartProps {
    toggleNumericLayout: boolean;
    processH2: boolean;
    iconH2: string;
    processH3: boolean;
    iconH3: string;
    processH4: boolean;
    iconH4: string;
    ignoreLastTag: boolean;
    ignoreSecondLastTag: boolean;
    displayMode: DisplayMode;
}

/**
 * InPageNavWebPart class manages the configuration, rendering, and theming for the in-page navigation web part.
 */
export default class InPageNavWebPart extends BaseClientSideWebPart<IInPageNavWebPartProps> {
    private logger: Logger;
    private themeProvider: ThemeProvider;
    private themeVariant: IReadonlyTheme | undefined;
    private initialized: boolean = false;
  
    /**
     * Handles theme change events and re-renders the web part to apply the updated theme.
     * @param args - ThemeChangedEventArgs containing the new theme variant.
     */
    private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
        this.themeVariant = args.theme;
        this.render();
    }

    /**
     * Initializes the web part, sets up theming and logging, and consumes the SharePoint service.
     * @returns A promise that resolves once initialization is complete.
     */
    protected async onInit(): Promise<void> {
        this.logger = Logger.getInstance();
        this.logger.setContextInfo(this.context.manifest.alias + " with id " + this.context.manifest.id);
        this.logger.info('Logger initialized');

        try {
            // Initialize theme provider to make web part theme-aware
            this.themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
            this.themeVariant = this.themeProvider.tryGetTheme();
            this.themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

            await super.onInit();
            const spo = this.context.serviceScope.consume(SharePointService.serviceKey);
            this.initialized = true;

        } catch (error) {
            this.logger.error("Error in onInit Webpart: ", error);
        }
    }

    /**
     * Renders the Anchors component within an AppContextProvider.
     * Sets the properties for the Anchors component based on web part configuration.
     */
    public render(): void {
        if (this.initialized) {
            const appContext = new AppContext(
                this.context,
                this.logger
            );
            const anchorsProps: IAnchorTagProps = {
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

            const element: React.ReactElement = React.createElement(
                AppContextProvider,
                { appContext },
                React.createElement(Anchors, { ...anchorsProps }) 
            );
            ReactDom.render(element, this.domElement);
        }
    }

    /**
     * Unmounts the component from the DOM when the web part is disposed.
     */
    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    /**
     * Specifies the data version for the web part.
     */
    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    /**
     * Enables or disables reactive property changes.
     * @returns A boolean indicating whether reactive changes are enabled.
     */
    protected get disableReactivePropertyChanges(): boolean {
        return false;
    }

    /**
     * Validates the icon value entered in the property pane.
     * Ensures the field is not empty and returns an error message if invalid.
     * @param value - The input value to validate.
     * @returns A validation error message if the value is empty.
     */
    private validateUIiconValue(value: string): string {
        if (value === undefined || value.length === 0) {
            return strings.UIIconEmptyValue;
        }
    }

    /**
     * Handles changes in the property pane fields, ensuring interdependent values are updated.
     * E.g., sets the icon value to `undefined` when process toggles change.
     * @param propertyPath - The property being changed.
     * @param oldValue - The previous value of the property.
     * @param newValue - The new value of the property.
     */
    protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
        super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
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
    }

    /**
     * Defines the configuration options available in the web part's property pane.
     * Dynamically shows or hides icon fields based on layout and processing settings.
     */
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        let iconH2TextFieldProperty: any;
        let iconH3TextFieldProperty: any;
        let iconH4TextFieldProperty: any;

        // Conditional rendering of icon properties based on layout and processing settings
        if (this.properties.processH2 && !this.properties.toggleNumericLayout) {
            iconH2TextFieldProperty =
                PropertyPaneTextField('iconH2', {
                    label: strings.IconNameLabel,
                    value: this.properties.iconH2,
                    onGetErrorMessage: this.validateUIiconValue.bind(this)
                });
        } else {
            iconH2TextFieldProperty = '';
        }

        if (this.properties.processH3 && !this.properties.toggleNumericLayout) {
            iconH3TextFieldProperty =
                PropertyPaneTextField('iconH3', {
                    label: strings.IconNameLabel,
                    value: this.properties.iconH3,
                    onGetErrorMessage: this.validateUIiconValue.bind(this)
                });
        } else {
            iconH3TextFieldProperty = '';
        }

        if (this.properties.processH4 && !this.properties.toggleNumericLayout) {
            iconH4TextFieldProperty =
                PropertyPaneTextField('iconH4', {
                    label: strings.IconNameLabel,
                    value: this.properties.iconH4,
                    onGetErrorMessage: this.validateUIiconValue.bind(this)
                });
        } else {
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
                                PropertyPaneToggle('toggleNumericLayout', {
                                    label: strings.ToggleNumericLayout,
                                    checked: this.properties.toggleNumericLayout
                                }),
                                (!this.properties.processH2 && !this.properties.processH3) ?
                                    PropertyPaneLabel('warningLabel', {
                                        text: strings.WarningHTagRequiredLabel
                                    }) : '',
                                PropertyPaneCheckbox('processH2', {
                                    text: strings.H2AnchorTag,
                                    checked: this.properties.processH2
                                }),
                                iconH2TextFieldProperty,
                                PropertyPaneCheckbox('processH3', {
                                    text: strings.H3AnchorTag,
                                    checked: this.properties.processH3
                                }),
                                iconH3TextFieldProperty,
                                PropertyPaneCheckbox('processH4', {
                                    text: strings.H4AnchorTag,
                                    checked: this.properties.processH4
                                }),
                                iconH4TextFieldProperty,
                                PropertyPaneCheckbox('ignoreSecondLastTag', {
                                    text: strings.IgnoreSecondLastTag,
                                    checked: this.properties.ignoreSecondLastTag
                                }),
                                PropertyPaneCheckbox('ignoreLastTag', {
                                    text: strings.IgnoreLastAnchorTag,
                                    checked: this.properties.ignoreLastTag
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
