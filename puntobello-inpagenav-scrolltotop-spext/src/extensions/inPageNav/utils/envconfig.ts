import { IRootEnv } from "../models";

let rootEnv: IRootEnv | null = null;

/**
 * Retrieves the root environment configuration settings, including CSS variables and SharePoint configuration.
 * The configuration is lazily initialized and cached for future use.
 * 
 * @returns {IRootEnv} The root environment configuration object containing CSS variables and SharePoint configuration settings.
 * 
 * @example
 * const env = getRootEnv();
 * console.log(env.css['--spfx_color_text']); // Output: The text color defined in the environment
 */
export const getRootEnv = (): IRootEnv => {
    if (!rootEnv) {
        // Lazily initialize the root environment configuration if it hasn't been initialized yet
        rootEnv = {
            css: {
                '--spfx_color_text': process.env.SPFX_COLOR_TEXT,
                '--spfx_color_text_hover': process.env.SPFX_COLOR_TEXT_HOVER,
                '--spfx_color_primary': process.env.SPFX_COLOR_PRIMARY,
                '--spfx_box_shadow': process.env.SPFX_BOX_SHADOW,
                '--spfx_widget_background_color': process.env.SPFX_WIDGET_BACKGROUND_COLOR,
                '--spfx_border_radius': process.env.SPFX_BORDER_RADIUS,
                '--spfx_font_family': process.env.SPFX_FONT_FAMILY,
                '--spfx_font_size_generic': process.env.SPFX_FONT_SIZE_GENERIC,
            },
            config: {
            }
        };
    }
    return rootEnv;
};


