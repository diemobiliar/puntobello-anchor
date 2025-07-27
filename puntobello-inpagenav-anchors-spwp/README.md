# In-page Navigation - Anchors Webpart

## Summary
This webpart scans SharePoint pages for anchors (H2, H3, H4 headings) and renders them as clickable links for in-page navigation.

### Features
The following configuration options are available:

**Layouts:**
1. **Tags Layout:**  
   This layout renders all anchors as links with a prefixed, customizable Fluent UI icon.  
   For this layout, you can choose an icon for each tag (H2, H3, H4) to be processed.  
   _Note_: You can find a list of all available Fluent UI icons [here](https://uifabricicons.azurewebsites.net/).

2. **Numeric Layout:**  
   The anchors are rendered as a numbered list.

**Settings:**
- **Layout Type:** Choose either `Tags` or `Numeric Layout`.
- **Tags to Process:** Select which heading tags (H2, H3, H4) should be processed and rendered. You can choose any combination.
- **Icons for Tags (Tags Layout only):** Customize the icon for each heading tag (H2, H3, H4) that should be processed.
- **Ignore Last Tag:** Skip the last anchor found and do not render it.
- **Ignore Second Last Tag:** Skip the second-to-last anchor found and do not render it.

This SPFx solution is designed to be used with the [PuntoBello ScrollToTop Extension](../puntobello-inpagenav-scrolltotop-spext/README.md), but it can also operate independently.

### Parameters
You can configure all parameters in the corresponding files located in the `env` directory. Once set, build the solution accordingly.

| Parameter                | Description                                                     |
|--------------------------|-----------------------------------------------------------------|
| **SPFX_COLOR_TEXT**       | The primary color used for text throughout the application.     |
| **SPFX_COLOR_PRIMARY**    | The primary color used mainly for hover effects.                |
| **SPFX_BORDER_RADIUS**    | Radius for rounding the corners of elements.                    |
| **SPFX_FONT_FAMILY**      | The font family used across the application.                    |
| **SPFX_FONT_SIZE_GENERIC**| The standard font size used for general text.                   |
| **SPFX_FONT_SIZE_ICON**   | The font size used specifically for icons in the `Tags` layout. |

### _Note_
- This webpart uses the PnP-JS library for all REST interactions with SharePoint.

## Compatibility
![SPFx 1.21.0](https://img.shields.io/badge/SPFx-1.21.0-green.svg)
![Node.js v18.19.1](https://img.shields.io/badge/Node.js-%20v18.19.1-green.svg)
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-green.svg)  
![Teams N/A: Untested with Microsoft Teams](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg "Untested with Microsoft Teams")  
![Local Workbench](https://img.shields.io/badge/Workbench-Local-red.svg)  
![Workbench Hosted](https://img.shields.io/badge/Workbench-Hosted-red.svg)

## Solution

| Solution                      | Author(s)                        |
|--------------------------------|----------------------------------|
| puntobello-inpagenav-anchors-spwp | Nello D'Andrea, Die Mobiliar      |

## Version History

| Version | Date          | Comments       |
|---------|---------------|----------------|
1.1.0   | July 2025 | Upgraded with Pantoum SPFx AI Upgrader
| 1.0.0   | October 2024  | Initial release|

## License
[MIT License](../LICENSE.md)

## Acknowledgment Request
If you find this software useful and incorporate it into your own projects, especially for commercial purposes, we kindly ask that you acknowledge its use. This acknowledgment can be as simple as mentioning "Powered by Die Mobiliar - PuntoBello" in your product's documentation, website, or any related materials.

While this is not a requirement of the MIT License and is entirely voluntary, it helps support and recognize the efforts of the developers who contributed to this project. We appreciate your support!