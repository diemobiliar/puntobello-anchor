"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppContext = exports.AppContextProvider = exports.AppContext = void 0;
var tslib_1 = require("tslib");
// React and related imports
var React = tslib_1.__importStar(require("react"));
var AppContext = /** @class */ (function () {
    function AppContext(context, logger) {
        this.context = context;
        this.logger = logger;
    }
    return AppContext;
}());
exports.AppContext = AppContext;
/**
 * `AppContextInstance` is a React Context object that provides access to the `AppContext` instance throughout the component tree.
 * It allows components to access and consume the global state and utilities encapsulated by `AppContext`.
 *
 * @type {React.Context<AppContext | undefined>}
 */
var AppContextInstance = React.createContext(undefined);
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
var AppContextProvider = function (_a) {
    var appContext = _a.appContext, children = _a.children;
    return React.createElement(AppContextInstance.Provider, { value: appContext }, children);
};
exports.AppContextProvider = AppContextProvider;
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
var useAppContext = function () {
    var context = React.useContext(AppContextInstance);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};
exports.useAppContext = useAppContext;
//# sourceMappingURL=AppContext.js.map