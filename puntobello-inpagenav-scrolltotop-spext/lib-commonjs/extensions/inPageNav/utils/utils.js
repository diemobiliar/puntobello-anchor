"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utility = void 0;
var envconfig_1 = require("./envconfig");
var logger_1 = require("./logger");
/**
 * A utility class that provides various helper functions related to URL generation,
 * SharePoint configurations, and localization.
 */
var Utility = /** @class */ (function () {
    function Utility() {
    }
    /**
     * Extracts the tenant name from a given URL string.
     *
     * @param {string} urlString - The full URL string from which to extract the tenant name.
     * @returns {string} The tenant name extracted from the URL.
     *
     * @example
     * const tenantName = Utility.getTenantName("https://tenantname.sharepoint.com");
     * console.log(tenantName); // Output: tenantname
     *
     * @private
     */
    Utility.getTenantName = function (urlString) {
        var url = new URL(urlString);
        var hostname = url.hostname; // Gets 'tenantname.sharepoint.com'
        return hostname.split('.')[0]; // Splits the hostname and takes the first part
    };
    /**
      * Retrieves a translated string based on the given string name and locale.
      * Attempts to load the translation from the locale-specific file first;
      * if not found, falls back to the default locale file.
      *
      * @param {string} stringName - The key/name of the string to translate.
      * @param {string} locale - The locale code to use for translation (e.g., "en-US").
      * @returns {string} The translated string or an error message if the translation is not found.
      *
      * @example
      * const translatedString = Utility.getStringTranslation4Locale('WelcomeText', 'en-US');
      * console.log(translatedString); // Output: Welcome
      */
    Utility.getStringTranslation4Locale = function (stringName, locale) {
        try {
            var translatedString = require("../loc/".concat(locale, ".js"));
            return translatedString[stringName];
        }
        catch (_a) {
            try {
                var defaultString = require("../loc/default.js");
                return defaultString[stringName];
            }
            catch (defaultError) {
                logger_1.Logger.getInstance().error('Failed to load default language file', defaultError);
                return "Error: Missing translation file for ".concat(locale, " and default locale");
            }
        }
    };
    /**
     * The environment configuration settings for the application.
     * This includes information such as site URLs, list URLs, and other configuration details.
     * @private
     */
    Utility.rootEnv = (0, envconfig_1.getRootEnv)();
    return Utility;
}());
exports.Utility = Utility;
//# sourceMappingURL=utils.js.map