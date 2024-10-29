import { DisplayMode } from "@microsoft/sp-core-library";

export interface IInPageNavWebPartProps {
    toggleNumericLayout: boolean;
    processH2: boolean;
    iconH2: string;
    processH3: boolean;
    iconH3: string;
    processH4: boolean;
    iconH4: string;
    ignoreLastTag: boolean;
    ignoreSecondLastTag: boolean;
    displayMode: DisplayMode;
}
