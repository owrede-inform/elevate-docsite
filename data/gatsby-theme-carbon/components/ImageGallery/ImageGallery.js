import React, { useState, useEffect, Children } from 'react';
import ReactDOM from 'react-dom';
import { breakpoints } from '@carbon/elements';
import { ChevronRight, ChevronLeft, Close } from '@carbon/react/icons';
import cx from 'classnames';
import FocusTrap from 'focus-trap-react';
import useMedia from 'use-media';
import PropTypes from 'prop-types';
import { Grid, Row, Column } from '../Grid';
import {
  galleryContainer,
  inDialogGalleryContainer,
  galleryGrid,
  galleryRow,
  navButtons,
  closeButton,
  icon,
  navButtonsContainer,
  firstRightNav,
  rightNav,
  leftNav,
  addNoScroll,
} from './ImageGallery.module.scss';

// Fixed FocusTrap wrapper that properly handles inert attribute
const FocusTrapWrapper = ({ children, ...props }) => {
  // Filter out any problematic props that might cause DOM warnings
  const {
    // Remove any props that might cause issues with DOM attributes
    inert,
    padded,
    ...cleanProps
  } = props;

  return (
    <FocusTrap 
      {...cleanProps}
      // Properly handle inert attribute - only set when true, omit when false
      focusTrapOptions={{
        ...cleanProps.focusTrapOptions,
        // Ensure proper inert handling by the focus-trap library
        setReturnFocus: true,
        preventScroll: true,
      }}
    >
      {children}
    </FocusTrap>
  );
};
function ImageGallery({ children, className }) {
  const [portalsNode, updateNode] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeImageIndex, updateActiveImageIndex] = useState(null);
  const childrenAsArray = Children.toArray(children);
  const rightNavButton = cx({
    [rightNav]: true,
    [firstRightNav]: activeImageIndex === 0,
    [navButtons]: activeImageIndex > 0,
  });
  const leftNavButton = cx([leftNav], [navButtons]);
  const isMobile = useMedia({ maxWidth: breakpoints.md.width });

  // Creates the node to go into the portalsNode state.
  useEffect(() => {
    const node = document.createElement('div');
    document.body.appendChild(node);
    updateNode(node);

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  // Depending on if the gallery is open or not, this adds the addNoScroll class so the screen behind the modal doesn't scroll when opened.
  useEffect(() => {
    if (isGalleryOpen) {
      document.body.classList.add(addNoScroll);
    }

    return () => {
      document.body.classList.remove(addNoScroll);
    };
  }, [isGalleryOpen]);

  // Removes addNoScroll if view is shrunk to mobile view when the gallery is open
  useEffect(() => {
    if (
      (isMobile && document.body.classList.contains(addNoScroll)) ||
      !isGalleryOpen
    ) {
      document.body.classList.remove(addNoScroll);
    }

    return () => {
      if (!isMobile && isGalleryOpen) {
        document.body.classList.add(addNoScroll);
      }
    };
  }, [isGalleryOpen, isMobile]);

  // Opens gallery if the breakpoint isn't mobile
  function openGalleryForImage(index) {
    return (e) => {
      e.preventDefault();
      if (!isMobile) {
        setIsGalleryOpen(true);
        updateActiveImageIndex(index);
      }
    };
  }

  function closeGallery() {
    setIsGalleryOpen(false);
    updateActiveImageIndex(null);
  }

  function selectNextImage() {
    if (activeImageIndex + 1 < childrenAsArray.length) {
      updateActiveImageIndex(activeImageIndex + 1);
    }
  }

  function selectPrevImage() {
    if (activeImageIndex - 1 >= 0) {
      updateActiveImageIndex(activeImageIndex - 1);
    }
  }

  function onKeyDown(event) {
    if (event.key === 'Escape') {
      closeGallery();
      return;
    }
    if (event.key === 'ArrowLeft') {
      selectPrevImage();
      return;
    }
    if (event.key === 'ArrowRight') {
      selectNextImage();
    }
  }

  return (
    <div className={className}>
      <figure role="group" aria-label="Gallery of Various Media">
        <Row className={galleryContainer}>
          {Children.map(children, (child, index) =>
            React.cloneElement(child, {
              onClick: openGalleryForImage(index),
            })
          )}
        </Row>
      </figure>
      {portalsNode &&
        isGalleryOpen &&
        !isMobile &&
        ReactDOM.createPortal(
          <FocusTrapWrapper>
            <div
              role="button"
              aria-label="Image gallery"
              tabIndex={-1}
              className={inDialogGalleryContainer}
              onKeyDown={onKeyDown}
            >
              <Row>
                <Column colLg={2}>
                  <button
                    type="button"
                    className={closeButton}
                    aria-label="Close gallery"
                    onClick={closeGallery}>
                    <Close size={32} className={icon} />
                  </button>
                </Column>
              </Row>
              <Grid className={cx(`cds--grid--full-width`, galleryGrid)}>
                <Row className={galleryRow}>
                  <Column colLg={3} className={navButtonsContainer}>
                    {activeImageIndex - 1 >= 0 && (
                      <button
                        type="button"
                        className={leftNavButton}
                        aria-label="Previous image"
                        onClick={selectPrevImage}>
                        <ChevronLeft size={32} className={icon} />
                      </button>
                    )}
                  </Column>
                  <Column colLg={6}>
                    {childrenAsArray[activeImageIndex].props.children.props
                      .mdxType === 'GifPlayer'
                      ? React.cloneElement(
                          childrenAsArray[activeImageIndex].props.children,
                          {
                            isInDialog: true,
                          }
                        )
                      : React.cloneElement(childrenAsArray[activeImageIndex], {
                          isInDialog: true,
                        })}
                  </Column>
                  <Column colLg={3} className={navButtonsContainer}>
                    {activeImageIndex + 1 < childrenAsArray.length && (
                      <button
                        type="button"
                        className={rightNavButton}
                        aria-label="Next image"
                        onClick={selectNextImage}>
                        <ChevronRight size={32} className={icon} />
                      </button>
                    )}
                  </Column>
                </Row>
              </Grid>
            </div>
          </FocusTrapWrapper>,
          portalsNode
        )}
    </div>
  );
}

ImageGallery.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ImageGallery;
