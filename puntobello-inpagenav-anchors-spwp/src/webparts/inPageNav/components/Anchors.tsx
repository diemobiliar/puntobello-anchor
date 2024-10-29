// React core library and hooks
import * as React from 'react';
import { useState, useEffect } from 'react';

// Fluent UI components and controls
import { Link, Icon } from '@fluentui/react';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';

// Types and constants
import { IAnchorTag, IAnchorTagProps } from '../models'; // Interfaces for anchor tag configurations and items
import SharePointService from '../services/SharePointService'; // Service for retrieving SharePoint data
import * as strings from 'InPageNavWebPartStrings'; // Localization strings for the component
import styles from './Anchors.module.scss'; // Scoped CSS module for component styling
import { DisplayMode } from '@microsoft/sp-core-library'; // SPFx constant for display modes (Edit/Read)
import { useAppContext } from '../contexts/AppContext'; // Context provider for accessing global app context
import { getRootEnv } from '../utils'; // Utility to retrieve environment-based CSS styles

/**
 * Anchors component displays a list of anchor tags (links to sections on the page).
 * Supports displaying in both numbered (ordered list) and icon-based (unordered list) formats.
 * @param props - Configuration options for the anchors, passed as IAnchorTagProps.
 */
export function Anchors(props: IAnchorTagProps) {
  // Destructuring context values using the custom hook
  const { context, logger } = useAppContext();

  // Consume the SharePoint service from the service scope
  const spo = context.serviceScope.consume(SharePointService.serviceKey);

  // Retrieve environment settings
  const rootEnv = getRootEnv();

  // State to store the list of page anchor tags
  const [PageTags, setPageAnchorTags] = useState([] as IAnchorTag[]);

  /**
   * useEffect to load page anchor tags when the component mounts or props change.
   */
  useEffect(() => {    
    getPageAnchorTags();
  }, [props]);

  /**
   * Fetches anchor tags from the SharePointService based on the provided configuration props.
   * Sets the retrieved tags in component state for rendering.
   */
  const getPageAnchorTags = async () => {
    try {
      const resultdata = await spo.getPageAnchorTags(props); // Fetch tags based on configuration
      setPageAnchorTags(resultdata);
    } catch (error) {
      logger.error('Anchors.tsx', 'getPageAnchorTags', error); // Log any errors encountered
    }
  };

  /**
   * Renders an individual anchor item with an icon.
   * @param anchorProps - The properties for the anchor item, containing tag data.
   * @returns JSX element for an anchor link with an icon.
   */
  function AnchorItem(anchorProps: any): JSX.Element {
    const item: IAnchorTag = anchorProps.data;

    return (
      <Link className={styles.itemLink} href={item.TagUrl}>
        <div className={styles.itemCell}>
          <Icon iconName={item.TagIcon} className={styles.chevronIcon} />
          <span className={styles.itemContent}>{item.TagValue}</span>
        </div>
      </Link>
    );
  }

  /**
   * Renders an individual anchor item without an icon.
   * @param aProps - The properties for the anchor item, containing tag data.
   * @returns JSX element for an anchor link without an icon.
   */
  function AnchorItemWithoutIcon(aProps: any): JSX.Element {
    const aitem: IAnchorTag = aProps.data;
    return (
      <Link className={styles.nitemLink} href={aitem.TagUrl}>
        <div className={styles.nitemCell}>
          <span className={styles.nitemContent}>{aitem.TagValue}</span>
        </div>
      </Link>
    );
  }

  return (
    // Conditionally render based on whether page tags are available
    (PageTags && PageTags.length > 0) ?
      (props.toggleNumericLayout ?
        // Render as ordered list (numeric layout) without icons if `toggleNumericLayout` is true
        <div style={getRootEnv().css} className={styles.anchorNavNumeric}>
          <div className={styles.row}>
            <ol className={styles.nanchorNavNumericOrderedList}>
              {PageTags.map((item, index) => (
                <li className={styles.nlistitem} key={index}>
                  <AnchorItemWithoutIcon data={item} />
                </li>
              ))}
            </ol>
          </div>
        </div>
        :
        // Render as unordered list with icons if `toggleNumericLayout` is false
        <div style={getRootEnv().css} className={styles.puntoBelloPageAnchors}>
          <div className={styles.row}>
            {PageTags.map((item, index) => (
              <div className={styles.column} key={index}>
                <AnchorItem data={item} />
              </div>
            ))}
          </div>
        </div>
      )
      :
      // Display placeholder in Edit mode if no anchor tags are found
      props.displayMode === DisplayMode.Edit &&
      <Placeholder
        iconName='Edit'
        iconText={strings.NoAnchorsFound}
        description={strings.NoAnchorsFoundDescription}
      />
  );
}
