"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppContext = exports.AppContextProvider = exports.AppContext = void 0;
var tslib_1 = require("tslib");
// React and related imports
var React = tslib_1.__importStar(require("react"));
/**
 * Represents the application context for an SPFx Application Customizer.
 * Provides access to the SharePoint Application Customizer context and logging utilities.
 */
var AppContext = /** @class */ (function () {
    /**
     * Initializes a new instance of the AppContext class.
     *
     * @param {ApplicationCustomizerContext} context - The Application Customizer context providing environment and user information.
     * The context contains the servicescope which can be used to consume services.
     * @param {ILogger} logger - The logger instance used for logging application events.
     */
    function AppContext(context, logger) {
        this.context = context;
        this.logger = logger;
    }
    return AppContext;
}());
exports.AppContext = AppContext;
/**
 * A React context that holds the AppContext instance, or undefined if it is not provided.
 * This context is used to share the AppContext across the component tree.
 */
var AppContextInstance = React.createContext(undefined);
/**
 * A React component that provides the AppContext to its children.
 * Wraps the component tree with AppContextInstance.Provider.
 *
 * @param {AppContext} appContext - The AppContext instance to be provided to the component tree.
 * @param {React.ReactNode} children - The child components that will have access to the AppContext.
 * @returns {JSX.Element} The provider component that wraps its children with the AppContext.
 */
var AppContextProvider = function (_a) {
    var appContext = _a.appContext, children = _a.children;
    return React.createElement(AppContextInstance.Provider, { value: appContext }, children);
};
exports.AppContextProvider = AppContextProvider;
/**
 * A custom React hook that retrieves the AppContext instance from the context.
 * Throws an error if used outside of an AppContextProvider.
 *
 * @returns {AppContext} The AppContext instance containing the Application Customizer context and logger.
 *
 * @throws {Error} If the hook is used outside of an AppContextProvider, an error is thrown.
 *
 * @example
 * // 🚀 Example of using the useAppContext hook within a functional component
 * import React from 'react';
 * import { useAppContext } from '..path-to-context../AppContext';
 *
 * export function MyComponent () {
 *   // Retrieve the AppContext
 *   const { context, logger } = useAppContext();
 */
var useAppContext = function () {
    var context = React.useContext(AppContextInstance);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};
exports.useAppContext = useAppContext;
//# sourceMappingURL=AppContext.js.map