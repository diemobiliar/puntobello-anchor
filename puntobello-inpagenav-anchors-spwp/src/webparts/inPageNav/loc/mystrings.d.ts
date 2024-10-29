declare interface IInPageNavWebPartStrings {
  PropertyPaneDescription: string;
  H2AnchorTag: string;
  H3AnchorTag: string;
  IgnoreLastAnchorTag: string;
  IgnoreSecondLastTag: string;
  UIIconEmptyValue: string;
  IconNameLabel: string;
  WarningHTagRequiredLabel: string;
  NoAnchorsFound: string;
  NoAnchorsFoundDescription: string;
  ToggleNumericLayout: string;
}

declare module 'InPageNavWebPartStrings' {
  const strings: IInpageNavWebPartStrings;
  export = strings;
}
