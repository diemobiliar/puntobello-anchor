# SPFx Upgrade Report - puntobello-inpagenav-scrolltotop-spext

## Summary
- **Solution**: puntobello-inpagenav-scrolltotop-spext
- **Target Version**: 1.21.1
- **Date**: 2025-07-28T20:37:49.840Z
- **Pantoum Version**: 1.0.0
- **Status**: ✅ Success

## Command Used
```bash
pantoum \\
  --local-path ../../puntobello-anchor \\
  --toVersion 1.21.1 \\
  --excludePatchIds FN019002,FN017001,FN012019 \\
  --onSingleSolutionFail continue \\
  --perSolutionReports true \\
  --fixM365UpgradeErrors true \\
  --fixSuccessStepErrors true
```

## Patches Applied (17 total)

### M365 CLI Patches (9)

#### FN001001: @microsoft/sp-core-library
- **Description**: Upgrade SharePoint Framework dependency package @microsoft/sp-core-library
- **Type**: updateDependency
- **Package**: @microsoft/sp-core-library
- **New Version**: 1.21.1

#### FN001011: @microsoft/sp-dialog
- **Description**: Upgrade SharePoint Framework dependency package @microsoft/sp-dialog
- **Type**: updateDependency
- **Package**: @microsoft/sp-dialog
- **New Version**: 1.21.1

#### FN001012: @microsoft/sp-application-base
- **Description**: Upgrade SharePoint Framework dependency package @microsoft/sp-application-base
- **Type**: updateDependency
- **Package**: @microsoft/sp-application-base
- **New Version**: 1.21.1

#### FN001034: @microsoft/sp-adaptive-card-extension-base
- **Description**: Upgrade SharePoint Framework dependency package @microsoft/sp-adaptive-card-extension-base
- **Type**: updateDependency
- **Package**: @microsoft/sp-adaptive-card-extension-base
- **New Version**: 1.21.1

#### FN002001: @microsoft/sp-build-web
- **Description**: Upgrade SharePoint Framework dev dependency package @microsoft/sp-build-web
- **Type**: updateDependency
- **Package**: @microsoft/sp-build-web
- **New Version**: 1.21.1

#### FN002002: @microsoft/sp-module-interfaces
- **Description**: Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces
- **Type**: updateDependency
- **Package**: @microsoft/sp-module-interfaces
- **New Version**: 1.21.1

#### FN002022: @microsoft/eslint-plugin-spfx
- **Description**: Upgrade SharePoint Framework dev dependency package @microsoft/eslint-plugin-spfx
- **Type**: updateDependency
- **Package**: @microsoft/eslint-plugin-spfx
- **New Version**: 1.21.1

#### FN002023: @microsoft/eslint-config-spfx
- **Description**: Upgrade SharePoint Framework dev dependency package @microsoft/eslint-config-spfx
- **Type**: updateDependency
- **Package**: @microsoft/eslint-config-spfx
- **New Version**: 1.21.1

#### FN010001: .yo-rc.json version
- **Description**: Update version in .yo-rc.json
- **Type**: updateJsonSnippet
- **File**: /Users/nellodandrea/dev/mobi/github/ferrarirosso/puntobello-anchor/puntobello-inpagenav-scrolltotop-spext/.yo-rc.json
- **Changes**: {
  "@microsoft/generator-sharepoint": {
    "version": "1.21.1"
  }
}

### Manual Configuration Patches (8)

#### M000004: Remove es6-promise from tsconfig.json
- **Description**: Remove es6-promise from tsconfig.json

#### M000005: Wipe node_modules clean
- **Description**: Wipe node_modules clean
- **Type**: runShellCommand
- **Command**: `rm -rf node_modules`

#### M000006: Delete package-lock.json
- **Description**: Delete package-lock.json

#### M999998: npm install to ensure all dependencies are up to date
- **Description**: npm install to ensure all dependencies are up to date
- **Type**: runShellCommand
- **Command**: `npm install`

#### PANTOUM-VERSION-UPDATE-PACKAGE: Update package.json version
- **Description**: Increment version from 1.1.0 to 1.2.0
- **Type**: updateJsonSnippet
- **File**: /Users/nellodandrea/dev/mobi/github/ferrarirosso/puntobello-anchor/puntobello-inpagenav-scrolltotop-spext/package.json
- **Changes**: {
  "version": "1.2.0"
}

#### PANTOUM-UPDATE-YORC-NODE: Update Node version in .yo-rc.json
- **Description**: Update nodeVersion to 22.15.0
- **Type**: updateJsonSnippet
- **File**: /Users/nellodandrea/dev/mobi/github/ferrarirosso/puntobello-anchor/puntobello-inpagenav-scrolltotop-spext/.yo-rc.json
- **Changes**: {
  "@microsoft/generator-sharepoint": {
    "nodeVersion": "22.15.0"
  }
}

#### PANTOUM-UPDATE-BADGES: Update SPFx and Node.js version badges
- **Description**: Update badges to SPFx 1.21.1 and Node.js 22.15.0

#### PANTOUM-ADD-VERSION-HISTORY: Add version history entry
- **Description**: Add version 1.2.0 to history

## Build Verification
- **Status**: ✅ All build steps pass

## Configuration
- **Manual Config**: pantoum.config.yml

