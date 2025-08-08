import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ElvtMenu, ElvtMenuItem, ElvtDivider, ElvtButton, ElvtIcon } from '@inform-elevate/elevate-core-ui/dist/react'
import { createPath } from '@/lib/path-utils'

export interface NavigationSection {
  title: string
  pages: NavigationPage[]
}

export interface NavigationPage {
  title: string
  path: string
}

interface SidebarNavigationProps {
  sections: NavigationSection[]
  className?: string
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  sections, 
  className = '' 
}) => {
  const location = useLocation()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

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

  return (
    <div className={`sidebar-navigation ${className}`}>
      <div className="sidebar-header">
        <Link to={createPath('/')} className="sidebar-logo">
          <h2>ELEVATE</h2>
        </Link>
      </div>
      
      <div className="sidebar-content">
        {sections.map((section, sectionIndex) => (
          <div key={section.title} className="sidebar-section">
            <ElvtButton 
              className="section-header"
              variant="tertiary"
              onClick={() => toggleSection(section.title)}
            >
              <div className="section-header-content">
                <ElvtIcon 
                  name={isSectionExpanded(section.title) ? 'chevron-down' : 'chevron-right'} 
                  className="section-chevron"
                />
                <span className="section-title">{section.title}</span>
              </div>
            </ElvtButton>
            
            {isSectionExpanded(section.title) && (
              <div className="section-content">
                <ElvtMenu shape="inline">
                  {section.pages.map((page) => (
                    <Link 
                      key={page.path} 
                      to={createPath(page.path)}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <ElvtMenuItem
                        selected={isActivePath(page.path)}
                        value={page.path}
                        className="page-item"
                      >
                        {page.title}
                      </ElvtMenuItem>
                    </Link>
                  ))}
                </ElvtMenu>
              </div>
            )}
            
            {sectionIndex < sections.length - 1 && (
              <div className="sidebar-section-divider">
                <ElvtDivider />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <style>{`
        .sidebar-navigation {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: var(--elevate-color-background-primary, #ffffff);
          border-right: 1px solid var(--elevate-color-border-light, #e9ecef);
          width: 280px;
          min-width: 280px;
        }

        .sidebar-header {
          padding: var(--elevate-spacing-lg, 1.5rem);
          border-bottom: 1px solid var(--elevate-color-border-light, #e9ecef);
        }

        .sidebar-logo {
          text-decoration: none;
          color: var(--elevate-color-primary, #0066cc);
        }

        .sidebar-logo h2 {
          margin: 0;
          font-size: var(--elevate-font-size-2xl, 1.5rem);
          font-weight: var(--elevate-font-weight-bold, 700);
          font-family: var(--elevate-font-family-primary);
        }

        .sidebar-content {
          flex: 1;
          overflow-y: auto;
          padding: var(--elevate-spacing-md, 1rem) 0;
        }

        .sidebar-section {
          margin-bottom: var(--elevate-spacing-lg, 1.5rem);
        }

        .sidebar-section-title {
          margin: 0 0 var(--elevate-spacing-sm, 0.5rem) 0;
          padding: 0 var(--elevate-spacing-lg, 1.5rem);
          font-size: var(--elevate-font-size-sm, 0.875rem);
          font-weight: var(--elevate-font-weight-semibold, 600);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--elevate-color-text-secondary, #6c757d);
          font-family: var(--elevate-font-family-primary);
        }

        .sidebar-section .section-content elvt-menu {
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--elevate-spacing-xs, 0.25rem);
        }

        .sidebar-section .section-content elvt-menu-item {
          margin: 0;
          padding: var(--elevate-spacing-sm, 0.5rem) var(--elevate-spacing-md, 1rem);
          border-radius: var(--elevate-radius-sm, 0.25rem);
          transition: all 0.2s ease;
          cursor: pointer;
          text-decoration: none;
          color: var(--elevate-color-text-primary, #1a1a1a);
          font-size: var(--elevate-font-size-sm, 0.875rem);
          font-weight: var(--elevate-font-weight-medium, 500);
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          width: 100%;
          text-align: left;
        }

        .sidebar-section .section-content elvt-menu-item:hover {
          background: var(--elevate-color-background-secondary, #f8f9fa);
          color: var(--elevate-color-primary, #0066cc);
          transform: translateX(4px);
        }

        .sidebar-section .section-content elvt-menu-item[selected="true"],
        .sidebar-section .section-content elvt-menu-item[selected] {
          background: var(--elevate-color-primary-light, #e6f3ff);
          color: var(--elevate-color-primary, #0066cc);
          font-weight: var(--elevate-font-weight-semibold, 600);
          border-left: 3px solid var(--elevate-color-primary, #0066cc);
        }

        .page-item a {
          text-decoration: none;
          color: inherit;
          display: block;
          width: 100%;
        }

        .sidebar-section-divider {
          margin: var(--elevate-spacing-md, 1rem) var(--elevate-spacing-lg, 1.5rem);
        }

        /* Section header styling */
        .section-header {
          width: 100%;
          padding: var(--elevate-spacing-md, 1rem) var(--elevate-spacing-lg, 1.5rem);
          border: none;
          background: transparent;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.2s ease;
          border-radius: 0;
        }

        .section-header:hover {
          background: var(--elevate-color-background-secondary, #f8f9fa);
        }

        .section-header-content {
          display: flex;
          align-items: center;
          gap: var(--elevate-spacing-sm, 0.5rem);
          width: 100%;
        }

        .section-chevron {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .section-title {
          font-size: var(--elevate-font-size-sm, 0.875rem);
          font-weight: var(--elevate-font-weight-semibold, 600);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--elevate-color-text-secondary, #6c757d);
          font-family: var(--elevate-font-family-primary);
        }

        .section-content {
          padding: var(--elevate-spacing-sm, 0.5rem) var(--elevate-spacing-md, 1rem);
          padding-left: var(--elevate-spacing-xl, 2rem);
          background: var(--elevate-color-background-subtle, #fbfcfd);
          border-left: 2px solid var(--elevate-color-border-light, #e9ecef);
          margin-left: var(--elevate-spacing-lg, 1.5rem);
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .sidebar-navigation {
            width: 100%;
            min-width: unset;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .sidebar-navigation.sidebar-open {
            transform: translateX(0);
          }
        }

        /* Scrollbar styling */
        .sidebar-content::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar-content::-webkit-scrollbar-track {
          background: var(--elevate-color-background-secondary, #f8f9fa);
        }

        .sidebar-content::-webkit-scrollbar-thumb {
          background: var(--elevate-color-border-medium, #cbd5e0);
          border-radius: 2px;
        }

        .sidebar-content::-webkit-scrollbar-thumb:hover {
          background: var(--elevate-color-border-dark, #a0aec0);
        }
      `}</style>
    </div>
  )
}

export default SidebarNavigation