/**
 * Home Page Template
 * 
 * Special template for the homepage with hero section and enhanced styling
 */

import React from 'react'
import { MDXContent } from '../../utils/mdxLoader'
import { PageTemplateProps } from './page'
import '../../styles/templates/home.css'

const HomeTemplate: React.FC<PageTemplateProps> = ({ content, params, children }) => {
  const { frontmatter } = content
  
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{frontmatter.title}</h1>
            {frontmatter.description && (
              <p className="hero-description">{frontmatter.description}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="home-content">
        <div className="container">
          {children}
        </div>
      </div>
      
    </div>
  )
}

export default HomeTemplate