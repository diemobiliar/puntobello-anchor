# PuntoBello In Page Navigation

The in-page navigation solutions enhance the navigation experience within SharePoint Online, offering both a web part and an extension to streamline navigation and improve user accessibility.

![User Apps - Webpart and Extension in action](./assets/in-page-nav.gif)

## Use Case

The PuntoBello In-Page Navigation solutions address the challenge of navigating large SharePoint pages with multiple sections or headings. Whether users are browsing extensive documentation or structured content, these solutions ensure a seamless navigation experience by providing in-page links and a "scroll to top" button. The combination of these two functionalities reduces the effort required to scroll and navigate across long pages, improving the overall user experience.

## Structure

This project consists of two SharePoint SPFx solutions:

1. [**PuntoBello ScrollToTop Extension**](./puntobello-inpagenav-scrolltotop-spext/README.md)  
   This application customizer enhances the page navigation by adding a "scroll to top" button and providing modal-based navigation using anchor webparts. It includes:
   - A visible "scroll to top" button that appears when users scroll down the page.
   - Modal-based in-page navigation that emulates the behavior of anchor webparts, allowing users to easily navigate between different page sections via tags or numbers.
   - Integration with the [PuntoBello Anchors Webpart](./puntobello-inpagenav-anchors-spwp/README.md) but can function independently for scrolling purposes.

2. [**PuntoBello Anchors Webpart**](./puntobello-inpagenav-anchors-spwp/README.md)  
   This webpart automatically detects headings (H2, H3, H4) on SharePoint pages and renders them as clickable links, allowing users to jump to specific sections. The webpart includes:
   - Configurable layouts (Tags or Numeric) to render anchors as links or a numbered list.
   - Customizable iconography for heading levels in the Tags layout.
   - Advanced settings to control which headings are processed, as well as options to ignore specific anchors, such as the last or second-to-last heading.
   - Seamless compatibility with the [PuntoBello ScrollToTop Extension](./puntobello-inpagenav-scrolltotop-spext/README.md), enhancing in-page navigation with both link generation and a scroll button.

You can find additional information in each respective repository.

## Multilinguality
All the SPFx solutions are strongly focused on serving multilingual content. Our implementation pattern differs from the standard SPFx approach to enhance SharePoint's multilingual capabilities.

For example, content is always displayed in the specific language of the page. If you have a page translated into various languages, the content on each page will be rendered in that page's language, rather than the user's language, avoiding the mixing of different languages on the same page.

### Configuring / Translating Languages
You can translate all the text by adding or updating the files in the `loc` folder. The `default.js` file should always be present to ensure a default behavior for the component.

### Rendering of Text-Based Information
Text-based information is served from the `loc` folder, as is typical in SPFx solutions. Additionally, we have implemented a default language file (`default.js`), which will always be used if the corresponding user language file is not present in the SPFx solution.

### Gathering the User Language
The current user language is retrieved in two different ways, depending on the type of SPFx solution.

#### SPFx Solutions on a SharePoint Page
Typically web parts:
The language is gathered from the current page language if running in a multilingual SharePoint configuration or from the current site language. The content will be served in this language.

#### SPFx Solutions Outside of a SharePoint Page
Typically application customizers:
The language is gathered from the current `cultureUIName` (SPFx property `pageContext.cultureInfo.currentUICultureName`).

## Additional Configuration Possibilites
Across all the PuntoBello solutions, we have put considerable effort into enabling you to configure your solutions at build time, so that you can:

- Brand the solution with your specific colors, fonts, etc.
- Deploy the solutions easily on multiple tenants if needed (e.g., dev/test/prod environments).

We have also implemented a mini framework across all solutions, which you can easily extend with additional properties if you want to configure further aspects of the solutions.

## Minimal Path to Awesome

### Puntobello Installer

https://github.com/diemobiliar/puntobello-installer/ is configured as a submodule und provides a docker image containing build and deploy scripts for SPFx and SharePoint Scripts. When cloning this repository, include the submodule:

```shell
git clone --recurse-submodules https://github.com/diemobiliar/puntobello-anchor.git
```
Alternatively, configure the submodule after cloning the repository:

```shell
git submodule update --init
```

With the Puntobello Installer, there is the possibility to execute the installation of all artifacts in various variants. These are described below. They are:
- [Use Dev Container in VS code](#install_devcontainer)
- [Use commands in docker container locally](#install_docker)
- [Build and Deploy locally](#install_locally)

Alternatively, your own preferred methods can be used to build and deploy the solutions - see [Build and serve Webpart or Extension locally using nvm](#install_nvm).

### Prerequisites

> 📝 **NOTE:**
> The Dockerfile can be used for arm64 or amd64 CPU architectures. The architecture can be set to "arm64" or "amd64" in the devcontainer.json under build.args. The architecture can also be set using the `ARCH` argument for use with `docker build`. Only arm64 and amd64 are supported. It is set to amd64 if you don't change.

> 📝 **NOTE:**
> If the scripts are executed locally on the client and not in the Dev container, it must be ensured that the prerequisites for building SPFx solutions as well as the corresponding PowerShell modules are installed.

> 💡 **TIP:**
> In order to use the scripts you have to configure login mechanism and other parameters in `./.devcontainer/scripts/config.psm1` .Every authentication mechanism is based on the PnP.PowerShell examples. For setting up an Entra ID app registration and its corresponding API permissions, as well as the necessary permissions when using a user, consult the documentation: [Connect-PnPOnline](https://pnp.github.io/powershell/cmdlets/Connect-PnPOnline.html) and [Authentication](https://pnp.github.io/powershell/articles/authentication.html).

> ⚠️ **Caution:** Never commit files containing secrets or passwords!

### <a id="install_devcontainer"></a>Use Dev Container in VS code
The Visual Studio Code Dev Containers extension lets you use a container as a full-featured development environment.

> 💡 **TIP:**
> If you're interested in getting started with dev containers, you may find this [Dev Containers tutorial](https://code.visualstudio.com/docs/devcontainers/tutorial) helpful. It provides step-by-step instructions to help you get up and running quickly.

#### Deploy SPO Sites and Lists
1. Use Ctrl + Shift + P (on Windows) or Command + Shift + P (on OS X) to run `Dev Containers: Rebuild and Reopen in Container`.
This builds the container and attaches the project folder to the container with PowerShell and modules loaded.
2. Run `Deploy-SitesAndLists.ps1` to create the SPO sites and lists. The configuration is set in folder `spo`. If you want to change the target urls of sites and lists, change the configuration in the json files.

#### Build and Deploy Webpart and Extensions
1. Run `Build-SPWP.ps1` in the Dev Container to build the solutions. The script installs every dependencies and creates the sppkg files. These are saved in sharepoint/solution folder of each solution.
2. Install the solutions in SPO app catalog and sites with the script `Deploy-SPWP.ps1`. If you have them already installed, this script can be used to update the solutions as well.
3. Sites, Lists and Solutions are ready to use.

#### Connect the solution to SPO
If you want to test or debug a solution without deploying it in the app catalog, you can use gulp serve in the Dev Container.

> 📝 **NOTE:**
> The Dev container has configured the two default ports 4321 and 35729 for forwarding. If the configuration is different, corresponding parameters must be adjusted in the solutions as well as in the devcontainer.json.

1. Trust the dev certificate: `gulp trust-dev-cert`
2. Change to the directory of the solution e.g. `cd ./puntobello-inpagenav-anchors-spwp`.
3. Set the page urls in config/serve.json.
4. Start serving: `gulp serve`
5. Open the configured workbench url to test or debugging the solution.

### <a id="install_docker"></a>Use commands in docker container locally
1. Run `docker build` command to build the docker container from Dockerfile. Set build argument ARCH to desired CPU architecture (amd64 or arm64).<br>
```shell
docker build -t pbspfxtools --build-arg ARCH=amd64 -f ./.devcontainer/Dockerfile ./.devcontainer
```
2. Run the deploy script for SPO sites and lists.<br>
```shell
docker run -v ${PWD}:/spfx -w /spfx pbspfxtools pwsh -Command "Deploy-SitesAndLists.ps1"
```
3. Build the solutions using the build script in the docker container.<br>
```shell
docker run -v ${PWD}:/spfx -w /spfx pbspfxtools pwsh -Command "Build-SPWP.ps1"
```
4. Deploy the solutions to app catalog and sites using the deploy script in the docker container.<br>
```shell
docker run -v ${PWD}:/spfx -w /spfx pbspfxtools pwsh -Command "Deploy-SPWP.ps1"
```

### <a id="install_locally"></a>Build and Deploy locally
#### Deploy SPO Sites and Lists
1. Run `.\.devcontainer\scripts\Deploy-SitesAndLists.ps1` in the root of the project to create the SPO sites and lists. The configuration is set in folder `spo`. If you want to change the target urls of sites and lists, change the configuration in the json files.

#### Build and Deploy Webpart and Extensions
1. Run `.\.devcontainer\scripts\Build-SPWP.ps1` in to build the solutions. The script installs every dependencies and creates the sppkg files. These are saved in sharepoint/solution folder of each solution.
2. Install the solutions in SPO app catalog and sites with the script `.\.devcontainer\scripts\Deploy-SPWP.ps1`. If you have them already installed, this script can be used to update the solutions as well.
3. Sites, Lists and Solutions are ready to use.

### <a id="install_nvm"></a>Build and serve Webpart or Extension locally using nvm
#### Build and Deploy Webpart and Extensions
1. Change console to solution folder e.g. `cd ./puntobello-inpagenav-anchors-spwp`.
2. Run `nvm use` to set node version.
3. Run `npm install` to install dependencies.
4. Run `npm run pbship:dev` to build the solution or run `npm run start:dev` to serve for testing or debugging.

## Authors

* **Nicole Beck Dekkara** - [PuntoBello](https://www.puntobello.ch/)
* **Mattias Bürgi** - [PuntoBello](https://www.puntobello.ch/)
* **Fabian Hutzli** - [PuntoBello](https://www.puntobello.ch/)
* **Nello D'Andrea** - [PuntoBello](https://www.puntobello.ch/)

## License

This project is licensed under the MIT - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgment Request

If you find this software useful and incorporate it into your own projects, especially for commercial purposes, we kindly ask that you acknowledge its use. This acknowledgment can be as simple as mentioning "Powered by Die Mobiliar - PuntoBello" in your product's documentation, website, or any related materials.

While this is not a requirement of the MIT License and is entirely voluntary, it helps support and recognize the efforts of the developers who contributed to this project. We appreciate your support!

