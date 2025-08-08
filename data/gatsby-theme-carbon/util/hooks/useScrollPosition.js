import { useState, useEffect } from 'react';
import _throttle from 'lodash.throttle';

let passiveListenerSupported;

// Check for passive listener support only in browser environment
if (typeof window !== 'undefined') {
  try {
    const opts = Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get() {
        passiveListenerSupported = true;
      },
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (e) {
    // Passive listener test failed - using default
    passiveListenerSupported = false;
  }
} else {
  passiveListenerSupported = false;
}

const getPosition = () => {
  if (typeof window !== 'undefined') {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset,
    };
  }
  return {
    x: null,
    y: null,
  };
};

const useScrollPosition = () => {
  const [position, setPosition] = useState(getPosition());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = _throttle(() => {
      setPosition(getPosition());
    }, 200);

    window.addEventListener(
      'scroll',
      handleScroll,
      passiveListenerSupported ? { passive: true } : false
    );

    return () => {
      handleScroll.cancel();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return position;
};

export default useScrollPosition;
