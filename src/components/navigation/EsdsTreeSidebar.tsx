import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { createPath } from '@/lib/path-utils'
import { EsdsIcon, COMMON_ICONS } from '@/components/icons'

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

  // Icon components using EsdsIcon with MDI support
  const FolderIcon = ({ isOpen }: { isOpen: boolean }) => (
    <EsdsIcon 
      icon={isOpen ? COMMON_ICONS.content.folderOpen : COMMON_ICONS.content.folder}
      size={16}
      style={{ opacity: isOpen ? 1 : 0.7 }}
      decorative
    />
  )

  const DocumentIcon = () => (
    <EsdsIcon 
      icon={COMMON_ICONS.content.document}
      size={16}
      style={{ opacity: 0.7 }}
      decorative
    />
  )

  const PlusIcon = () => (
    <EsdsIcon 
      icon={COMMON_ICONS.actions.add}
      size={12}
      decorative
    />
  )

  const MinusIcon = () => (
    <EsdsIcon 
      icon={COMMON_ICONS.actions.remove}
      size={12}
      decorative
    />
  )

  return (
    <nav 
      className={`esds-modern-tree-sidebar ${className}`} 
      role="navigation" 
      aria-label="Documentation navigation"
    >
      {/* Hidden title for screen readers */}
      <h2 className="sr-only" aria-hidden="true">ELEVATE DS</h2>
      
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
        /* Screen reader only class */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Modern Tree Sidebar - Dribbble Design Recreation */
        .esds-modern-tree-sidebar {
          background: var(--esds-alias-color-surface-primary, #ffffff);
          border-right: 1px solid var(--esds-alias-color-border-default, #e9ecef);
          width: 280px;
          min-width: 280px;
          height: 100%;
          display: flex;
          flex-direction: column;
          font-family: var(--esds-alias-typography-body-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
          padding: 0.375rem;
        }

        /* Tree Content */
        .tree-content {
          flex: 1;
          overflow-y: auto;
        }

        .tree-section {
          margin-bottom: 0.125rem;
        }

        /* Tree Items - Base Style */
        .tree-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.5rem;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          color: var(--esds-alias-color-text-primary, #1f2937);
          font-size: 0.8125rem;
          line-height: 1.4;
          position: relative;
          margin-bottom: 1px;
        }

        .tree-item:hover {
          background: var(--esds-alias-color-surface-hover, #f3f4f6);
        }

        .tree-item:focus {
          outline: none;
        }

        .tree-item:focus-visible {
          outline: 2px solid var(--esds-alias-color-interactive-primary, #3b82f6);
          outline-offset: 2px;
        }

        /* Section Root Items */
        .section-root {
          font-weight: 500;
        }

        /* Page Items - Indented */
        .page-item {
          margin-left: 1.25rem;
          font-weight: 400;
        }

        /* Selected State (Blue Highlight) */
        .tree-item.selected {
          background: var(--esds-alias-color-surface-selected, #dbeafe);
          color: var(--esds-alias-color-text-accent, #1d4ed8);
          font-weight: 500;
        }

        .tree-item.selected:hover {
          background: var(--esds-alias-color-surface-selected, #dbeafe);
        }

        /* Icons */
        .expand-icon {
          width: 12px;
          height: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--esds-alias-color-text-secondary, #6b7280);
          flex-shrink: 0;
        }

        .item-icon {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--esds-alias-color-text-secondary, #6b7280);
          flex-shrink: 0;
        }

        .item-text {
          flex: 1;
          font-weight: inherit;
        }

        /* Tree Children */
        .tree-children {
          margin-top: 1px;
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
          
          .tree-item:focus-visible {
            outline: 3px solid;
            outline-offset: 2px;
          }
        }
      `}</style>
    </nav>
  )
}

export default EsdsTreeSidebar