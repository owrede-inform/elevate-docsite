/**
 * Pattern Page Template
 * 
 * Template for design patterns with example showcases and implementation guidance
 */

import React from 'react'
import { MDXContent } from '../../utils/mdxLoader'
import { PageTemplateProps } from './page'
import '../../styles/templates/pattern.css'

const PatternTemplate: React.FC<PageTemplateProps> = ({ content, params, children }) => {
  const { frontmatter } = content
  
  return (
    <div className="pattern-page">
      <div className="container">
        <header className="pattern-header">
          <div className="breadcrumb">
            <a href="/patterns">Patterns</a>
            <span className="breadcrumb-separator"> / </span>
            <span>{frontmatter.title}</span>
          </div>
          
          <div className="pattern-meta">
            {frontmatter.complexity && (
              <div className="pattern-complexity">
                <span className="meta-label">Complexity:</span>
                <span className={`complexity-badge complexity-${frontmatter.complexity.toLowerCase()}`}>
                  {frontmatter.complexity}
                </span>
              </div>
            )}
            {frontmatter.category && (
              <div className="pattern-category">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{frontmatter.category}</span>
              </div>
            )}
            {frontmatter.components && (
              <div className="pattern-components">
                <span className="meta-label">Uses components:</span>
                <div className="component-list">
                  {frontmatter.components.split(',').map((comp: string, index: number) => (
                    <code key={index} className="component-tag">{comp.trim()}</code>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <h1>{frontmatter.title}</h1>
          {frontmatter.description && (
            <p className="pattern-description">{frontmatter.description}</p>
          )}
          
          {frontmatter.whenToUse && (
            <div className="pattern-usage">
              <h3>When to use this pattern</h3>
              <p>{frontmatter.whenToUse}</p>
            </div>
          )}
        </header>
        
        <div className="pattern-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default PatternTemplate