import React, { useState, useRef, useEffect } from 'react'
import { MDI_ICON_REGISTRY } from '@/utils/icons'

interface SwitcherItem {
  label: string
  href: string
  current?: boolean
}

interface EsdsProductSwitcherProps {
  className?: string
}

/**
 * ESDS Product Switcher Component
 * A dropdown menu for switching between INFORM's different products and resources
 */
const EsdsProductSwitcher: React.FC<EsdsProductSwitcherProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Switcher configuration (from switcher.yaml)
  const switcherItems: SwitcherItem[] = [
    { label: 'ELEVATE Design System', href: '/', current: true },
    { label: 'ELEVATE Core UI', href: 'https://github.com/inform-elevate/elevate-core-ui' },
    { label: 'Design Tokens', href: 'https://github.com/inform-elevate/elevate-design-tokens' },
    { label: 'Storybook', href: 'https://elevate-core-ui.inform-cloud.io/' },
    { label: 'INFORM Software', href: 'https://www.inform-software.com/' }
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = href
    }
    setIsOpen(false)
  }

  return (
    <div className={`esds-product-switcher ${className}`}>
      <elvt-icon-button
        ref={buttonRef}
        size="medium"
        label="Switch between INFORM products"
        icon={MDI_ICON_REGISTRY.grid}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="switcher-dropdown"
      />
      
      {isOpen && (
        <div 
          ref={dropdownRef}
          id="switcher-dropdown"
          className="switcher-dropdown"
          role="menu"
          aria-label="Product switcher menu"
        >
          <div className="switcher-header">
            <h3>INFORM Design</h3>
          </div>
          <div className="switcher-items">
            {switcherItems.map((item, index) => (
              <button
                key={index}
                className={`switcher-item ${item.current ? 'current' : ''}`}
                onClick={() => handleItemClick(item.href)}
                role="menuitem"
                tabIndex={0}
              >
                <span className="item-label">{item.label}</span>
                {item.current && (
                  <span className="current-indicator" aria-label="Current">
                    ✓
                  </span>
                )}
                {item.href.startsWith('http') && (
                  <span className="external-indicator" aria-label="Opens in new window">
                    ↗
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .esds-product-switcher {
          position: relative;
          display: inline-flex;
        }

        .switcher-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--esds-alias-background-elevated);
          border: 1px solid var(--esds-alias-sidebar-border);
          border-radius: var(--esds-alias-radius-container);
          box-shadow: var(--esds-alias-shadow-example);
          min-width: 280px;
          max-width: 320px;
          z-index: 1000;
          overflow: hidden;
        }

        .switcher-header {
          padding: var(--esds-alias-spacing-component);
          background: var(--esds-alias-background-surface);
          border-bottom: 1px solid var(--esds-alias-sidebar-border);
        }

        .switcher-header h3 {
          margin: 0;
          font-family: var(--esds-alias-font-family-primary);
          font-size: var(--elvt-primitives-font-size-sm, 0.875rem);
          font-weight: var(--elvt-primitives-font-weight-600, 600);
          color: var(--esds-alias-text-heading);
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .switcher-items {
          padding: 0.5rem 0;
        }

        .switcher-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.75rem var(--esds-alias-spacing-component);
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: var(--esds-alias-font-family-primary);
          font-size: var(--elvt-primitives-font-size-sm, 0.875rem);
          color: var(--esds-alias-text-body);
          text-align: left;
          transition: all 0.2s ease;
          position: relative;
        }

        .switcher-item:hover {
          background: var(--esds-alias-background-surface);
          color: var(--esds-alias-text-heading);
        }

        .switcher-item:focus {
          outline: none;
          background: var(--esds-alias-background-surface);
          color: var(--esds-alias-text-heading);
        }

        .switcher-item:focus-visible {
          outline: 2px solid var(--esds-alias-color-brand-primary);
          outline-offset: -2px;
        }

        .switcher-item.current {
          background: var(--esds-alias-background-surface);
          color: var(--esds-alias-color-brand-primary);
          font-weight: var(--elvt-primitives-font-weight-500, 500);
        }

        .item-label {
          flex: 1;
        }

        .current-indicator,
        .external-indicator {
          margin-left: 0.5rem;
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .current-indicator {
          color: var(--esds-alias-color-brand-primary);
          font-weight: bold;
        }

        .external-indicator {
          color: var(--esds-alias-text-muted);
        }

        /* Animation */
        .switcher-dropdown {
          animation: slideDown 0.2s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .switcher-dropdown {
            left: 0;
            right: 0;
            transform: none;
            min-width: auto;
            max-width: none;
            margin: 0 1rem;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .switcher-dropdown {
            border: 2px solid;
          }
          
          .switcher-item:focus-visible {
            outline: 3px solid;
            outline-offset: -3px;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .switcher-dropdown {
            animation: none;
          }
          
          .switcher-item {
            transition: none;
          }
        }
      `}</style>
    </div>
  )
}

export default EsdsProductSwitcher