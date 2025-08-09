/**
 * Component Page Template
 * 
 * Template for component documentation pages with status badges and breadcrumbs
 */

import React from 'react'
import { MDXContent } from '../../utils/mdxLoader'
import { PageTemplateProps } from './page'
import { ComponentStatus } from '../../components/mdx/MDXComponents'
import ComponentsTable from '../../components/ComponentsTable'
import '../../styles/templates/component.css'

const ComponentTemplate: React.FC<PageTemplateProps> = ({ content, params, children }) => {
  const { frontmatter, slug } = content
  
  // Special handling for the components index page
  if (slug === 'index') {
    return (
      <div className="components-index-page">
        <div className="container">
          <header className="page-header">
            <h1>{frontmatter.title}</h1>
            {frontmatter.description && (
              <p className="page-description">{frontmatter.description}</p>
            )}
          </header>
          
          <div className="page-content">
            <ComponentsTable />
            
            {/* Render any additional MDX content */}
            <div className="additional-content">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // For individual component pages
  return (
    <div className="component-page">
      <div className="container">
        <header className="component-header">
          <div className="breadcrumb">
            <a href="/components">Components</a>
            <span className="breadcrumb-separator"> / </span>
            <span>{frontmatter.title}</span>
          </div>
          
          <div className="component-meta">
            <ComponentStatus status={frontmatter.status || 'stable'} />
            {frontmatter.version && (
              <span className="component-version">v{frontmatter.version}</span>
            )}
            {frontmatter.technicalName && (
              <code className="component-tag">{frontmatter.technicalName}</code>
            )}
          </div>
          
          <h1>{frontmatter.title}</h1>
          {frontmatter.description && (
            <p className="component-description">{frontmatter.description}</p>
          )}
          
          {frontmatter.category && (
            <div className="component-category">
              <span className="category-label">Category:</span> {frontmatter.category}
            </div>
          )}
        </header>
        
        <div className="component-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ComponentTemplate