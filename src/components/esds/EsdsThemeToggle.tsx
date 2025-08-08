import React, { useState, useEffect } from 'react'
import { ElvtIconButton } from '@inform-elevate/elevate-core-ui/dist/react'

interface EsdsThemeToggleProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
}

/**
 * ESDS Theme Toggle Component
 * 
 * Provides a sun/moon toggle for switching between light and dark themes.
 * Uses ESDS design tokens with proper fallback to ELEVATE tokens.
 * Persists theme preference in localStorage.
 */
const EsdsThemeToggle: React.FC<EsdsThemeToggleProps> = ({ 
  className = '', 
  size = 'medium' 
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('esds-theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark)
    setIsDarkMode(shouldUseDark)
    applyTheme(shouldUseDark)
  }, [])

  // Apply theme to document root
  const applyTheme = (dark: boolean) => {
    const root = document.documentElement
    const app = document.querySelector('elvt-application')
    
    if (dark) {
      root.classList.add('esds-theme-dark')
      root.classList.remove('esds-theme-light')
      app?.classList.add('elvt-theme-dark')
      app?.classList.remove('elvt-theme-light')
    } else {
      root.classList.add('esds-theme-light')
      root.classList.remove('esds-theme-dark')
      app?.classList.add('elvt-theme-light')
      app?.classList.remove('elvt-theme-dark')
    }
  }

  // Toggle theme
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    applyTheme(newDarkMode)
    localStorage.setItem('esds-theme', newDarkMode ? 'dark' : 'light')
  }

  // Sun icon path
  const sunIcon = "M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"

  // Moon icon path
  const moonIcon = "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.4 6.35,17.41C9.37,20.43 14,20.54 17.33,17.97Z"

  return (
    <>
      <ElvtIconButton
        size={size}
        label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        icon={isDarkMode ? sunIcon : moonIcon}
        className={`esds-theme-toggle ${className}`}
        onClick={toggleTheme}
        aria-pressed={isDarkMode.toString()}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      />
      
      <style>{`
        .esds-theme-toggle {
          --elvt-icon-button-color: var(--esds-color-text-secondary);
          --elvt-icon-button-color-hover: var(--esds-color-text-accent);
          --elvt-icon-button-background-hover: var(--esds-color-surface-hover);
          
          transition: all var(--esds-transition-normal);
        }
        
        .esds-theme-toggle:hover {
          transform: scale(1.05);
        }
        
        .esds-theme-toggle[aria-pressed="true"] {
          --elvt-icon-button-color: var(--esds-color-text-accent);
        }

        /* Theme transition for smooth switching */
        html {
          transition: background-color var(--esds-transition-normal), 
                      color var(--esds-transition-normal);
        }
        
        * {
          transition: background-color var(--esds-transition-normal), 
                      border-color var(--esds-transition-normal),
                      color var(--esds-transition-normal);
        }

        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          html, * {
            transition: none !important;
          }
          
          .esds-theme-toggle:hover {
            transform: none;
          }
        }
      `}</style>
    </>
  )
}

export default EsdsThemeToggle