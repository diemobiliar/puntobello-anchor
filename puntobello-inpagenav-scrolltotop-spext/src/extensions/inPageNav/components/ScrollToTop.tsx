// React core library
import * as React from 'react';

// Fluent UI icons and hooks
import { ChevronUpMedIcon } from '@fluentui/react-icons-mdl2'; // Chevron icon for scroll-up functionality
import { useBoolean } from '@fluentui/react-hooks'; // Hook for managing boolean state
import { Link } from '@fluentui/react'; // Link component for clickable elements

// Styles, services, models, and utilities
import styles from './ScrollToTop.module.scss'; // Scoped CSS module for component styling
import { SharePointService, ISharePointService } from '../services'; // Service for SharePoint data handling
import { IAnchorTagProps, IAnchorTag } from '../models'; // Interfaces for anchor tag configurations and items
import { Anchors } from './Anchors/Anchors'; // Anchors component for displaying anchor tags
import { useAppContext } from '../contexts/AppContext'; // Context provider for accessing global app context
import { getRootEnv } from '../utils'; // Utility for environment-based CSS styles

// Interface defining the ScrollToTop component’s state
export interface IScrollToTopState {
  is_visible: boolean;
  config?: IAnchorTagProps;
  anchorTags?: IAnchorTag[];
  showTags: boolean;
}

/**
 * ScrollToTop component that provides a scroll-to-top button,
 * displays anchor tags in a callout if configured,
 * and manages scroll visibility and anchor data dynamically.
 */
export function ScrollToTop() {
  // Retrieve the application context
  const { context } = useAppContext();

  // Boolean state for visibility of the scroll-to-top button
  const [isVisible, { setTrue: setVisible, setFalse: setInvisible }] = useBoolean(false);

  // State for storing configuration and anchor tags data
  const [configuration, setConfiguration] = React.useState<IAnchorTagProps>(null);
  const [anchorTags, setAnchorTags] = React.useState<IAnchorTag[]>([]);

  // Reference to the scroll region element
  const scrollRegionRef = React.useRef<HTMLElement | null>(null);

  /**
   * Callback to toggle the visibility of the scroll-to-top button
   * based on the scroll position within the scroll region.
   */
  const toggleVisibility = React.useCallback(() => {
    const scrollRegion = scrollRegionRef.current;
    if (scrollRegion) {
      // Show the button if scrolled more than 100px, otherwise hide it
      if (scrollRegion.scrollTop > 100) {
        setVisible();
      } else {
        setInvisible();
      }
    }
  }, [setVisible, setInvisible]);

  /**
   * Effect to set up the scroll region and attach scroll event listener
   * once the DOM is ready. Uses an interval to wait until the scroll region is available.
   */
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      // Find the scroll region element if not yet set
      if (!scrollRegionRef.current) {
        scrollRegionRef.current = document.querySelector('[data-automation-id="contentScrollRegion"]') as HTMLElement;
        if (scrollRegionRef.current) {
          scrollRegionRef.current.addEventListener('scroll', toggleVisibility); // Attach scroll listener
          clearInterval(intervalId); // Clear interval once scroll region is found
        }
      }
    }, 100);

    return () => {
      clearInterval(intervalId); // Clean up interval on unmount
      if (scrollRegionRef.current) {
        scrollRegionRef.current.removeEventListener('scroll', toggleVisibility); // Remove event listener
      }
    };
  }, [toggleVisibility]);

  /**
   * Effect to load anchor data when the scroll-to-top button becomes visible.
   * Resets anchor tags and configuration on visibility change.
   */
  React.useEffect(() => {
    if (isVisible) {
      loadAnchorData();
    }

    return () => {
      setAnchorTags([]); // Clear anchor tags on cleanup
      setConfiguration(null); // Clear configuration on cleanup
    };
  }, [isVisible]);

  /**
   * Loads anchor configuration and tags data from the SharePointService
   * and updates the component state with the retrieved values.
   */
  const loadAnchorData = async () => {
    const service: ISharePointService = context.serviceScope.consume(SharePointService.serviceKey);
    const configuration = await service.getAnchorWebpartConfiguration(); // Fetch anchor web part configuration
    const anchorTags = await service.getPageAnchorTags(configuration); // Fetch anchor tags based on configuration

    setConfiguration(configuration);
    setAnchorTags(anchorTags);
  };

  /**
   * Scrolls the content region to the top smoothly when the button is clicked.
   */
  const scrollToTop = () => {
    const scrollFrame = scrollRegionRef.current;
    if (scrollFrame) {
      scrollFrame.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scrolling behavior
      });
    }
  };

  return (
    <div style={getRootEnv().css} className={styles.scrollToTop}>
      {isVisible && scrollRegionRef.current && scrollRegionRef.current.scrollTop > 0 ? (
        <span>
          {/* Scroll-to-top link */}
          <Link className={styles.link} onClick={scrollToTop}>
            <ChevronUpMedIcon className={styles.icon} />
          </Link>
          {/* Conditionally render Anchors component if configuration and tags are available */}
          {configuration && configuration.anchorWebpartFound && anchorTags.length > 0 && (
            <Anchors config={configuration} tags={anchorTags} />
          )}
        </span>
      ) : null}
    </div>
  );
}
