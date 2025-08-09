import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ElvtIcon } from '@inform-elevate/elevate-core-ui/dist/react'
import { createPath } from '@/lib/path-utils'

export interface NavigationSection {
  title: string
  pages: NavigationPage[]
}

export interface NavigationPage {
  title: string
  path: string
}

interface TreeSidebarProps {
  sections: NavigationSection[]
  className?: string
}

const TreeSidebar: React.FC<TreeSidebarProps> = ({ 
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
    <nav className={`tree-sidebar ${className}`} role="navigation" aria-label="Documentation navigation">
      {/* Compact header */}
      <div className="tree-header">
        <Link to={createPath('/')} className="tree-logo">
          <span className="logo-text">ELEVATE</span>
          <span className="logo-subtitle">Design System</span>
        </Link>
      </div>
      
      {/* Tree navigation */}
      <div className="tree-content" role="tree">
        {sections.map((section) => (
          <div key={section.title} className="tree-section" role="treeitem">
            {/* Section header */}
            <div 
              className="tree-section-header"
              onClick={() => toggleSection(section.title)}
              role="button"
              tabIndex={0}
              aria-expanded={isSectionExpanded(section.title)}
              aria-controls={`section-${section.title.replace(/\s+/g, '-').toLowerCase()}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleSection(section.title)
                }
              }}
            >
              <ElvtIcon 
                icon={isSectionExpanded(section.title) ? 
                  "M7 14L12 9L17 14H7Z" : // chevron-up (expanded)
                  "M8.59 16.58L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.58Z" // chevron-right (collapsed)
                }
                className="tree-chevron"
              />
              <span className="tree-section-title">{section.title}</span>
            </div>
            
            {/* Section pages */}
            {isSectionExpanded(section.title) && (
              <div 
                className="tree-section-content"
                id={`section-${section.title.replace(/\s+/g, '-').toLowerCase()}`}
                role="group"
              >
                {section.pages.map((page) => (
                  <Link 
                    key={page.path}
                    to={createPath(page.path)}
                    className={`tree-node ${isActivePath(page.path) ? 'tree-node-active' : ''}`}
                    role="treeitem"
                    aria-current={isActivePath(page.path) ? 'page' : undefined}
                  >
                    <span className="tree-node-title">{page.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <style>{`
        /* Clean tree-like sidebar */
        .tree-sidebar {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: var(--esds-sidebar-background);
          border-right: 1px solid var(--esds-sidebar-border-color);
          width: 280px;
          min-width: 280px;
          font-family: var(--elvt-primitives-font-family-inter, 'Inter', sans-serif);
        }

        /* Compact header */
        .tree-header {
          padding: var(--elvt-primitives-spacing-md, 16px) var(--elvt-primitives-spacing-lg, 20px);
          border-bottom: 1px solid var(--elvt-primitives-color-gray-100, #f1f3f4);
          background: var(--esds-alias-background-surface, var(--elvt-primitives-color-gray-50, #fafbfc));
        }

        .tree-logo {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .logo-text {
          font-size: var(--elvt-primitives-font-size-lg, 18px);
          font-weight: var(--elvt-primitives-font-weight-bold, 700);
          color: var(--elvt-primitives-color-blue-600, #0b5cdf);
          line-height: 1.2;
        }

        .logo-subtitle {
          font-size: var(--elvt-primitives-font-size-xs, 12px);
          font-weight: var(--elvt-primitives-font-weight-medium, 500);
          color: var(--elvt-primitives-color-gray-600, #707a8f);
          line-height: 1.3;
        }

        /* Tree content */
        .tree-content {
          flex: 1;
          overflow-y: auto;
          padding: var(--elvt-primitives-spacing-sm, 12px) 0;
        }

        /* Tree sections */
        .tree-section {
          margin-bottom: var(--elvt-primitives-spacing-xs, 8px);
        }

        .tree-section-header {
          display: flex;
          align-items: center;
          padding: var(--elvt-primitives-spacing-sm, 12px) var(--elvt-primitives-spacing-lg, 20px);
          cursor: pointer;
          transition: all 0.15s ease;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          gap: var(--elvt-primitives-spacing-sm, 12px);
        }

        .tree-section-header:hover {
          background: var(--esds-alias-background-surface, var(--elvt-primitives-color-gray-50, #fafbfc));
        }

        .tree-section-header:focus {
          outline: 2px solid var(--elvt-primitives-color-blue-500, #0072ff);
          outline-offset: -2px;
        }

        .tree-chevron {
          width: 16px;
          height: 16px;
          color: var(--elvt-primitives-color-gray-500, #8b949e);
          transition: transform 0.15s ease, color 0.15s ease;
          flex-shrink: 0;
        }

        .tree-section-header:hover .tree-chevron {
          color: var(--elvt-primitives-color-gray-700, #545972);
        }

        .tree-section-title {
          font-size: var(--elvt-primitives-font-size-sm, 14px);
          font-weight: var(--elvt-primitives-font-weight-semibold, 600);
          color: var(--elvt-primitives-color-gray-900, #33394d);
          letter-spacing: -0.01em;
        }

        /* Tree section content */
        .tree-section-content {
          padding-left: var(--elvt-primitives-spacing-xl, 32px);
          border-left: 1px solid var(--elvt-primitives-color-gray-100, #f1f3f4);
          margin-left: var(--elvt-primitives-spacing-lg, 20px);
        }

        /* Tree nodes */
        .tree-node {
          display: flex;
          align-items: center;
          padding: var(--elvt-primitives-spacing-xs, 8px) var(--elvt-primitives-spacing-md, 16px);
          text-decoration: none;
          color: var(--elvt-primitives-color-gray-700, #545972);
          transition: all 0.15s ease;
          border-radius: var(--elvt-primitives-border-radius-sm, 6px);
          margin: var(--elvt-primitives-spacing-xs, 4px) var(--elvt-primitives-spacing-md, 16px);
          position: relative;
        }

        .tree-node::before {
          content: '';
          position: absolute;
          left: -21px;
          top: 50%;
          width: 12px;
          height: 1px;
          background: var(--elvt-primitives-color-gray-200, #e1e4e8);
        }

        .tree-node:hover {
          background: var(--elvt-primitives-color-blue-50, #eaf4ff);
          color: var(--elvt-primitives-color-blue-700, #1b50a6);
        }

        .tree-node:focus {
          outline: 2px solid var(--elvt-primitives-color-blue-500, #0072ff);
          outline-offset: -2px;
        }

        .tree-node-title {
          font-size: var(--elvt-primitives-font-size-sm, 14px);
          font-weight: var(--elvt-primitives-font-weight-regular, 400);
          line-height: 1.4;
        }

        /* Active tree node */
        .tree-node-active {
          background: var(--elvt-primitives-color-blue-100, #b9dbff);
          color: var(--elvt-primitives-color-blue-900, #233347);
          font-weight: var(--elvt-primitives-font-weight-medium, 500);
        }

        .tree-node-active::before {
          background: var(--elvt-primitives-color-blue-500, #0072ff);
          height: 2px;
        }

        .tree-node-active:hover {
          background: var(--elvt-primitives-color-blue-100, #b9dbff);
          color: var(--elvt-primitives-color-blue-900, #233347);
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .tree-sidebar {
            width: 100%;
            min-width: unset;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            box-shadow: var(--elvt-primitives-shadow-lg, 0 10px 25px rgba(0,0,0,0.1));
          }

          .tree-sidebar.sidebar-open {
            transform: translateX(0);
          }

          .tree-section-content {
            padding-left: var(--elvt-primitives-spacing-lg, 20px);
          }

          .tree-node {
            margin-left: var(--elvt-primitives-spacing-xs, 8px);
            margin-right: var(--elvt-primitives-spacing-xs, 8px);
          }
        }

        /* Custom scrollbar */
        .tree-content::-webkit-scrollbar {
          width: 3px;
        }

        .tree-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .tree-content::-webkit-scrollbar-thumb {
          background: var(--elvt-primitives-color-gray-300, #a3aab4);
          border-radius: 2px;
        }

        .tree-content::-webkit-scrollbar-thumb:hover {
          background: var(--elvt-primitives-color-gray-400, #8b949e);
        }

        /* Focus management for accessibility */
        .tree-sidebar:focus-within {
          outline: none;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .tree-chevron,
          .tree-node,
          .tree-section-header {
            transition: none;
          }

          .tree-sidebar {
            transition: none;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .tree-sidebar {
            border-right: 2px solid;
          }
          
          .tree-section-header:focus,
          .tree-node:focus {
            outline: 3px solid;
            outline-offset: 2px;
          }
        }
      `}</style>
    </nav>
  )
}

export default TreeSidebar