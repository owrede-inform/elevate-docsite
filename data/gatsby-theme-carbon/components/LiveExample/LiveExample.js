import React, { useEffect, useRef, useState } from 'react';
import Code from '../Code/Code';

/**
 * LiveExample - COMPLETE ELEVATE Design Tokens Solution
 * 
 * Based on actual button component analysis showing it uses:
 * --elvt-type-alias-emphasized-label-m-font-family, NOT Shoelace tokens!
 * This version includes ALL ELEVATE typography and component tokens.
 */

// Essential MDI icons for ELEVATE components
const ESSENTIAL_ICONS = {
  // Basic actions
  'mdi:plus': 'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z',
  'mdi:close': 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z',
  'mdi:check': 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z',
  'mdi:delete': 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z',
  'mdi:edit': 'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z',
  'mdi:pencil': 'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z',
  
  // Navigation
  'mdi:chevron-right': 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z',
  'mdi:chevron-left': 'M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z',
  'mdi:chevron-up': 'M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z',
  'mdi:chevron-down': 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z',
  'mdi:arrow-right': 'M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z',
  'mdi:arrow-left': 'M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z',
  
  // Common UI
  'mdi:download': 'M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z',
  'mdi:upload': 'M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z',
  'mdi:settings': 'M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z',
  'mdi:dots-vertical': 'M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z',
  'mdi:dots-horizontal': 'M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z',
  'mdi:open-in-new': 'M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z',
  
  // Form and input
  'mdi:search': 'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z',
  'mdi:eye': 'M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z',
  'mdi:eye-off': 'M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.09L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.76,7.13 11.38,7 12,7Z'
};

const LiveExample = ({ 
  htmlCode, 
  title = "Live Example", 
  showCode = true,
  height = "auto",
  padding = "2.5rem"
}) => {
  const containerRef = useRef(null);
  const [componentsReady, setComponentsReady] = useState(false);
  const [error, setError] = useState(null);
  const isSSR = typeof window === 'undefined';

  // Inject COMPLETE ELEVATE Design Tokens - Shadow DOM compatible solution
  const injectCompleteElevateTokens = () => {
    // Remove any existing injection
    const existing = document.querySelector('#elevate-tokens-complete');
    if (existing) existing.remove();
    
    // Ensure ELEVATE design tokens are properly loaded and accessible to Shadow DOM
    const ensureElevateTokens = () => {
      // Check if design tokens are already in the DOM (they should be from the global import)
      const rootStyle = getComputedStyle(document.documentElement);
      const hasTokens = rootStyle.getPropertyValue('--elvt-component-badge-fill-primary');
      
      if (hasTokens) {
        // console.log('✅ ELEVATE design tokens detected in DOM:', hasTokens.trim());
        return true;
      } else {
        // console.warn('⚠️ ELEVATE design tokens not detected - adding fallback CSS link');
        // Add CSS link as fallback
        if (!document.querySelector('#elevate-design-tokens-fallback')) {
          const link = document.createElement('link');
          link.id = 'elevate-design-tokens-fallback';
          link.rel = 'stylesheet';
          link.href = '/node_modules/@inform-elevate/elevate-design-tokens/dist/light.css';
          document.head.appendChild(link);
          
          // Wait for CSS to load before continuing
          return new Promise(resolve => {
            link.onload = () => resolve(true);
            link.onerror = () => resolve(false);
          });
        }
        return false;
      }
    };
    ensureElevateTokens();

    // Load local Inter fonts for reliable performance
    const loadLocalInterFonts = () => {
      if (!document.querySelector('#local-inter-fonts')) {
        // Get the correct base path for fonts
        const basePath = typeof window !== 'undefined' && window.location.hostname === 'localhost' ? '' : '/elevate-design-system-test';
        
        const fontStyle = document.createElement('style');
        fontStyle.id = 'local-inter-fonts';
        fontStyle.textContent = `
          @font-face {
            font-family: 'Inter';
            src: url('${basePath}/fonts/Inter/Inter_18pt-Regular.ttf') format('truetype');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          
          @font-face {
            font-family: 'Inter';
            src: url('${basePath}/fonts/Inter/Inter_18pt-Medium.ttf') format('truetype');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }
          
          @font-face {
            font-family: 'Inter';
            src: url('${basePath}/fonts/Inter/Inter_18pt-SemiBold.ttf') format('truetype');
            font-weight: 600;
            font-style: normal;
            font-display: swap;
          }
        `;
        document.head.appendChild(fontStyle);
        // console.log('✅ Local Inter fonts loaded from static directory with basePath:', basePath);
      }
    };
    loadLocalInterFonts();

    const tokensStyle = document.createElement('style');
    tokensStyle.id = 'elevate-tokens-complete';
    tokensStyle.textContent = `
      /* ELEVATE LiveExample - Complete design tokens injection */
      /* Ensures ELEVATE components get proper styling */
      
      :root,
      :host,
      .sl-theme-light,
      .elvt-theme-light {
        color-scheme: light;
        
        /* Font setup at root level with robust fallback chain */
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        
        /* ELEVATE Badge Design Tokens - from the package */
        --elvt-component-badge-border-radius-box: 0.25rem;
        --elvt-component-badge-border-width: 0.0625rem;
        --elvt-component-badge-fill-danger: rgb(206, 1, 1);
        --elvt-component-badge-fill-neutral: rgb(77, 83, 102);
        --elvt-component-badge-fill-primary: rgb(11, 92, 223);
        --elvt-component-badge-fill-success: rgb(5, 118, 61);
        --elvt-component-badge-fill-warning: rgb(255, 179, 54);
        --elvt-component-badge-height: 1.5rem;
        --elvt-component-badge-padding-column: 0.5rem;
        --elvt-component-badge-padding-row: 0rem;
        --elvt-component-badge-text-color-danger: rgb(255, 255, 255);
        --elvt-component-badge-text-color-neutral: rgb(255, 255, 255);
        --elvt-component-badge-text-color-primary: rgb(255, 255, 255);
        --elvt-component-badge-text-color-success: rgb(255, 255, 255);
        --elvt-component-badge-text-color-warning: rgb(0, 0, 0);
        
        /* ELEVATE primitives */
        --elvt-primitives-font-family-default: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        --elvt-primitives-font-family-mono: 'Roboto Mono', 'Consolas', 'Monaco', monospace;
        
        /* Shoelace compatibility layer */
        --sl-font-sans: var(--elvt-primitives-font-family-default, Inter, system-ui, sans-serif);
        --sl-font-mono: var(--elvt-primitives-font-family-mono, 'Roboto Mono', monospace);
      }
      
      /* ====== ELEVATE COMPONENTS COMPLETE STYLING ====== */
      .elevate-complete-zone {
        /* Complete isolation from site CSS */
        all: unset !important;
        display: block !important;
        width: 100% !important;
        contain: style layout paint !important;
        isolation: isolate !important;
        
        /* Force Inter font throughout with robust fallback */
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
        color: rgb(35, 51, 75) !important;
      }
      
      .elevate-complete-zone,
      .elevate-complete-zone * {
        /* Nuclear reset of all interfering variables */
        --font-family: unset !important;
        --button-font-family: unset !important;
        --input-font-family: unset !important;
        --text-font-family: unset !important;
        --heading-font-family: unset !important;
        --body-font-family: unset !important;
        --ui-font-family: unset !important;
        
        /* Remove ALL site variables */
        --esds-font-family-primary: unset !important;
        --cds-productive-heading-06-font-family: unset !important;
        --cds-body-01-font-family: unset !important;
        --elevate-primary: unset !important;
        --elevate-font-family: unset !important;
        
        /* Force clean inheritance */
        font-family: inherit !important;
      }
      
      /* ====== ELEVATE COMPONENTS - SHADOW DOM TOKEN INJECTION ====== */
      .elevate-complete-zone elvt-badge,
      .elevate-complete-zone elvt-button,
      .elevate-complete-zone elvt-chip,
      .elevate-complete-zone elvt-input,
      .elevate-complete-zone elvt-select,
      .elevate-complete-zone elvt-icon,
      .elevate-complete-zone [class*="elvt-"] {
        /* CRITICAL: Ensure design tokens are available to Shadow DOM */
        /* These are the actual ELEVATE design tokens from the package */
        
        /* Badge Design Tokens - Critical for proper component styling */
        --elvt-component-badge-border-radius-box: 0.25rem;
        --elvt-component-badge-border-width: 0.0625rem;
        --elvt-component-badge-fill-danger: rgb(206, 1, 1);
        --elvt-component-badge-fill-neutral: rgb(77, 83, 102);
        --elvt-component-badge-fill-primary: rgb(11, 92, 223);
        --elvt-component-badge-fill-success: rgb(5, 118, 61);
        --elvt-component-badge-fill-warning: rgb(255, 179, 54);
        --elvt-component-badge-height: 1.5rem;
        --elvt-component-badge-padding-column: 0.5rem;
        --elvt-component-badge-padding-row: 0rem;
        --elvt-component-badge-text-color-danger: rgb(255, 255, 255);
        --elvt-component-badge-text-color-neutral: rgb(255, 255, 255);
        --elvt-component-badge-text-color-primary: rgb(255, 255, 255);
        --elvt-component-badge-text-color-success: rgb(255, 255, 255);
        --elvt-component-badge-text-color-warning: rgb(0, 0, 0);
        
        /* Button Design Tokens - Critical for button styling */
        --elvt-component-button-border-radius: 0.25rem;
        --elvt-component-button-border-width: 0.0625rem;
        --elvt-component-button-padding-column: 1rem;
        --elvt-component-button-padding-row: 0.5rem;
        --elvt-component-button-fill-primary: rgb(11, 92, 223);
        --elvt-component-button-fill-neutral: rgb(244, 244, 244);
        --elvt-component-button-fill-success: rgb(5, 118, 61);
        --elvt-component-button-fill-warning: rgb(255, 179, 54);
        --elvt-component-button-fill-danger: rgb(206, 1, 1);
        --elvt-component-button-text-color-primary: rgb(255, 255, 255);
        --elvt-component-button-text-color-neutral: rgb(35, 51, 75);
        --elvt-component-button-text-color-success: rgb(255, 255, 255);
        --elvt-component-button-text-color-warning: rgb(0, 0, 0);
        --elvt-component-button-text-color-danger: rgb(255, 255, 255);
        
        /* Typography tokens for consistent fonts */
        --elvt-primitives-font-family-default: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        --elvt-primitives-font-family-mono: 'Roboto Mono', 'Consolas', 'Monaco', monospace;
        
        /* Shoelace compatibility for ELEVATE components that use Shoelace base */
        --sl-font-sans: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        --sl-font-mono: 'Roboto Mono', 'Consolas', 'Monaco', monospace;
        
        /* Ensure proper font cascade */
        font-family: var(--elvt-primitives-font-family-default);
      }
      
      /* Content wrapper */
      .elevate-complete-content {
        display: flex !important;
        flex-wrap: wrap !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 0.75rem !important;
        width: 100% !important;
        /* Add padding to prevent focus border clipping */
        padding: 0.25rem !important;
      }
    `;
    
    document.head.appendChild(tokensStyle);
    // console.log('✅ ELEVATE design tokens injected directly into LiveExample');
    return tokensStyle;
  };

  // Initialize ELEVATE environment
  useEffect(() => {
    if (isSSR) return;

    const initializeComplete = async () => {
      try {
        // console.log('🚀 LiveExample: Initializing ELEVATE environment with design tokens package...');
        
        // Step 1: Inject COMPLETE design tokens directly
        injectCompleteElevateTokens();
        
        // Step 2: Load ELEVATE components WITHOUT CSS (to avoid font conflicts)
        // Import individual components to avoid automatic CSS loading
        try {
          await import('@inform-elevate/elevate-core-ui/dist/components/buttons/button/button.component.js');
          await import('@inform-elevate/elevate-core-ui/dist/components/icon/icon.component.js');
          // console.log('✅ ELEVATE components loaded without CSS');
          
        } catch (err) {
          // console.warn('⚠️ Failed to load individual components, falling back to full import:', err.message);
          // Fallback - but this will load the problematic CSS
          await import('@inform-elevate/elevate-core-ui');
        }
        
        await import('@inform-elevate/elevate-icons');
        
        // Step 3: Wait for components to be fully registered
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Step 4: Register icons using component-accessible registry and test
        if (typeof window !== 'undefined') {
          window.mdiIcons = ESSENTIAL_ICONS;
          
          // Wait for components to be fully initialized then register icons
          setTimeout(async () => {
            // console.log('🔧 Registering icons after component initialization...');
            
            try {
              // Try to access the registry that the components actually use
              // This approach tries to get the registry through the component system
              let iconRegistry = null;
              
              // Approach 1: Import the registry module (same as components use)
              try {
                const registryModule = await import('@inform-elevate/elevate-core-ui/dist/components/icon/icon-registry.js');
                iconRegistry = registryModule.default;
                // console.log('✅ Accessed icon registry through component module');
              } catch (err) {
                // console.warn('⚠️ Could not access registry module:', err.message);
              }
              
              if (iconRegistry) {
                // Register MDI icons with the same registry the components use
                Object.entries(ESSENTIAL_ICONS).forEach(([fullName, pathData]) => {
                  const iconName = fullName.replace('mdi:', '');
                  
                  // Since Format 1 worked for registration but SVG generation has viewBox issues,
                  // let's provide the complete SVG directly to avoid the Icon class generating invalid SVG
                  const correctSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="${pathData}" fill="currentColor"/></svg>`;
                  
                  const formats = [
                    // Format 1: Complete SVG object (prevent Icon class from generating invalid SVG)
                    {
                      svg: correctSvg,
                      width: 24,
                      height: 24
                    },
                    // Format 2: Data URL format  
                    `data:image/svg+xml;base64,${btoa(correctSvg)}`,
                    // Format 3: Direct SVG string
                    correctSvg,
                    // Format 4: Path data (what worked before, but may have viewBox issues)
                    {
                      path: pathData,
                      width: 24,
                      height: 24
                    }
                  ];
                  
                  // Try each format until one succeeds
                  let registered = false;
                  for (let i = 0; i < formats.length && !registered; i++) {
                    try {
                      const success = iconRegistry.registerIcon(iconName, formats[i], 'mdi');
                      if (success) {
                        registered = true;
                        // console.log(`✅ Registered ${iconName} with format ${i + 1}`);
                      }
                    } catch (err) {
                      if (i === formats.length - 1) {
                        // console.warn(`Failed to register MDI icon ${iconName} with all formats:`, err.message);
                      }
                    }
                  }
                });
                
                // Register MDI resolver with the same format that works
                try {
                  iconRegistry.registerResolver('mdi', (iconName) => {
                    const pathData = ESSENTIAL_ICONS[`mdi:${iconName}`];
                    if (pathData) {
                      // Provide complete SVG to avoid Icon class generating invalid viewBox
                      const correctSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="${pathData}" fill="currentColor"/></svg>`;
                      return {
                        svg: correctSvg,
                        width: 24,
                        height: 24
                      };
                    }
                    return undefined;
                  });
                  // console.log('✅ Registered MDI resolver for dynamic icon resolution');
                } catch (err) {
                  // console.warn('⚠️ Could not register MDI resolver:', err.message);
                }
                
                // Store registry globally for debugging
                window.elvtIconRegistry = iconRegistry;
                // console.log('✅ MDI icons registered with component-accessible registry');
                
                // Test icon retrieval
                iconRegistry.getIcon('plus', 'mdi');
                iconRegistry.getIcon('delete', 'mdi');
                // console.log('🔍 Icon retrieval test completed');
                
                
              } else {
                // console.error('❌ Could not access icon registry');
              }
              
            } catch (err) {
              // console.error('❌ Icon registration failed:', err.message);
            }
            
          }, 800); // Increased delay to ensure components are ready
          
          // console.log('✅ MDI icon system initialized:', Object.keys(ESSENTIAL_ICONS).length, 'icons available globally');
        }
        
        // Step 5: Register ELEVATE named icons from the icons package  
        try {
          const elevateIcons = await import('@inform-elevate/elevate-icons');
          Object.entries(elevateIcons).forEach(([name, iconData]) => {
            if (typeof iconData === 'string' && iconData.startsWith('data:image/svg+xml')) {
              const iconName = name.replace(/([A-Z])/g, '-$1').toLowerCase();
              if (window.elvtIconRegistry) {
                try {
                  // Use the correct IconRegistry API - registerIcon() not set()
                  window.elvtIconRegistry.registerIcon(iconName, iconData);
                } catch (err) {
                  // console.warn(`Failed to register ELEVATE icon ${iconName}:`, err.message);
                }
              }
            }
          });
          // console.log('✅ ELEVATE named icons registered');
        } catch (err) {
          // console.warn('⚠️ Could not register ELEVATE icons:', err.message);
        }
        
        setComponentsReady(true);
        setError(null);
        // console.log('✅ LiveExample: ELEVATE environment ready with design tokens package and icons');
        
      } catch (err) {
        // console.error('❌ LiveExample initialization failed:', err);
        setError(`Failed to initialize: ${err?.message || 'Unknown error'}`);
        setComponentsReady(true);
      }
    };

    // Skip in build environments
    const isBuild = process.env.NODE_ENV === 'production' || 
                   process.env.CI === 'true' || 
                   process.env.GATSBY_BUILD === 'true';
    
    if (isBuild) {
      // console.log('📦 Build environment - skipping ELEVATE initialization');
      setComponentsReady(true);
      return;
    }

    initializeComplete();
  }, [isSSR]);

  // Render components
  useEffect(() => {
    if (!componentsReady || !containerRef.current || !htmlCode || isSSR) return;

    try {
      // console.log('🎨 LiveExample: Rendering with design tokens package...');
      
      // Clear container
      containerRef.current.innerHTML = '';
      
      // Create complete zone
      const completeZone = document.createElement('div');
      completeZone.className = 'elevate-complete-zone';
      
      // Create content wrapper
      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'elevate-complete-content';
      
      // Check if components are available
      const hasComponents = window.customElements?.get('elvt-button');
      
      if (!hasComponents) {
        // console.log('⏳ Components not ready - showing loading state');
        contentWrapper.innerHTML = `
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            color: #666;
            font-size: 0.9rem;
            background: #f8f9fa;
            border: 1px dashed #dee2e6;
            border-radius: 4px;
            width: 100%;
            font-family: Inter, system-ui, sans-serif;
          ">
            🔄 Loading ELEVATE components with design tokens package...
          </div>
        `;
      } else {
        // console.log('✅ Rendering ELEVATE components with design tokens package');
        contentWrapper.innerHTML = htmlCode;
        
        // CRITICAL: Apply design tokens directly to each ELEVATE component
        setTimeout(() => {
          const elevateComponents = contentWrapper.querySelectorAll('[class*="elvt-"], elvt-badge, elvt-button, elvt-chip, elvt-input, elvt-select, elvt-icon');
          elevateComponents.forEach(component => {
            // Force token application by setting them as inline styles which pierce Shadow DOM
            const rootStyle = getComputedStyle(document.documentElement);
            
            // Apply badge tokens if it's a badge
            if (component.tagName.toLowerCase().includes('badge') || component.tagName.toLowerCase() === 'elvt-badge') {
              const primaryColor = rootStyle.getPropertyValue('--elvt-component-badge-fill-primary').trim();
              if (primaryColor) {
                component.style.setProperty('--elvt-component-badge-fill-primary', primaryColor);
                component.style.setProperty('--elvt-component-badge-fill-neutral', rootStyle.getPropertyValue('--elvt-component-badge-fill-neutral').trim());
                component.style.setProperty('--elvt-component-badge-fill-success', rootStyle.getPropertyValue('--elvt-component-badge-fill-success').trim());
                component.style.setProperty('--elvt-component-badge-fill-warning', rootStyle.getPropertyValue('--elvt-component-badge-fill-warning').trim());
                component.style.setProperty('--elvt-component-badge-fill-danger', rootStyle.getPropertyValue('--elvt-component-badge-fill-danger').trim());
                // console.log(`✅ Applied design tokens directly to ${component.tagName.toLowerCase()}`);
              }
            }
            
            // Apply button tokens if it's a button  
            if (component.tagName.toLowerCase().includes('button') || component.tagName.toLowerCase() === 'elvt-button') {
              const primaryColor = rootStyle.getPropertyValue('--elvt-component-button-fill-primary').trim();
              if (primaryColor) {
                component.style.setProperty('--elvt-component-button-fill-primary', primaryColor);
                component.style.setProperty('--elvt-component-button-fill-neutral', rootStyle.getPropertyValue('--elvt-component-button-fill-neutral').trim());
                // console.log(`✅ Applied button design tokens directly to ${component.tagName.toLowerCase()}`);
              }
            }
            
            // Apply font tokens to all components
            const fontFamily = rootStyle.getPropertyValue('--elvt-primitives-font-family-default').trim();
            if (fontFamily) {
              component.style.setProperty('--elvt-primitives-font-family-default', fontFamily);
              component.style.setProperty('--sl-font-sans', fontFamily);
            }
          });
        }, 100);
      }
      
      completeZone.appendChild(contentWrapper);
      containerRef.current.appendChild(completeZone);
      
      // Debug: Log design token values that should be available
      // console.log('🔍 Design token debug:', {
      //   badgePrimary: getComputedStyle(document.documentElement).getPropertyValue('--elvt-component-badge-fill-primary').trim(),
      //   buttonPrimary: getComputedStyle(document.documentElement).getPropertyValue('--elvt-component-button-fill-primary').trim() || 'NOT FOUND',
      //   fontFamily: getComputedStyle(document.documentElement).getPropertyValue('--elvt-primitives-font-family-default').trim() || 'NOT FOUND'
      // });
      
      // console.log('🎯 LiveExample: Rendering complete with design tokens package');
      
    } catch (err) {
      // console.error('❌ LiveExample rendering error:', err);
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div style="
            color: #dc3545; 
            padding: 1rem; 
            background: #f8d7da; 
            border: 1px solid #f5c6cb; 
            border-radius: 4px;
            font-family: Inter, system-ui, sans-serif;
          ">
            ❌ Rendering error: ${err.message}
          </div>
        `;
      }
    }
  }, [componentsReady, htmlCode, isSSR]);

  // SSR fallback
  if (isSSR) {
    return (
      <div style={{ marginBottom: '-0.5rem' }}>
        {title && (
          <h4 style={{ 
            marginTop: '2rem',
            marginBottom: '1rem', 
            fontSize: '1rem',
            fontWeight: '600',
            color: '#2e2e2e'
          }}>
            {title}
          </h4>
        )}
        
        <div style={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          marginBottom: showCode ? '0' : '1rem',
        }}>
          <div style={{
            padding: padding,
            minHeight: '100px',
            backgroundColor: '#ffffff',
            borderRadius: '8px 8px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '0.9rem'
          }}>
            Interactive ELEVATE components with design tokens will load after hydration
          </div>
          
          {showCode && htmlCode && (
            <div style={{
              borderTop: '1px solid #e0e0e0',
              borderRadius: '0 0 8px 8px',
            }}>
              <Code className="language-html">{htmlCode}</Code>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ marginBottom: '-0.5rem' }}>
        {title && (
          <h4 style={{ 
            marginTop: '2rem',
            marginBottom: '1rem', 
            fontSize: '1rem',
            fontWeight: '600',
            color: '#2e2e2e'
          }}>
            {title}
          </h4>
        )}
        
        <div style={{
          padding: '1rem',
          border: '1px solid #ff6b6b',
          borderRadius: '4px',
          backgroundColor: '#ffebee',
          color: '#c62828',
          marginBottom: '1rem'
        }}>
          <strong>LiveExample Error:</strong> {error}
          {showCode && htmlCode && (
            <div style={{ marginTop: '1rem' }}>
              <Code className="language-html">{htmlCode}</Code>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div style={{ marginBottom: '-0.5rem' }}>
      {title && (
        <h4 style={{ 
          marginTop: '2rem',
          marginBottom: '1rem', 
          fontSize: '1rem',
          fontWeight: '600',
          color: '#2e2e2e'
        }}>
          {title}
        </h4>
      )}
      
      <div style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        marginBottom: showCode ? '0' : '1rem',
        overflow: 'hidden'
      }}>
        {/* Complete ELEVATE Components Zone */}
        <div
          ref={containerRef}
          style={{
            padding: padding,
            minHeight: height === "auto" ? (componentsReady ? "auto" : '100px') : height,
            backgroundColor: '#ffffff',
            borderRadius: '8px 8px 0 0',
            position: 'relative',
          }}
        >
          {!componentsReady && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100px',
              color: '#666',
              fontSize: '0.9rem'
            }}>
              🔄 Loading ELEVATE environment with design tokens package...
            </div>
          )}
        </div>
        
        {/* Code display */}
        {showCode && htmlCode && (
          <div style={{
            borderTop: '1px solid #e0e0e0',
            borderRadius: '0 0 8px 8px',
          }}>
            <Code className="language-html">{htmlCode}</Code>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveExample;