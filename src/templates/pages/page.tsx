/**
 * Default Page Template
 * 
 * This is the fallback template used when no specific layout is specified
 * or when the specified layout template cannot be found.
 */

import React from 'react'
import { MDXContent } from '../../utils/mdxLoader'
import '../../styles/templates/page.css'

export interface PageTemplateProps {
  content: MDXContent
  params: any
  children: React.ReactNode // Rendered MDX content
}

const PageTemplate: React.FC<PageTemplateProps> = ({ content, params, children }) => {
  const { frontmatter } = content
  
  return (
    <div className="page-content">
      <div className="container">
        <header className="page-header">
          <h1>{frontmatter.title}</h1>
          {frontmatter.description && (
            <p className="page-description">{frontmatter.description}</p>
          )}
        </header>
        
        <div className="page-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default PageTemplate