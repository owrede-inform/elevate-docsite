import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [selectedItem, setSelectedItem] = useState<string>('')

  // Map section titles to their index routes
  const getSectionIndexRoute = (sectionTitle: string): string | null => {
    const titleLower = sectionTitle.toLowerCase()
    switch (titleLower) {
      case 'getting started':
        return '/guides'
      case 'foundations':
        return '/foundations'
      case 'components':
        return '/components'
      case 'patterns':
        return '/patterns'
      case 'resources':
        return '/resources'
      default:
        return null
    }
  }

  const isActivePath = (path: string): boolean => {
    return location.pathname === createPath(path) || 
           location.pathname.startsWith(createPath(path) + '/')
  }

  const findActiveSectionTitle = (): string | null => {
    // First, check if current path matches any page within sections
    for (const section of sections) {
      for (const page of section.pages) {
        if (isActivePath(page.path)) {
          return section.title
        }
      }
    }
    
    // Then check if current path matches any section index route
    for (const section of sections) {
      const sectionIndexRoute = getSectionIndexRoute(section.title)
      if (sectionIndexRoute && isActivePath(sectionIndexRoute)) {
        return section.title
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

  const handleSectionClick = (sectionTitle: string, event: React.MouseEvent | React.KeyboardEvent) => {
    // Get the index route for this section
    const indexRoute = getSectionIndexRoute(sectionTitle)
    
    // If we have an index route, navigate to it
    if (indexRoute) {
      navigate(indexRoute)
    }
    
    // Always toggle the expansion state regardless of navigation
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

  const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
    <EsdsIcon 
      icon={isExpanded ? COMMON_ICONS.navigation.down : COMMON_ICONS.navigation.right}
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
              className={`tree-item section-root ${isSectionExpanded(section.title) ? 'expanded' : ''} ${getSectionIndexRoute(section.title) ? 'has-index-page' : ''}`}
              onClick={(e) => handleSectionClick(section.title, e)}
              role="button"
              tabIndex={0}
              aria-expanded={isSectionExpanded(section.title)}
              aria-description={getSectionIndexRoute(section.title) ? `Navigate to ${section.title} overview page` : `Expand ${section.title} section`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleSectionClick(section.title, e)
                }
              }}
            >
              <span className="expand-icon">
                <ChevronIcon isExpanded={isSectionExpanded(section.title)} />
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
          background: var(--esds-alias-sidebar-background);
          border-right: 1px solid var(--esds-alias-sidebar-border);
          width: 280px;
          min-width: 280px;
          height: 100%;
          display: flex;
          flex-direction: column;
          font-family: var(--esds-alias-font-family-primary);
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
          color: var(--esds-alias-sidebar-text);
          font-size: 0.8125rem;
          line-height: 1.4;
          position: relative;
          margin-bottom: 1px;
        }

        .tree-item:hover {
          background: var(--esds-alias-background-surface);
        }

        .tree-item:focus {
          outline: none;
        }

        .tree-item:focus-visible {
          outline: 2px solid var(--esds-alias-color-brand-primary);
          outline-offset: 2px;
        }

        /* Section Root Items */
        .section-root {
          font-weight: 500;
        }

        /* Section items with index pages get special styling */
        .section-root.has-index-page {
          cursor: pointer;
        }

        .section-root.has-index-page:hover {
          background: var(--esds-alias-background-surface);
        }

        .section-root.has-index-page .item-text {
          color: var(--esds-alias-sidebar-text);
          transition: color 0.2s ease;
        }

        .section-root.has-index-page:hover .item-text {
          color: var(--esds-alias-color-brand-primary);
        }

        /* Page Items - Indented */
        .page-item {
          margin-left: 1.25rem;
          font-weight: 400;
        }

        /* Selected State (Blue Highlight) */
        .tree-item.selected {
          background: var(--esds-alias-background-surface);
          color: var(--esds-alias-color-brand-primary);
          font-weight: 500;
        }

        .tree-item.selected:hover {
          background: var(--esds-alias-background-surface);
        }

        /* Icons */
        .expand-icon {
          width: 12px;
          height: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--esds-alias-text-muted);
          flex-shrink: 0;
        }

        .item-icon {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--esds-alias-text-muted);
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

        /* Custom Scrollbar */
        .tree-content::-webkit-scrollbar {
          width: 3px;
        }

        .tree-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .tree-content::-webkit-scrollbar-thumb {
          background: var(--esds-alias-sidebar-border);
          border-radius: 2px;
        }

        .tree-content::-webkit-scrollbar-thumb:hover {
          background: var(--esds-alias-text-muted);
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
            transition: transform var(--esds-alias-transition-sidebar);
            box-shadow: var(--esds-alias-shadow-sidebar);
          }

          .esds-modern-tree-sidebar.sidebar-open {
            transform: translateX(0);
          }

          .page-item {
            margin-left: var(--esds-alias-spacing-component);
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