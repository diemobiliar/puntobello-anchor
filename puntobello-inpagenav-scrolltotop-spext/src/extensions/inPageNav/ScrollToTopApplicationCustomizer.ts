// SPFx Base classes and placeholder handling utilities
import {
    BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';

// React core libraries
import * as React from 'react';
import * as ReactDom from "react-dom";

// Custom component for scroll-to-top functionality
import { ScrollToTop } from './components/ScrollToTop';

// Logging utility for tracking events and errors
import { Logger } from './utils';

// Context and state management for app-wide settings and data sharing
import { AppContext, AppContextProvider } from './contexts/AppContext';

// Service for SharePoint-specific operations and data retrieval
import { SharePointService } from './services';


export default class ScrollToTopApplicationCustomizer extends BaseApplicationCustomizer<never> {
    // Placeholder reference for the bottom area of the page
    private _bottomPlaceholder: PlaceholderContent | undefined;
    // Logger instance to track and log events and errors
    private logger: Logger;

    // Initialization method for the customizer
    public async onInit(): Promise<void> {
        // Initialize logger and set context for logging (alias and ID for identification)
        this.logger = Logger.getInstance();
        this.logger.setContextInfo(this.context.manifest.alias + " with id " + this.context.manifest.id);
        this.logger.info('Logger initialized');
        
        // Consume SharePointService for handling SharePoint-related operations
        this.context.serviceScope.consume(SharePointService.serviceKey);
    
        // Register _renderPlaceHolders method to handle navigation events and ensure placeholders are rendered on page changes
        this.context.application.navigatedEvent.add(this, this._renderPlaceHolders);

        return Promise.resolve();
    }

    // Method to render placeholders in the designated areas of the page
    private _renderPlaceHolders(): void {
        // Check and handle the bottom placeholder
        if (!this._bottomPlaceholder) {
            // Try to create the bottom placeholder content
            this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
                PlaceholderName.Bottom
            );

            // Log an error and exit if the expected bottom placeholder is unavailable
            if (!this._bottomPlaceholder) {
                this.logger.error("The expected placeholder (Bottom) was not found.");
                return;
            }
        }

        // If the placeholder's DOM element is available, proceed to render the component
        if (this._bottomPlaceholder.domElement) {

            // Create an app context instance for passing the SPFx context and logger
            const appContext = new AppContext(
                this.context,
                this.logger
              );
            // Create the React element for the ScrollToTop component, wrapped in the AppContextProvider for context sharing
            const element: React.ReactElement = React.createElement(
                AppContextProvider,
                { appContext },
                React.createElement(ScrollToTop)
              );
      
            // Render the ScrollToTop component into the bottom placeholder's DOM element
            ReactDom.render(element, this._bottomPlaceholder.domElement);
        }
    }
}
