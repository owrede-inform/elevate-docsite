/**
 * Token Page Template
 * 
 * Template for design token documentation with enhanced styling for token tables
 */

import React from 'react'
import { MDXContent } from '../../utils/mdxLoader'
import { PageTemplateProps } from './page'
import '../../styles/templates/token.css'

const TokenTemplate: React.FC<PageTemplateProps> = ({ content, params, children }) => {
  const { frontmatter } = content
  
  return (
    <div className="token-page">
      <div className="container">
        <header className="token-header">
          <div className="breadcrumb">
            <a href="/tokens">Design Tokens</a>
            <span className="breadcrumb-separator"> / </span>
            <span>{frontmatter.title}</span>
          </div>
          
          <div className="token-meta">
            {frontmatter.tokenType && (
              <div className="token-type">
                <span className="meta-label">Type:</span>
                <span className={`token-badge token-${frontmatter.tokenType.toLowerCase()}`}>
                  {frontmatter.tokenType}
                </span>
              </div>
            )}
            {frontmatter.layer && (
              <div className="token-layer">
                <span className="meta-label">Layer:</span>
                <span className="meta-value">{frontmatter.layer}</span>
              </div>
            )}
            {frontmatter.prefix && (
              <div className="token-prefix">
                <span className="meta-label">Prefix:</span>
                <code className="token-prefix-code">{frontmatter.prefix}</code>
              </div>
            )}
          </div>
          
          <h1>{frontmatter.title}</h1>
          {frontmatter.description && (
            <p className="token-description">{frontmatter.description}</p>
          )}
          
          {frontmatter.usage && (
            <div className="token-usage">
              <h3>Usage Guidelines</h3>
              <p>{frontmatter.usage}</p>
            </div>
          )}
        </header>
        
        <div className="token-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default TokenTemplate