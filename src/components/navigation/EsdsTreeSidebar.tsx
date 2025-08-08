import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { createPath } from '@/lib/path-utils'

export interface NavigationSection {
  title: string
  pages: NavigationPage[]
}

export interface NavigationPage {
  title: string
  path: string
}

interface EsdsTreeSidebarProps {
  sections: NavigationSection[]
  className?: string
}

/**
 * ESDS Tree Sidebar Component - Modern Tree Design
 * Recreated based on Dribbble reference design with clean, modern aesthetics
 * Uses ESDS design tokens that map to ELEVATE Alias and Primitive tokens
 */
const EsdsTreeSidebar: React.FC<EsdsTreeSidebarProps> = ({ 
  sections, 
  className = '' 
}) => {
  const location = useLocation()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [selectedItem, setSelectedItem] = useState<string>('')

  const isActivePath = (path: string): boolean => {
    return location.pathname === createPath(path) || 
           location.pathname.startsWith(createPath(path) + '/')
  }

  const findActiveSectionTitle = (): string | null => {
    for (const section of sections) {
      for (const page of section.pages) {
        if (isActivePath(page.path)) {
          return section.title
        }
      }
    }
    return null
  }

  // Auto-expand the section containing the current page
  useEffect(() => {
    const activeSection = findActiveSectionTitle()
    if (activeSection) {
      setExpandedSections(new Set([activeSection]))
    } else {
      // Default to first section if no active section found
      setExpandedSections(new Set([sections[0]?.title]))
    }
  }, [location.pathname, sections])

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => {
      const newSet = new Set()
      if (!prev.has(sectionTitle)) {
        newSet.add(sectionTitle)
      }
      return newSet
    })
  }

  const isSectionExpanded = (sectionTitle: string): boolean => {
    return expandedSections.has(sectionTitle)
  }

  // Icon components based on the Dribbble reference design
  const FolderIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M2 4a1 1 0 011-1h3.586a1 1 0 01.707.293L8.414 4.414A1 1 0 009.121 4.707L9.586 5H13a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" 
        fill="currentColor" 
        opacity={isOpen ? "1" : "0.7"}
      />
    </svg>
  )

  const DocumentIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M4 2a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V5.414a1 1 0 00-.293-.707l-2.414-2.414A1 1 0 009.586 2H4z" 
        fill="currentColor" 
        opacity="0.7"
      />
      <path d="M5 6h6M5 8h6M5 10h4" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
    </svg>
  )

  const PlusIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M6 2v8M2 6h8"
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )

  const MinusIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M2 6h8"
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <nav 
      className={`esds-modern-tree-sidebar ${className}`} 
      role="navigation" 
      aria-label="Documentation navigation"
    >
      {/* Modern Tree Header */}
      <div className="tree-header">
        <h2 className="tree-title">Project & team structure</h2>
      </div>
      
      {/* Tree Content */}
      <div className="tree-content">
        {sections.map((section) => (
          <div key={section.title} className="tree-section">
            {/* Section Root Item */}
            <div 
              className={`tree-item section-root ${isSectionExpanded(section.title) ? 'expanded' : ''}`}
              onClick={() => toggleSection(section.title)}
              role="button"
              tabIndex={0}
              aria-expanded={isSectionExpanded(section.title)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleSection(section.title)
                }
              }}
            >
              <span className="expand-icon">
                {isSectionExpanded(section.title) ? <MinusIcon /> : <PlusIcon />}
              </span>
              <span className="item-icon">
                <FolderIcon isOpen={isSectionExpanded(section.title)} />
              </span>
              <span className="item-text">{section.title}</span>
            </div>
            
            {/* Section Pages */}
            {isSectionExpanded(section.title) && (
              <div className="tree-children">
                {section.pages.map((page) => (
                  <Link 
                    key={page.path}
                    to={createPath(page.path)}
                    className={`tree-item page-item ${isActivePath(page.path) ? 'selected' : ''}`}
                    aria-current={isActivePath(page.path) ? 'page' : undefined}
                  >
                    <span className="item-icon">
                      <DocumentIcon />
                    </span>
                    <span className="item-text">{page.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <style>{`
        /* Modern Tree Sidebar - Dribbble Design Recreation */
        .esds-modern-tree-sidebar {
          background: var(--esds-color-background-primary);
          border-right: 1px solid var(--esds-color-border-light);
          width: var(--esds-navigation-width);
          min-width: var(--esds-navigation-width);
          height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: var(--esds-font-family-primary);
          padding: var(--esds-spacing-xl) var(--esds-spacing-lg);
        }

        /* Tree Header */
        .tree-header {
          margin-bottom: var(--esds-spacing-xl);
        }

        .tree-title {
          margin: 0;
          font-size: var(--esds-font-size-lg);
          font-weight: var(--esds-font-weight-semibold);
          color: var(--esds-color-text-primary);
          line-height: var(--esds-line-height-tight);
        }

        /* Tree Content */
        .tree-content {
          flex: 1;
          overflow-y: auto;
        }

        .tree-section {
          margin-bottom: var(--esds-spacing-sm);
        }

        /* Tree Items - Base Style */
        .tree-item {
          display: flex;
          align-items: center;
          gap: var(--esds-spacing-sm);
          padding: var(--esds-spacing-sm);
          border-radius: var(--esds-radius-sm);
          cursor: pointer;
          transition: all var(--esds-transition-normal);
          text-decoration: none;
          color: var(--esds-color-text-primary);
          font-size: var(--esds-font-size-sm);
          line-height: var(--esds-line-height-normal);
          position: relative;
          margin-bottom: 2px;
        }

        .tree-item:hover {
          background: var(--esds-color-surface-hover);
        }

        .tree-item:focus {
          outline: var(--esds-focus-width) solid var(--esds-focus-color);
          outline-offset: var(--esds-focus-offset);
        }

        /* Section Root Items */
        .section-root {
          font-weight: var(--esds-font-weight-medium);
        }

        /* Page Items - Indented */
        .page-item {
          margin-left: var(--esds-spacing-xl);
          font-weight: var(--esds-font-weight-regular);
        }

        /* Selected State (Blue Highlight) */
        .tree-item.selected {
          background: var(--esds-color-surface-selected);
          color: var(--esds-color-text-accent);
          font-weight: var(--esds-font-weight-medium);
        }

        .tree-item.selected:hover {
          background: var(--esds-color-surface-selected);
        }

        /* Icons */
        .expand-icon {
          width: 12px;
          height: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--esds-color-text-secondary);
          flex-shrink: 0;
        }

        .item-icon {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--esds-color-text-secondary);
          flex-shrink: 0;
        }

        .item-text {
          flex: 1;
          font-weight: inherit;
        }

        /* Tree Children */
        .tree-children {
          margin-top: 2px;
        }

        /* Dark Theme Support */
        :global(.esds-theme-dark) .esds-modern-tree-sidebar {
          background: var(--esds-color-background-primary);
          border-right-color: var(--esds-color-border-light);
        }

        :global(.esds-theme-dark) .tree-item.selected {
          background: var(--esds-color-surface-selected);
          color: var(--esds-color-text-accent);
        }

        /* Custom Scrollbar */
        .tree-content::-webkit-scrollbar {
          width: 3px;
        }

        .tree-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .tree-content::-webkit-scrollbar-thumb {
          background: var(--esds-color-border-medium);
          border-radius: 2px;
        }

        .tree-content::-webkit-scrollbar-thumb:hover {
          background: var(--esds-color-text-tertiary);
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .esds-modern-tree-sidebar {
            width: 100%;
            min-width: unset;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
            transform: translateX(-100%);
            transition: transform var(--esds-transition-slow);
            box-shadow: var(--esds-shadow-lg);
          }

          .esds-modern-tree-sidebar.sidebar-open {
            transform: translateX(0);
          }

          .page-item {
            margin-left: var(--esds-spacing-lg);
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .tree-item,
          .esds-modern-tree-sidebar {
            transition: none !important;
          }
        }

        @media (prefers-contrast: high) {
          .esds-modern-tree-sidebar {
            border-right: 2px solid;
          }
          
          .tree-item:focus {
            outline: 3px solid;
            outline-offset: 2px;
          }
        }
      `}</style>
    </nav>
  )
}

export default EsdsTreeSidebar