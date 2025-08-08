import React, { useContext, useEffect, useRef, useCallback } from 'react';
import cx from 'classnames';
import NavContext from '../../util/context/NavContext';
import useWindowSize from '../../util/hooks/useWindowSize';
import useMetadata from '../../util/hooks/useMetadata';
// Removed unused imports: overlay, visible

const Container = ({ children, homepage, theme }) => {
  const { toggleNavState } = useContext(NavContext);
  const windowSize = useWindowSize();
  const lastWindowSize = useRef(windowSize);
  const { navigationStyle } = useMetadata();

  const closeNavs = useCallback(() => {
    toggleNavState('leftNavIsOpen', 'close');
    toggleNavState('switcherIsOpen', 'close');
  }, [toggleNavState]);

  useEffect(() => {
    const windowShrinking =
      lastWindowSize.current &&
      lastWindowSize.current.innerWidth > windowSize.innerWidth;
    if (windowShrinking && windowSize.innerWidth < 1056) {
      closeNavs();
    }
    lastWindowSize.current = windowSize;
  }, [closeNavs, windowSize, windowSize.innerWidth]);

  // Removed unused overlayVisible variable

  const containerClassNames = cx('container', {
    'container--homepage': homepage,
    'container--dark': theme === 'dark',
    'container--white': theme === 'white',
    'container--g10': theme === 'g10',
    'container--header--nav': navigationStyle,
  });

  return (
    <>
      {/* Overlay completely removed to fix mobile navigation issue */}
      <main
        id="main-content"
        className={containerClassNames}>
        {children}
      </main>
    </>
  );
};

export default Container;
