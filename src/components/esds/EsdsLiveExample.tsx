import React, { useState, useRef, useEffect } from 'react'
import EsdsCodeBlock from './EsdsCodeBlock'

interface EsdsLiveExampleProps {
  children: React.ReactNode
  variant?: string
  isolated?: boolean // Default: true - uses only ELEVATE tokens
  showCode?: boolean // Default: true - shows code panel
  title?: string
  description?: string
  className?: string
}

/**
 * ESDS Live Example Component
 * 
 * Creates an isolated environment for ELEVATE components that uses only
 * ELEVATE tokens, unaffected by ESDS documentation styling overrides.
 * 
 * Key Features:
 * - Token isolation using CSS containment
 * - Automatic code extraction from children
 * - Theme-aware rendering
 * - Responsive design
 * - Copy code functionality
 */
const EsdsLiveExample: React.FC<EsdsLiveExampleProps> = ({ 
  children, 
  variant = 'default',
  isolated = true,
  showCode = true,
  title,
  description,
  className = ''
}) => {
  const [showCodePanel, setShowCodePanel] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const exampleRef = useRef<HTMLDivElement>(null)

  // Extract code from children for display
  const extractCode = (): string => {
    if (React.isValidElement(children)) {
      // Simple code extraction - in a real implementation, you'd want more robust parsing
      const elementType = typeof children.type === 'string' ? children.type : children.type?.name || 'div'
      const props = children.props || {}
      
      // Build attributes string
      const attributes = Object.entries(props)
        .filter(([key, value]) => key !== 'children' && value !== undefined)
        .map(([key, value]) => {
          if (typeof value === 'boolean' && value) {
            return key
          }
          if (typeof value === 'string') {
            return `${key}="${value}"`
          }
          return `${key}={${JSON.stringify(value)}}`
        })
        .join(' ')

      const attributeString = attributes ? ` ${attributes}` : ''
      
      if (props.children) {
        if (typeof props.children === 'string') {
          return `<${elementType}${attributeString}>${props.children}</${elementType}>`
        }
        return `<${elementType}${attributeString}>\n  {/* Content */}\n</${elementType}>`
      }
      
      return `<${elementType}${attributeString} />`
    }
    
    return '<!-- Complex content -->'
  }

  const handleCopyCode = async () => {
    const code = extractCode()
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  // Check if we're in dark mode
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('esds-theme-dark') ||
                     document.querySelector('elvt-application')?.classList.contains('elvt-theme-dark')
      setIsDarkMode(isDark)
    }

    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    const appElement = document.querySelector('elvt-application')
    if (appElement) {
      observer.observe(appElement, { attributes: true, attributeFilter: ['class'] })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div 
      className={`esds-live-example ${className} ${variant ? `variant-${variant}` : ''}`}
      ref={exampleRef}
    >
      {/* Header */}
      {(title || description) && (
        <div className="example-header">
          {title && <h4 className="example-title">{title}</h4>}
          {description && <p className="example-description">{description}</p>}
        </div>
      )}

      {/* Live Preview */}
      <div 
        className={`example-preview ${isolated ? 'elevate-token-isolation' : ''} ${isDarkMode ? 'esds-theme-dark' : ''}`}
      >
        {children}
      </div>

      {/* Code Panel */}
      {showCode && (
        <div className="example-controls">
          <div className="controls-toolbar">
            <button
              className="toggle-code-button"
              onClick={() => setShowCodePanel(!showCodePanel)}
              aria-expanded={showCodePanel}
              aria-controls="example-code-panel"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
              </svg>
              {showCodePanel ? 'Hide' : 'Show'} Code
            </button>
            
            {showCodePanel && (
              <button
                className="copy-code-button"
                onClick={handleCopyCode}
                aria-label="Copy code to clipboard"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  {copiedCode ? (
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  ) : (
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2H9.5a1 1 0 0 0-1 1v1H4.5a1 1 0 0 0-1-1V1.5z"/>
                  )}
                </svg>
                {copiedCode ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>

          {showCodePanel && (
            <div id="example-code-panel" className="example-code-panel">
              <EsdsCodeBlock 
                language="html"
                showLineNumbers={false}
                showCopyButton={false}
              >
                {extractCode()}
              </EsdsCodeBlock>
            </div>
          )}
        </div>
      )}

      <style>{`
        .esds-live-example {
          background: var(--esds-live-example-background);
          border: var(--esds-live-example-border-width) solid var(--esds-live-example-border-color);
          border-radius: var(--esds-live-example-border-radius);
          margin: var(--esds-live-example-margin);
          overflow: hidden;
          box-shadow: var(--esds-live-example-shadow);
        }

        .example-header {
          padding: var(--esds-alias-spacing-component);
          border-bottom: 1px solid var(--esds-live-example-border-color);
          background: var(--elvt-alias-background-secondary, var(--elvt-primitives-color-gray-50));
        }

        .example-title {
          margin: 0 0 0.25rem 0;
          font-size: var(--elvt-primitives-font-size-lg);
          font-weight: var(--elvt-primitives-font-weight-semibold);
          color: var(--esds-typography-heading-color);
        }

        .example-description {
          margin: 0;
          font-size: var(--elvt-primitives-font-size-sm);
          color: var(--elvt-alias-text-secondary);
          line-height: var(--elvt-primitives-line-height-normal);
        }

        .example-preview {
          padding: var(--esds-live-example-padding);
          background: var(--esds-live-example-background);
          
          /* Ensure proper styling for example content */
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--esds-alias-spacing-component);
        }

        /* Token Isolation - creates clean ELEVATE environment */
        .elevate-token-isolation {
          /* Reset ESDS tokens to ELEVATE equivalents */
          --esds-color-background-primary: var(--elvt-alias-background-primary, #ffffff);
          --esds-color-text-primary: var(--elvt-alias-text-primary, var(--elvt-primitives-color-gray-900));
          --esds-color-text-secondary: var(--elvt-alias-text-secondary, var(--elvt-primitives-color-gray-600));
          --esds-color-border-light: var(--elvt-alias-border-light, var(--elvt-primitives-color-gray-200));
          --esds-spacing-component: var(--elvt-alias-spacing-component, var(--elvt-primitives-spacing-md));
          --esds-font-family-primary: var(--elvt-alias-font-family-primary);
          
          /* CSS Containment for style isolation */
          contain: style;
          
          /* Clean background and typography */
          background: var(--elvt-alias-background-primary, #ffffff);
          color: var(--elvt-alias-text-primary, var(--elvt-primitives-color-gray-900));
          font-family: var(--elvt-alias-font-family-primary);
        }

        /* Dark mode isolation */
        .elevate-token-isolation.esds-theme-dark {
          --esds-color-background-primary: var(--elvt-alias-background-primary-dark, var(--elvt-primitives-color-gray-900));
          --esds-color-text-primary: var(--elvt-alias-text-primary-dark, var(--elvt-primitives-color-gray-100));
          --esds-color-text-secondary: var(--elvt-alias-text-secondary-dark, var(--elvt-primitives-color-gray-300));
          --esds-color-border-light: var(--elvt-alias-border-light-dark, var(--elvt-primitives-color-gray-700));
          
          background: var(--elvt-alias-background-primary-dark, var(--elvt-primitives-color-gray-900));
          color: var(--elvt-alias-text-primary-dark, var(--elvt-primitives-color-gray-100));
        }

        .example-controls {
          border-top: 1px solid var(--esds-live-example-border-color);
        }

        .controls-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--elvt-primitives-spacing-sm) var(--esds-alias-spacing-component);
          background: var(--elvt-alias-background-secondary, var(--elvt-primitives-color-gray-50));
        }

        .toggle-code-button,
        .copy-code-button {
          display: flex;
          align-items: center;
          gap: var(--elvt-primitives-spacing-xs);
          padding: var(--elvt-primitives-spacing-xs) var(--elvt-primitives-spacing-sm);
          background: transparent;
          border: 1px solid var(--elvt-alias-border-medium, var(--elvt-primitives-color-gray-300));
          border-radius: var(--elvt-primitives-radius-sm);
          color: var(--elvt-alias-text-primary);
          font-size: var(--elvt-primitives-font-size-sm);
          font-family: var(--esds-alias-font-family-primary);
          cursor: pointer;
          transition: all var(--esds-alias-transition-normal);
        }

        .toggle-code-button:hover,
        .copy-code-button:hover {
          background: var(--elvt-alias-surface-hover, var(--elvt-primitives-color-gray-100));
          border-color: var(--elvt-alias-border-strong, var(--elvt-primitives-color-gray-400));
        }

        .toggle-code-button:focus-visible,
        .copy-code-button:focus-visible {
          outline: var(--esds-focus-width) var(--esds-focus-style) var(--esds-focus-color);
          outline-offset: var(--esds-focus-offset);
        }

        .copy-code-button {
          font-size: var(--elvt-primitives-font-size-xs);
        }

        .example-code-panel {
          background: var(--esds-code-block-background);
        }

        .example-code-panel .esds-code-block {
          margin: 0;
          border: none;
          border-radius: 0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .example-preview {
            padding: var(--elvt-primitives-spacing-md);
          }
          
          .controls-toolbar {
            flex-direction: column;
            gap: var(--elvt-primitives-spacing-sm);
            align-items: stretch;
          }
          
          .toggle-code-button,
          .copy-code-button {
            justify-content: center;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .esds-live-example {
            border: 2px solid;
          }
          
          .toggle-code-button:focus-visible,
          .copy-code-button:focus-visible {
            outline: 3px solid;
            outline-offset: 2px;
          }
        }
      `}</style>
    </div>
  )
}

export default EsdsLiveExample