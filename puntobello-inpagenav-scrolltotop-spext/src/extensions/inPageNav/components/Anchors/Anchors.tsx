// Fluent UI imports for various components and hooks
import { Icon, Link, Modal } from '@fluentui/react'; // UI components for icons, links, and modal dialogs
import { useBoolean, useId } from '@fluentui/react-hooks'; // Hooks for managing boolean state and generating unique IDs
import { CancelIcon, MoreVerticalIcon } from '@fluentui/react-icons-mdl2'; // Specific Fluent UI icons
import * as React from 'react'; // Core React library

// Application-specific models and styling
import { IAnchorTagProps, IAnchorTag } from '../../models'; // Interfaces for anchor tag properties and items
import styles from './Anchors.module.scss'; // Scoped CSS module for component styling
import { getRootEnv } from '../../utils'; // Utility for retrieving environment variables for CSS

// Interface for the props accepted by the Anchors component
interface IAnchorReaderViewerProps {
  config: IAnchorTagProps;
  tags: IAnchorTag[];
}

/**
 * Anchors component that displays a list of anchor tags within a modal.
 * The anchors can be displayed with or without icons, based on configuration.
 * @param props - The configuration and tags for rendering the anchor items.
 */
export function Anchors(props: IAnchorReaderViewerProps) {
  // Boolean state to manage the visibility of the callout (modal)
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const buttonId = useId('anchors-callout-button'); // Unique ID for the callout button
  const titleId = useId('title'); // Unique ID for the modal title

  /**
   * Renders an anchor item with an icon.
   * @param item - An anchor tag to display with an icon.
   */
  const AnchorItem = (item: IAnchorTag): JSX.Element => {
    return (
      <Link className={styles.itemLink} href={item.TagUrl} onClick={toggleIsCalloutVisible}>
        <div className={styles.itemCell}>
          <Icon iconName={item.TagIcon} className={styles.chevronIcon} />
          <span className={styles.itemContent}>{item.TagValue}</span>
        </div>
      </Link>
    );
  };

  /**
   * Renders an anchor item without an icon.
   * @param item - An anchor tag to display without an icon.
   */
  const AnchorItemWithoutIcon = (item: IAnchorTag): JSX.Element => {
    return (
      <Link className={styles.nitemLink} href={item.TagUrl} onClick={toggleIsCalloutVisible}>
        <div className={styles.nitemCell}>
          <span className={styles.nitemContent}>{item.TagValue}</span>
        </div>
      </Link>
    );
  };

  // React effect to apply CSS environment variables when the callout (modal) is opened
  React.useEffect(() => {
    if (isCalloutVisible) {
      // Retrieve the root HTML element and environment-specific CSS variables
      const root = document.documentElement;
      const envStyles = getRootEnv().css as Record<string, string>;

      // Apply each CSS variable to the root element
      Object.keys(envStyles).forEach(key => {
        root.style.setProperty(key, envStyles[key]);
      });

      return () => {
        // Optionally remove the variables when the modal is closed
        Object.keys(envStyles).forEach(key => {
          root.style.removeProperty(key);
        });
      };
    }
  }, [isCalloutVisible]);

  return (
    <div className={styles.anchorsWrapper}>
      {/* Button to open the callout (modal) */}
      <div className={styles.buttonMore}>
        <Link id={buttonId} className={styles.link} onClick={toggleIsCalloutVisible}>
          <MoreVerticalIcon className={styles.icon} />
        </Link>
      </div>

      {/* Modal that displays the anchor tags based on the configuration */}
      <Modal
        titleAriaId={titleId}
        isOpen={isCalloutVisible}
        onDismiss={toggleIsCalloutVisible}
        isClickableOutsideFocusTrap={true}
        isDarkOverlay={false}
        containerClassName={styles.modalcontainer}
      >
        <div className={styles.modalbody}>
          {/* Conditionally render anchor tags based on the configuration */}
          {(props.tags && props.tags.length > 0) ?
            (props.config.toggleNumericLayout ?
              // Numeric layout for anchors without icons
              <div className={styles.anchorNavNumeric}>
                <div className={styles.row}>
                  <ol className={styles.nanchorNavNumericOrderedList}>
                    {props.tags.map((item, index) => (
                      <li className={styles.nlistitem} key={index}>
                        <AnchorItemWithoutIcon {...item} />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              :
              // Default layout for anchors with icons
              <div className={styles.PageAnchors}>
                <div className={styles.row}>
                  {props.tags.map((item, index) => (
                    <div className={styles.column} key={index}>
                      <AnchorItem {...item} />
                    </div>
                  ))}
                </div>
              </div>
            )
            : <></>}
          {/* Footer with a cancel button to close the modal */}
          <div className={styles.modalfooter}>
            <div className={styles.buttonModal}>
              <Link className={styles.link} onClick={toggleIsCalloutVisible} >
                <CancelIcon className={styles.icon} />
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
