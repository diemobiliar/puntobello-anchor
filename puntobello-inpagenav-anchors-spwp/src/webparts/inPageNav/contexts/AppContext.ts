// React and related imports
import * as React from "react";

// SPFx-specific imports
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from '@microsoft/sp-component-base';

// Models
import { ILogger } from "../models";

export class AppContext {
    context: WebPartContext;
    logger: ILogger;

    constructor(context: WebPartContext,
        logger: ILogger) {
        this.context = context;
        this.logger = logger;
    }
}

/**
 * `AppContextInstance` is a React Context object that provides access to the `AppContext` instance throughout the component tree.
 * It allows components to access and consume the global state and utilities encapsulated by `AppContext`.
 * 
 * @type {React.Context<AppContext | undefined>}
 */
const AppContextInstance = React.createContext<AppContext | undefined>(undefined);

/**
 * `AppContextProvider` is a React functional component that acts as a provider for the `AppContext` instance.
 * It wraps the application components with the `AppContextInstance.Provider` and passes down the `AppContext` 
 * instance, making it available to all child components.
 * 
 * @param {Object} props - The props for the `AppContextProvider` component.
 * @param {AppContext} props.appContext - The `AppContext` instance to be provided to the component tree.
 * @param {React.ReactNode} props.children - The child components that will have access to the `AppContext`.
 * 
 * @returns {JSX.Element} A React element that provides the `AppContext` to its children.
 * 
 * @example
 * <AppContextProvider appContext={appContext}>
 *   <MyComponent />
 * </AppContextProvider>
 */
export const AppContextProvider: React.FC<{ appContext: AppContext }> = ({ appContext, children }) => {
    return React.createElement(AppContextInstance.Provider, { value: appContext }, children);
};

/**
 * `useAppContext` is a custom React hook that provides access to the `AppContext` instance.
 * It throws an error if used outside of an `AppContextProvider`, ensuring that the context is properly initialized.
 * 
 * @returns {AppContext} The `AppContext` instance containing the global state and utilities.
 * 
 * @throws {Error} If the hook is used outside of an `AppContextProvider`, an error is thrown.
 * 
 * @example
 * const { context, logger, pageLanguage, themeVariant, newsCount } = useAppContext();
 */
export const useAppContext = (): AppContext => {
    const context = React.useContext(AppContextInstance);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};

