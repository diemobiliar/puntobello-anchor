# In-page Navigation - ScrollToTop Application customizer

## Summary
This application customizer enhances in-page navigation by displaying a "scroll to top" button and reading the anchor webpart settings to enable a modal layout that replicates anchor webpart navigation.

### Features
The application customizer provides two main functionalities:
1. Displays a "scroll to top" button when the user scrolls down, allowing quick navigation to the top of the page.
2. Replicates the functionalities of the anchor webpart, enabling in-page navigation using either the `Tags` or `Numeric` layout.

If the anchor webpart is not present on the page, the application customizer will only render the "scroll to top" button.

This SPFx solution is designed for use with the [PuntoBello Anchors Webparts](../puntobello-inpagenav-anchors-spwp/README.md), but it can also function independently.

### Parameters
You can configure all parameters in the corresponding files located in the `env` directory. Once set, build the solution accordingly.

| Parameter                       | Description                                                      |
|----------------------------------|------------------------------------------------------------------|
| **SPFX_COLOR_TEXT**              | The primary color used for text throughout the application.       |
| **SPFX_COLOR_TEXT_HOVER**        | The text color when hovering over elements.                      |
| **SPFX_COLOR_PRIMARY**           | The primary color used mainly for hover effects.                 |
| **SPFX_BOX_SHADOW**              | Box shadow styling for various elements.                         |
| **SPFX_WIDGET_BACKGROUND_COLOR** | Background color for the callout widget.                         |
| **SPFX_BORDER_RADIUS**           | Radius for rounding the corners of elements.                     |
| **SPFX_FONT_FAMILY**             | The font family used across the application.                     |
| **SPFX_FONT_SIZE_GENERIC**       | The standard font size used for general text.                    |

### _Note_
- This webpart uses the PnP-JS library for all REST interactions with SharePoint. [Learn more about PnP-JS](https://pnp.github.io/pnpjs/).

---

## Compatibility
![SPFx 1.21.0](https://img.shields.io/badge/SPFx-1.21.0-green.svg)
![Node.js v18.19.1](https://img.shields.io/badge/Node.js-%20v18.19.1-green.svg)
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-green.svg)  
![Teams N/A: Untested with Microsoft Teams](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg "Untested with Microsoft Teams")  
![Local Workbench](https://img.shields.io/badge/Workbench-Local-red.svg)  
![Workbench Hosted](https://img.shields.io/badge/Workbench-Hosted-red.svg)

## Solution

| Solution                               | Author(s)                        |
|----------------------------------------|----------------------------------|
| puntobello-inpagenav-scrolltotop-spext | Nello D'Andrea, Die Mobiliar     |

## Version History

| Version | Date          | Comments       |
|---------|---------------|----------------|
1.1.0   | July 2025 | Upgraded with Pantoum SPFx AI Upgrader
| 1.0.0   | October 2024  | Initial release|

## License
[MIT License](../LICENSE.md)

---

## Acknowledgment Request
If you find this software useful and incorporate it into your own projects, especially for commercial purposes, we kindly ask that you acknowledge its use. A simple mention such as "Powered by Die Mobiliar - PuntoBello" in your product's documentation, website, or related materials is appreciated.

While this is not a requirement of the MIT License and is entirely voluntary, it helps support and recognize the efforts of the developers who contributed to this project. We appreciate your support!
