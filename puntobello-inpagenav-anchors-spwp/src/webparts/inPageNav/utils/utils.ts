import { getRootEnv } from "./envconfig";
import { Logger } from "./logger";

/**
 * A utility class that provides various helper functions related to URL generation,
 * SharePoint configurations, and localization.
 */
export class Utility {
  /**
   * The environment configuration settings for the application.
   * This includes information such as site URLs, list URLs, and other configuration details.
   * @private
   */
  private static rootEnv = getRootEnv();

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
  private static getTenantName(urlString: string): string {
    const url = new URL(urlString);
    const hostname = url.hostname; // Gets 'tenantname.sharepoint.com'
    return hostname.split('.')[0]; // Splits the hostname and takes the first part
  }

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
  static getStringTranslation4Locale(stringName: string, locale: string): string {
    try {
      const translatedString = require(`../loc/${locale}.js`);
      return translatedString[stringName];
    } catch (error) {
      try {
        const defaultString = require(`../loc/default.js`);
        return defaultString[stringName];
      } catch (defaultError) {
        Logger.getInstance().error('Failed to load default language file', defaultError);
        return `Error: Missing translation file for ${locale} and default locale`;
      }
    }
  }
}