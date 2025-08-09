/**
 * MDX Content Renderer
 * 
 * Renders MDX content based on the content type and parameters.
 * This component handles the loading and rendering of all MDX content.
 */

import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getContentByUrl, getContent, getAllContent, contentIndex } from '../../utils/mdxLoader'
import { MDXContent } from '../../utils/mdxLoader'
import { Suspense } from 'react'
import { renderWithTemplate } from '../../lib/template-loader'

interface MDXContentRendererProps {
  contentType?: 'pages' | 'components' | 'patterns' | 'guides'
  slug?: string
}

/**
 * Dynamic MDX Content Renderer that automatically maps URLs to MDX files
 */
const MDXContentRenderer: React.FC<MDXContentRendererProps> = ({ contentType, slug }) => {
  const location = useLocation()
  const params = useParams()
  
  // Get content by URL path for dynamic routing
  const content = getContentByUrl(location.pathname)
  
  if (!content) {
    return (
      <div className="content-not-found">
        <div className="container">
          <h1>Content not found</h1>
          <p>The requested content "<code>{location.pathname}</code>" could not be found.</p>
          <p>Available content:</p>
          <ul>
            {Object.values(contentIndex.pages).map(page => (
              <li key={page.slug}><a href={page.url}>{page.frontmatter.title}</a></li>
            ))}
            {Object.values(contentIndex.components).map(component => (
              <li key={component.slug}><a href={component.url}>{component.frontmatter.title}</a></li>
            ))}
          </ul>
        </div>
        
        <style>{`
          .content-not-found {
            padding: 4rem 0;
            text-align: center;
          }
          
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 1rem;
          }
          
          .content-not-found h1 {
            font-size: var(--esds-alias-heading-1-font-size);
            color: var(--esds-alias-text-heading);
            margin-bottom: 1rem;
          }
          
          .content-not-found p {
            font-size: var(--esds-alias-body-large-font-size);
            color: var(--esds-alias-text-muted);
            margin-bottom: 1rem;
          }
          
          .content-not-found code {
            background: var(--esds-alias-code-background);
            padding: 0.125rem 0.25rem;
            border-radius: 0.25rem;
            font-family: var(--esds-alias-font-family-code);
          }
          
          .content-not-found ul {
            text-align: left;
            max-width: 400px;
            margin: 0 auto;
          }
          
          .content-not-found a {
            color: var(--esds-alias-color-brand-primary);
            text-decoration: none;
          }
          
          .content-not-found a:hover {
            text-decoration: underline;
          }
        `}</style>
      </div>
    )
  }
  
  // Render content using template system
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mdx-content">
        {renderWithTemplate(content, params, <ProcessedMDXContent content={content.content} />)}
      </div>
    </Suspense>
  )
}


/**
 * Component to render actual MDX content
 */
const ProcessedMDXContent: React.FC<{ content: string }> = ({ content }) => {
  // For now, we'll render a simple message indicating MDX compilation is needed
  // This should be replaced with proper MDX compilation
  
  return (
    <div className="processed-mdx">
      <p>This content is not yet implemented with proper MDX rendering.</p>
      <p>The raw content would be displayed here once MDX compilation is set up.</p>
    </div>
  )
}

export default MDXContentRenderer