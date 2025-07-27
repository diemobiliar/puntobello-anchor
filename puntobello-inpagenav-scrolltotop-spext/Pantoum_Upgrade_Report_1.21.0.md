# SPFx Upgrade Report - puntobello-inpagenav-scrolltotop-spext

## Summary
- **Solution**: puntobello-inpagenav-scrolltotop-spext
- **Target Version**: 1.21.0
- **Date**: 2025-07-27T13:55:53.558Z
- **Pantoum Version**: 1.0.0
- **Status**: ✅ Success

## Command Used
```bash
pantoum \\
  --local-path ../../puntobello-anchor \\
  --toVersion 1.21.0 \\
  --excludePatchIds FN019002,FN017001,FN012019 \\
  --onSingleSolutionFail continue \\
  --perSolutionReports true \\
  --fixM365UpgradeErrors true \\
  --fixSuccessStepErrors true
```

## Patches Applied (25 total)

### M365 CLI Patches (16)

#### FN001001: @microsoft/sp-core-library
- **Description**: Upgrade SharePoint Framework dependency package @microsoft/sp-core-library
- **Type**: updateDependency
- **Package**: @microsoft/sp-core-library
- **New Version**: 1.21.0

#### FN001011: @microsoft/sp-dialog
- **Description**: Upgrade SharePoint Framework dependency package @microsoft/sp-dialog
- **Type**: updateDependency
- **Package**: @microsoft/sp-dialog
- **New Version**: 1.21.0

#### FN001012: @microsoft/sp-application-base
- **Description**: Upgrade SharePoint Framework dependency package @microsoft/sp-application-base
- **Type**: updateDependency
- **Package**: @microsoft/sp-application-base
- **New Version**: 1.21.0

#### FN001034: @microsoft/sp-adaptive-card-extension-base
- **Description**: Upgrade SharePoint Framework dependency package @microsoft/sp-adaptive-card-extension-base
- **Type**: updateDependency
- **Package**: @microsoft/sp-adaptive-card-extension-base
- **New Version**: 1.21.0

#### FN002001: @microsoft/sp-build-web
- **Description**: Upgrade SharePoint Framework dev dependency package @microsoft/sp-build-web
- **Type**: updateDependency
- **Package**: @microsoft/sp-build-web
- **New Version**: 1.21.0

#### FN002002: @microsoft/sp-module-interfaces
- **Description**: Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces
- **Type**: updateDependency
- **Package**: @microsoft/sp-module-interfaces
- **New Version**: 1.21.0

#### FN002024: eslint
- **Description**: Upgrade SharePoint Framework dev dependency package eslint
- **Type**: updateDependency
- **Package**: eslint
- **New Version**: 8.57.1

#### FN002022: @microsoft/eslint-plugin-spfx
- **Description**: Upgrade SharePoint Framework dev dependency package @microsoft/eslint-plugin-spfx
- **Type**: updateDependency
- **Package**: @microsoft/eslint-plugin-spfx
- **New Version**: 1.21.0

#### FN002023: @microsoft/eslint-config-spfx
- **Description**: Upgrade SharePoint Framework dev dependency package @microsoft/eslint-config-spfx
- **Type**: updateDependency
- **Package**: @microsoft/eslint-config-spfx
- **New Version**: 1.21.0

#### FN002026: typescript
- **Description**: Upgrade SharePoint Framework dev dependency package typescript
- **Type**: updateDependency
- **Package**: typescript
- **New Version**: 5.3.3

#### FN002029: @microsoft/rush-stack-compiler-5.3
- **Description**: Install SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-5.3
- **Type**: updateDependency
- **Package**: @microsoft/rush-stack-compiler-5.3
- **New Version**: 0.1.0

#### FN010001: .yo-rc.json version
- **Description**: Update version in .yo-rc.json
- **Type**: updateJsonSnippet
- **File**: /Users/nellodandrea/dev/mobi/github/ferrarirosso/puntobello-anchor/puntobello-inpagenav-scrolltotop-spext/.yo-rc.json
- **Changes**: {
  "@microsoft/generator-sharepoint": {
    "version": "1.21.0"
  }
}

#### FN012017: tsconfig.json extends property
- **Description**: Update tsconfig.json extends property
- **Type**: updateJsonSnippet
- **File**: /Users/nellodandrea/dev/mobi/github/ferrarirosso/puntobello-anchor/puntobello-inpagenav-scrolltotop-spext/tsconfig.json
- **Changes**: {
  "extends": "./node_modules/@microsoft/rush-stack-compiler-5.3/includes/tsconfig-web.json"
}

#### FN021003: package.json engines.node
- **Description**: Update package.json engines.node property
- **Type**: updateJsonSnippet
- **File**: /Users/nellodandrea/dev/mobi/github/ferrarirosso/puntobello-anchor/puntobello-inpagenav-scrolltotop-spext/package.json
- **Changes**: {
  "engines": {
    "node": ">=22.14.0 < 23.0.0"
  }
}

#### FN002021: @rushstack/eslint-config
- **Description**: Upgrade SharePoint Framework dev dependency package @rushstack/eslint-config
- **Type**: updateDependency
- **Package**: @rushstack/eslint-config
- **New Version**: 4.0.1

#### FN010010: .yo-rc.json @microsoft/teams-js SDK version
- **Description**: Update @microsoft/teams-js SDK version in .yo-rc.json
- **Type**: updateJsonSnippet
- **File**: /Users/nellodandrea/dev/mobi/github/ferrarirosso/puntobello-anchor/puntobello-inpagenav-scrolltotop-spext/.yo-rc.json
- **Changes**: {
  "@microsoft/generator-sharepoint": {
    "sdkVersions": {
      "@microsoft/teams-js": "2.24.0"
    }
  }
}

### Manual Configuration Patches (8)

#### M000001: Upgrade pnp sp to 4.14.0 after SPFx upgrade
- **Description**: Upgrade pnp sp to 4.14.0 after SPFx upgrade
- **Type**: updateDependency
- **Package**: @pnp/sp
- **New Version**: 4.14.0

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
- **Description**: Increment version from 1.00.000 to 1.1.0
- **Type**: updateJsonSnippet
- **File**: /Users/nellodandrea/dev/mobi/github/ferrarirosso/puntobello-anchor/puntobello-inpagenav-scrolltotop-spext/package.json
- **Changes**: {
  "version": "1.1.0"
}

#### PANTOUM-UPDATE-BADGES: Update SPFx and Node.js version badges
- **Description**: Update badges to SPFx 1.21.0 and Node.js 18.19.1

#### PANTOUM-ADD-VERSION-HISTORY: Add version history entry
- **Description**: Add version 1.1.0 to history

### AI Fixes Applied (1)

#### 1. Upgrade Error Fix
- **AI applied 2 fixes to resolve build errors**

- **Files Examined (1):**
  - utils.ts

**Detailed Changes (1 files, 2 individual edits):**

**utils.ts (2 changes):**
1. Updated function parameters
2. Modified code logic

- **Build Verification Steps:**
  - Initial SPFx build to identify errors
  - Final build verification after all fixes applied
- **Result**: Successfully fixed 2 issues across 1 file

## Build Verification
- **Status**: ✅ All build steps pass

## Configuration
- **Manual Config**: pantoum.config.yml

