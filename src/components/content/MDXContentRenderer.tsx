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
import { 
  HeroActions, 
  PrimaryButton, 
  SecondaryButton, 
  FeatureGrid, 
  FeatureCard,
  QuickStart,
  QuickStartText,
  CodeBlock,
  StatsGrid,
  Stat,
  ComponentStatus
} from '../mdx/MDXComponents'
import ElevateShowcase from '../examples/ElevateShowcase'

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
  
  // Render content dynamically based on the MDX content and its path
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mdx-content">
        <DynamicMDXRenderer content={content} params={params} />
      </div>
    </Suspense>
  )
}

/**
 * Dynamic MDX Renderer that processes MDX content and renders it appropriately
 */
const DynamicMDXRenderer: React.FC<{ content: MDXContent; params: any }> = ({ content, params }) => {
  const { frontmatter, content: mdxContent, path, url } = content
  
  // Determine content type from path
  const contentType = getContentTypeFromPath(path)
  
  switch (contentType) {
    case 'pages':
      return renderPage(content, params)
    case 'components':
      return renderComponent(content, params)
    case 'patterns':
      return renderPattern(content, params)
    case 'guides':
      return renderGuide(content, params)
    default:
      return renderGenericMDX(content, params)
  }
}

/**
 * Determine content type from file path
 */
function getContentTypeFromPath(path: string): string {
  if (path.includes('/pages/')) return 'pages'
  if (path.includes('/components/')) return 'components'
  if (path.includes('/patterns/')) return 'patterns'
  if (path.includes('/guides/')) return 'guides'
  return 'generic'
}

/**
 * Generic MDX renderer for content that doesn't fit specific types
 */
function renderGenericMDX(content: MDXContent, params: any) {
  const { frontmatter, content: mdxContent } = content
  
  return (
    <div className="generic-mdx-content">
      <div className="container">
        <header className="content-header">
          <h1>{frontmatter.title}</h1>
          {frontmatter.description && (
            <p className="description">{frontmatter.description}</p>
          )}
        </header>
        
        <div className="mdx-body">
          {/* Render MDX content as text for now - can be enhanced with proper MDX parsing */}
          <div className="mdx-text-content">
            <p>{mdxContent}</p>
          </div>
        </div>
      </div>
      
      <style>{`
        .generic-mdx-content {
          padding: 2rem 0;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .content-header {
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .content-header h1 {
          font-size: var(--esds-alias-heading-1-font-size);
          color: var(--esds-alias-text-heading);
          margin-bottom: 1rem;
        }
        
        .description {
          font-size: var(--esds-alias-body-large-font-size);
          color: var(--esds-alias-text-muted);
          line-height: 1.6;
        }
      `}</style>
    </div>
  )
}

/**
 * Render a component documentation page with actual MDX content
 */
function renderComponent(content: MDXContent, params: any) {
  const { frontmatter, content: mdxContent } = content
  
  // For all components, render the actual MDX content
  return (
    <div className="component-page">
      <div className="container">
        <header className="component-header">
          <div className="breadcrumb">
            <a href="/components">Components</a>
            <span> / </span>
            <span>{frontmatter.title}</span>
          </div>
          
          <ComponentStatus status={frontmatter.status || 'stable'} />
          
          <h1>{frontmatter.title}</h1>
          <p>{frontmatter.description}</p>
          
          {frontmatter.category && (
            <div className="component-category">
              Category: {frontmatter.category}
            </div>
          )}
        </header>
        
        <div className="component-content">
          {/* Render actual MDX content */}
          <ProcessedMDXContent content={mdxContent} />
        </div>
      </div>
      
      <style>{`
        .component-page {
          padding: 2rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .breadcrumb {
          margin-bottom: 2rem;
          font-size: var(--esds-alias-label-small-font-size);
          color: var(--esds-alias-text-muted);
        }

        .breadcrumb a {
          color: var(--esds-alias-color-brand-primary);
          text-decoration: none;
        }

        .breadcrumb a:hover {
          text-decoration: underline;
        }

        .component-header {
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--esds-alias-sidebar-border);
        }

        .component-header h1 {
          font-size: var(--esds-alias-heading-1-font-size);
          margin-bottom: 1rem;
          color: var(--esds-alias-text-heading);
        }

        .component-header p {
          font-size: var(--esds-alias-body-large-font-size);
          color: var(--esds-alias-text-muted);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .component-category {
          font-size: var(--esds-alias-label-font-size);
          color: var(--esds-alias-text-muted);
          font-weight: var(--esds-alias-label-font-weight);
        }
      `}</style>
    </div>
  )
}

/**
 * Component to render actual MDX content using React components
 * For now, we'll create a React version of the button documentation
 */
const ProcessedMDXContent: React.FC<{ content: string }> = ({ content }) => {
  // Since we can't easily parse MDX at runtime, let's render the actual documentation
  // This is a temporary solution until we implement proper MDX compilation
  
  return (
    <div className="processed-mdx">
      {/* Overview Section */}
      <section>
        <h2>Overview</h2>
        <p>
          Buttons communicate actions that users can take and are typically placed throughout your UI, 
          in places like dialogs, modal windows, forms, cards, and toolbars.
        </p>
        
        <esds-component-preview 
          code={`<elvt-button tone="neutral">Neutral Button</elvt-button>
<elvt-button tone="primary">Primary Button</elvt-button>
<elvt-button tone="emphasized">Emphasized Button</elvt-button>`}
          preview={true}
          show-copy={true}
        />
      </section>

      {/* Usage Guidelines Section */}
      <section>
        <h2>Usage Guidelines</h2>
        
        <h3>When to Use</h3>
        <ul>
          <li><strong>Primary actions</strong>: Use primary tone for the most important action on a page</li>
          <li><strong>Emphasized actions</strong>: Use emphasized tone to highlight important actions</li>
          <li><strong>Neutral actions</strong>: Use neutral tone for standard actions (default)</li>
          <li><strong>Subtle actions</strong>: Use subtle tone for dismissive actions like cancel or skip</li>
          <li><strong>Success/Warning/Danger</strong>: Use contextual tones for feedback and critical actions</li>
        </ul>
        
        <h3>When Not to Use</h3>
        <ul>
          <li><strong>Navigation</strong>: Use Link components instead of buttons for navigation</li>
          <li><strong>Toggle states</strong>: Use Toggle or Switch components for on/off states</li>
          <li><strong>Multiple selections</strong>: Use Checkbox components for multiple selections</li>
        </ul>
      </section>

      {/* Variants Section */}
      <section>
        <h2>Variants</h2>
        
        <h3>Tone</h3>
        <p>Buttons come in different tones to indicate their importance and context:</p>
        
        <esds-component-preview 
          code={`<elvt-stack gap="m" direction="row" align="center" wrap="wrap">
  <elvt-button tone="neutral">Neutral</elvt-button>
  <elvt-button tone="primary">Primary</elvt-button>
  <elvt-button tone="emphasized">Emphasized</elvt-button>
  <elvt-button tone="subtle">Subtle</elvt-button>
</elvt-stack>

<elvt-stack gap="m" direction="row" align="center" wrap="wrap">
  <elvt-button tone="success">Success</elvt-button>
  <elvt-button tone="warning">Warning</elvt-button>
  <elvt-button tone="danger">Danger</elvt-button>
</elvt-stack>`}
          preview={true}
          show-copy={true}
        />
        
        <div className="tone-descriptions">
          <h4>Tone Descriptions</h4>
          <ul>
            <li><strong>Neutral</strong>: Default tone with no specific emphasis</li>
            <li><strong>Primary</strong>: Most important action in a context (use sparingly)</li>
            <li><strong>Emphasized</strong>: Highlight an important action or element</li>
            <li><strong>Subtle</strong>: Dismissive actions like cancel, skip, or dismiss</li>
            <li><strong>Success</strong>: Positive confirmation or successful actions</li>
            <li><strong>Warning</strong>: Actions requiring caution or potential problems</li>
            <li><strong>Danger</strong>: Destructive actions or critical information</li>
          </ul>
        </div>
        
        <h3>Size</h3>
        <p>Choose the appropriate size for your use case:</p>
        
        <esds-component-preview 
          code={`<elvt-stack gap="m" direction="row" align="center">
  <elvt-button size="small" tone="primary">Small</elvt-button>
  <elvt-button size="medium" tone="primary">Medium</elvt-button>
  <elvt-button size="large" tone="primary">Large</elvt-button>
</elvt-stack>`}
          preview={true}
          show-copy={true}
        />
        
        <h3>States</h3>
        <p>Buttons have different states to provide feedback to users:</p>
        
        <esds-component-preview 
          code={`<elvt-stack gap="m" direction="row" align="center">
  <elvt-button tone="primary">Default</elvt-button>
  <elvt-button tone="primary" disabled>Disabled</elvt-button>
  <elvt-button tone="primary" loading>Loading</elvt-button>
</elvt-stack>`}
          preview={true}
          show-copy={true}
        />
      </section>

      {/* Examples Section */}
      <section>
        <h2>Examples</h2>
        
        <h3>With Icons</h3>
        <p>Buttons can include icons to provide additional context:</p>
        
        <esds-component-preview 
          code={`<elvt-stack gap="m" direction="row" align="center">
  <elvt-button>
    <elvt-icon name="plus" slot="icon-left"></elvt-icon>
    Add Item
  </elvt-button>
  <elvt-button>
    Continue
    <elvt-icon name="arrow-right" slot="icon-right"></elvt-icon>
  </elvt-button>
  <elvt-button tone="emphasized">
    <elvt-icon name="download" slot="icon-left"></elvt-icon>
    Download
  </elvt-button>
</elvt-stack>`}
          preview={true}
          show-copy={true}
        />
        
        <h3>Full Width</h3>
        <p>Buttons can span the full width of their container:</p>
        
        <esds-component-preview 
          code={`<elvt-button full-width tone="primary">Full Width Button</elvt-button>`}
          preview={true}
          show-copy={true}
        />
        
        <h3>Loading State</h3>
        <p>Show loading state during asynchronous operations:</p>
        
        <esds-component-preview 
          code={`<elvt-stack gap="m" direction="row" align="center">
  <elvt-button loading tone="primary">Saving...</elvt-button>
  <elvt-button loading tone="emphasized">Processing</elvt-button>
</elvt-stack>`}
          preview={true}
          show-copy={true}
        />
      </section>

      {/* API Reference Section */}
      <section>
        <h2>API Reference</h2>
        <div className="api-table-wrapper">
          <table className="api-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>tone</code></td>
                <td><code>'neutral' | 'primary' | 'emphasized' | 'subtle' | 'success' | 'warning' | 'danger'</code></td>
                <td><code>'neutral'</code></td>
                <td>Visual style and semantic meaning</td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td><code>'small' | 'medium' | 'large'</code></td>
                <td><code>'medium'</code></td>
                <td>Button size</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Disables the button</td>
              </tr>
              <tr>
                <td><code>loading</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Shows loading state</td>
              </tr>
              <tr>
                <td><code>type</code></td>
                <td><code>'button' | 'submit' | 'reset'</code></td>
                <td><code>'button'</code></td>
                <td>HTML button type</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3>Events</h3>
        <div className="api-table-wrapper">
          <table className="api-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Detail</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>click</code></td>
                <td><code>MouseEvent</code></td>
                <td>Fired when button is clicked</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility Section */}
      <section>
        <h2>Accessibility</h2>
        
        <h3>Keyboard Support</h3>
        <ul>
          <li><strong>Enter/Space</strong>: Activates the button</li>
          <li><strong>Tab</strong>: Moves focus to the button</li>
          <li><strong>Shift + Tab</strong>: Moves focus away from the button</li>
        </ul>
        
        <h3>Screen Reader Support</h3>
        <ul>
          <li>Button has proper ARIA labels and roles</li>
          <li>Loading and disabled states are announced</li>
          <li>Icon-only buttons include accessible labels</li>
        </ul>
        
        <h3>Best Practices</h3>
        <ul>
          <li>Use descriptive button labels that clearly indicate the action</li>
          <li>Ensure sufficient color contrast (4.5:1 minimum)</li>
          <li>Provide focus indicators for keyboard navigation</li>
          <li>Use loading states for long-running operations</li>
        </ul>
      </section>

      {/* Related Components Section */}
      <section>
        <h2>Related Components</h2>
        <ul className="related-list">
          <li><a href="/components/link">Link</a> - For navigation between pages</li>
          <li><a href="/components/icon-button">Icon Button</a> - For buttons with only icons</li>
          <li><a href="/components/toggle">Toggle</a> - For binary on/off controls</li>
        </ul>
      </section>
      
      <style>{`
        .processed-mdx {
          line-height: 1.6;
        }
        
        .processed-mdx section {
          margin-bottom: 3rem;
        }
        
        .processed-mdx h2 {
          font-size: var(--esds-alias-heading-2-font-size);
          margin: 2rem 0 1rem 0;
          color: var(--esds-alias-text-heading);
        }
        
        .processed-mdx h3 {
          font-size: var(--esds-alias-heading-3-font-size);
          margin: 1.5rem 0 0.75rem 0;
          color: var(--esds-alias-text-heading);
        }
        
        .processed-mdx h4 {
          font-size: var(--esds-alias-heading-4-font-size);
          margin: 1rem 0 0.5rem 0;
          color: var(--esds-alias-text-heading);
        }
        
        .processed-mdx p {
          margin-bottom: 1rem;
          color: var(--esds-alias-text-muted);
        }
        
        .processed-mdx ul {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        
        .processed-mdx li {
          margin-bottom: 0.5rem;
          color: var(--esds-alias-text-muted);
        }
        
        .tone-descriptions {
          background: var(--esds-alias-background-surface);
          border: 1px solid var(--esds-alias-sidebar-border);
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin: 1.5rem 0;
        }

        .tone-descriptions h4 {
          margin-top: 0;
          color: var(--esds-alias-color-brand-primary);
        }

        .tone-descriptions ul {
          margin-bottom: 0;
        }
        
        .api-table-wrapper {
          overflow-x: auto;
          margin-bottom: 2rem;
        }
        
        .api-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid var(--esds-alias-sidebar-border);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .api-table th,
        .api-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid var(--esds-alias-sidebar-border);
        }

        .api-table th {
          background: var(--esds-alias-background-surface);
          font-weight: var(--esds-alias-label-font-weight);
          font-size: var(--esds-alias-label-font-size);
          color: var(--esds-alias-text-heading);
        }

        .api-table td {
          font-size: var(--esds-alias-body-font-size);
          color: var(--esds-alias-text-muted);
        }

        .api-table code {
          background: var(--esds-alias-code-background);
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: var(--esds-alias-font-family-code);
          font-size: var(--esds-alias-code-inline-font-size);
          color: var(--esds-alias-color-brand-primary);
        }
        
        .related-list {
          list-style: none;
          padding: 0;
        }

        .related-list li {
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--esds-alias-sidebar-border);
        }

        .related-list li:last-child {
          border-bottom: none;
        }

        .related-list a {
          color: var(--esds-alias-color-brand-primary);
          text-decoration: none;
          font-weight: 500;
        }

        .related-list a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

/**
 * Render a page (home, components index, etc.)
 */
function renderPage(content: any, params: any) {
  const { frontmatter } = content
  
  if (frontmatter.layout === 'home') {
    return <HomePage />
  }
  
  if (params['*'] === 'components' || content.slug === 'components') {
    return <ComponentsOverview />
  }
  
  if (params['*'] === 'guides' || content.slug === 'guides') {
    return <GuidesOverview />
  }
  
  if (params['*'] === 'patterns' || content.slug === 'patterns') {
    return <PatternsOverview />
  }
  
  return (
    <div className="page-content">
      <div className="container">
        <header className="page-header">
          <h1>{frontmatter.title}</h1>
          <p>{frontmatter.description}</p>
        </header>
      </div>
      
      <style>{`
        .page-content {
          padding: 2rem 0;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .page-header h1 {
          font-size: var(--esds-alias-heading-1-font-size);
          font-weight: var(--esds-alias-heading-1-font-weight);
          margin-bottom: 1rem;
          color: var(--esds-alias-text-heading);
        }
        
        .page-header p {
          font-size: var(--esds-alias-body-large-font-size);
          color: var(--esds-alias-text-muted);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }
      `}</style>
    </div>
  )
}

/**
 * Render a pattern documentation page
 */
function renderPattern(content: any, params: any) {
  const { frontmatter } = content
  
  return (
    <div className="pattern-page">
      <div className="container">
        <header className="pattern-header">
          <div className="breadcrumb">
            <a href="/patterns">Patterns</a>
            <span> / </span>
            <span>{frontmatter.title}</span>
          </div>
          
          <h1>{frontmatter.title}</h1>
          <p>{frontmatter.description}</p>
          
          <div className="pattern-meta">
            {frontmatter.difficulty && (
              <span className={`difficulty difficulty-${frontmatter.difficulty}`}>
                {frontmatter.difficulty}
              </span>
            )}
            
            {frontmatter.tags && (
              <div className="tags">
                {frontmatter.tags.map((tag: string) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </header>
        
        <div className="pattern-content">
          <div className="placeholder-notice">
            <h3>🎨 Pattern Documentation</h3>
            <p>
              This pattern's full documentation is loaded from the MDX file: 
              <code>/src/content/patterns/{content.slug}.mdx</code>
            </p>
            <p>The documentation includes:</p>
            <ul>
              <li>Complete code examples and implementation</li>
              <li>Visual design patterns and layouts</li>
              <li>Best practices and usage guidelines</li>
              <li>Accessibility considerations</li>
              <li>Responsive design patterns</li>
            </ul>
          </div>
        </div>
      </div>
      
      <style>{`
        .pattern-page {
          padding: 2rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .breadcrumb {
          margin-bottom: 2rem;
          font-size: var(--esds-alias-label-small-font-size);
          color: var(--esds-alias-text-muted);
        }

        .breadcrumb a {
          color: var(--esds-alias-color-brand-primary);
          text-decoration: none;
        }

        .pattern-header {
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--esds-alias-sidebar-border);
        }

        .pattern-header h1 {
          font-size: var(--esds-alias-heading-1-font-size);
          margin-bottom: 1rem;
          color: var(--esds-alias-text-heading);
        }

        .pattern-meta {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 1rem;
        }

        .difficulty {
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: var(--esds-alias-label-small-font-size);
          font-weight: var(--esds-alias-label-small-font-weight);
        }

        .difficulty-beginner {
          background: #dcfce7;
          color: #166534;
        }

        .difficulty-intermediate {
          background: #fef3c7;
          color: #92400e;
        }

        .difficulty-advanced {
          background: #fee2e2;
          color: #991b1b;
        }

        .tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tag {
          padding: 0.125rem 0.5rem;
          background: var(--esds-alias-background-surface);
          border: 1px solid var(--esds-alias-sidebar-border);
          border-radius: 0.25rem;
          font-size: var(--esds-alias-label-small-font-size);
          color: var(--esds-alias-text-muted);
        }

        .placeholder-notice {
          background: var(--esds-alias-background-surface);
          border: 1px solid var(--esds-alias-sidebar-border);
          border-radius: 0.5rem;
          padding: 2rem;
          text-align: center;
        }

        .placeholder-notice h3 {
          color: var(--esds-alias-color-brand-primary);
          margin-bottom: 1rem;
        }

        .placeholder-notice code {
          background: var(--esds-alias-code-background);
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: var(--esds-alias-font-family-code);
          font-size: var(--esds-alias-code-inline-font-size);
        }
      `}</style>
    </div>
  )
}

/**
 * Render a guide page
 */
function renderGuide(content: any, params: any) {
  const { frontmatter } = content
  
  return (
    <div className="guide-page">
      <div className="container">
        <header className="guide-header">
          <div className="breadcrumb">
            <a href="/guides">Guides</a>
            <span> / </span>
            <a href={`/guides/${params.role}`}>{params.role}</a>
            <span> / </span>
            <span>{frontmatter.title}</span>
          </div>
          
          <h1>{frontmatter.title}</h1>
          <p>{frontmatter.description}</p>
        </header>
        
        <div className="guide-content">
          <div className="placeholder-notice">
            <h3>📝 Guide Content</h3>
            <p>
              This guide's content is loaded from the MDX file: 
              <code>/src/content/guides/{params.role}/{content.slug}.mdx</code>
            </p>
            <p>The guide includes:</p>
            <ul>
              <li>Step-by-step instructions</li>
              <li>Interactive examples</li>
              <li>Best practices and tips</li>
              <li>Real-world use cases</li>
              <li>Related resources and links</li>
            </ul>
          </div>
        </div>
      </div>
      
      <style>{`
        .guide-page {
          padding: 2rem 0;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .breadcrumb {
          margin-bottom: 2rem;
          font-size: var(--esds-alias-label-small-font-size);
          color: var(--esds-alias-text-muted);
        }

        .breadcrumb a {
          color: var(--esds-alias-color-brand-primary);
          text-decoration: none;
        }

        .guide-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .guide-header h1 {
          font-size: var(--esds-alias-heading-1-font-size);
          margin-bottom: 1rem;
          color: var(--esds-alias-text-heading);
        }

        .guide-header p {
          font-size: var(--esds-alias-body-large-font-size);
          color: var(--esds-alias-text-muted);
          line-height: 1.6;
        }

        .placeholder-notice {
          background: var(--esds-alias-background-surface);
          border: 1px solid var(--esds-alias-sidebar-border);
          border-radius: 0.5rem;
          padding: 2rem;
          text-align: center;
        }

        .placeholder-notice code {
          background: var(--esds-alias-code-background);
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: var(--esds-alias-font-family-code);
          font-size: var(--esds-alias-code-inline-font-size);
        }
      `}</style>
    </div>
  )
}

// Import existing components for overview pages
import HomePage from '../../pages/HomePage'

// Create overview components that use MDX data
const ComponentsOverview: React.FC = () => {
  const components = getAllContent('components')
  
  return (
    <div className="components-page">
      <div className="container">
        <header className="page-header">
          <h1>Components</h1>
          <p>
            Comprehensive documentation for all ELEVATE components. Each component includes 
            interactive examples, API documentation, and usage guidelines.
          </p>
        </header>

        <div className="components-grid">
          {components.map((component) => (
            <div key={component.slug} className="component-card">
              <div className="component-category">{component.frontmatter.category}</div>
              <h3>
                <a href={`/components/${component.slug}`}>
                  {component.frontmatter.title}
                </a>
              </h3>
              <p>{component.frontmatter.description}</p>
              <div className="component-actions">
                <a href={`/components/${component.slug}`} className="view-docs">
                  View Documentation →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .components-page {
          padding: 2rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .page-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .page-header h1 {
          font-size: var(--esds-alias-heading-1-font-size);
          margin-bottom: 1rem;
          color: var(--esds-alias-text-heading);
        }

        .page-header p {
          font-size: var(--esds-alias-body-large-font-size);
          color: var(--esds-alias-text-muted);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .components-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .component-card {
          background: var(--esds-alias-background-elevated);
          border: 1px solid var(--esds-alias-sidebar-border);
          border-radius: 0.5rem;
          padding: 1.5rem;
          transition: all 0.2s ease;
        }

        .component-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .component-category {
          font-size: var(--esds-alias-label-small-font-size);
          color: var(--esds-alias-color-brand-primary);
          font-weight: var(--esds-alias-label-small-font-weight);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .component-card h3 {
          margin-bottom: 0.75rem;
        }

        .component-card h3 a {
          color: var(--esds-alias-text-heading);
          text-decoration: none;
          font-size: var(--esds-alias-heading-5-font-size);
        }

        .component-card h3 a:hover {
          color: var(--esds-alias-color-brand-primary);
        }

        .component-card p {
          color: var(--esds-alias-text-muted);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .view-docs {
          color: var(--esds-alias-color-brand-primary);
          text-decoration: none;
          font-weight: 500;
          font-size: var(--esds-alias-label-font-size);
        }

        .view-docs:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

const GuidesOverview: React.FC = () => {
  // Guide structure by role - this could be loaded from MDX data
  const guidesByRole = {
    designers: {
      title: 'For Designers',
      description: 'Visual guidelines, design principles, and best practices for using ELEVATE components',
      icon: '🎨',
      guides: [
        { id: 'getting-started', title: 'Getting Started', description: 'Introduction to ELEVATE for designers' },
        { id: 'design-tokens', title: 'Design Tokens', description: 'Colors, typography, spacing, and more' },
        { id: 'component-usage', title: 'Component Usage', description: 'When and how to use each component' },
        { id: 'accessibility', title: 'Accessibility', description: 'Designing inclusive experiences' },
        { id: 'responsive-design', title: 'Responsive Design', description: 'Mobile-first design principles' },
      ]
    },
    developers: {
      title: 'For Developers', 
      description: 'Implementation guides, API references, and technical documentation',
      icon: '⚡',
      guides: [
        { id: 'installation', title: 'Installation', description: 'How to install and configure ELEVATE packages' },
        { id: 'api-reference', title: 'API Reference', description: 'Complete component API documentation' },
        { id: 'theming', title: 'Theming', description: 'Customizing design tokens and themes' },
        { id: 'typescript', title: 'TypeScript', description: 'Using ELEVATE with TypeScript' },
        { id: 'testing', title: 'Testing', description: 'Testing components and patterns' },
        { id: 'performance', title: 'Performance', description: 'Optimization tips and best practices' },
      ]
    },
    'product-managers': {
      title: 'For Product Managers',
      description: 'Strategic guidance, ROI metrics, and team collaboration workflows',
      icon: '📊',
      guides: [
        { id: 'design-system-value', title: 'Design System Value', description: 'Business benefits and ROI' },
        { id: 'adoption-strategy', title: 'Adoption Strategy', description: 'Rolling out ELEVATE across teams' },
        { id: 'governance', title: 'Governance', description: 'Managing design system evolution' },
        { id: 'metrics', title: 'Metrics & KPIs', description: 'Measuring design system success' },
        { id: 'collaboration', title: 'Team Collaboration', description: 'Designer-developer workflows' },
      ]
    }
  }
  
  return (
    <div className="guides-page">
      <div className="container">
        <header className="page-header">
          <h1>Guides</h1>
          <p>
            Role-based guides and documentation for designers, developers, and product managers 
            using the ELEVATE Design System.
          </p>
        </header>

        <div className="roles-grid">
          {Object.entries(guidesByRole).map(([roleKey, role]) => (
            <div key={roleKey} className="role-card">
              <div className="role-icon">{role.icon}</div>
              <h3>
                <a href={`/guides/${roleKey}`}>{role.title}</a>
              </h3>
              <p>{role.description}</p>
              
              <div className="guides-list">
                {role.guides.map((guide) => (
                  <div key={guide.id} className="guide-item">
                    <a href={`/guides/${roleKey}/${guide.id}`}>
                      {guide.title}
                    </a>
                    <p>{guide.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .guides-page {
          padding: 2rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .page-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .page-header h1 {
          font-size: var(--esds-alias-heading-1-font-size);
          margin-bottom: 1rem;
          color: var(--esds-alias-text-heading);
        }

        .page-header p {
          font-size: var(--esds-alias-body-large-font-size);
          color: var(--esds-alias-text-muted);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .roles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .role-card {
          background: var(--esds-alias-background-elevated);
          border: 1px solid var(--esds-alias-sidebar-border);
          border-radius: 0.75rem;
          padding: 2rem;
          transition: all 0.2s ease;
        }

        .role-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .role-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        .role-card h3 {
          text-align: center;
          margin-bottom: 1rem;
        }

        .role-card h3 a {
          color: var(--esds-alias-text-heading);
          text-decoration: none;
          font-size: var(--esds-alias-heading-4-font-size);
        }

        .role-card h3 a:hover {
          color: var(--esds-alias-color-brand-primary);
        }

        .role-card > p {
          text-align: center;
          color: var(--esds-alias-text-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .guides-list {
          border-top: 1px solid var(--esds-alias-sidebar-border);
          padding-top: 1.5rem;
        }

        .guide-item {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--esds-alias-sidebar-border);
        }

        .guide-item:last-child {
          margin-bottom: 0;
          border-bottom: none;
          padding-bottom: 0;
        }

        .guide-item a {
          color: var(--esds-alias-color-brand-primary);
          text-decoration: none;
          font-weight: 500;
          font-size: var(--esds-alias-body-font-size);
        }

        .guide-item a:hover {
          text-decoration: underline;
        }

        .guide-item p {
          color: var(--esds-alias-text-muted);
          font-size: var(--esds-alias-body-small-font-size);
          margin-top: 0.25rem;
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
}

const PatternsOverview: React.FC = () => {
  const patterns = getAllContent('patterns')
  
  return (
    <div className="patterns-page">
      <div className="container">
        <header className="page-header">
          <h1>Patterns</h1>
          <p>
            Design patterns and templates built with ELEVATE components. Filter by tags, 
            difficulty, and component usage.
          </p>
        </header>

        <div className="patterns-grid">
          {patterns.map((pattern) => (
            <div key={pattern.slug} className="pattern-card">
              <div className="pattern-meta">
                {pattern.frontmatter.difficulty && (
                  <span className={`difficulty difficulty-${pattern.frontmatter.difficulty}`}>
                    {pattern.frontmatter.difficulty}
                  </span>
                )}
              </div>
              
              <h3>
                <a href={`/patterns/${pattern.slug}`}>
                  {pattern.frontmatter.title}
                </a>
              </h3>
              
              <p>{pattern.frontmatter.description}</p>
              
              {pattern.frontmatter.tags && (
                <div className="tags">
                  {pattern.frontmatter.tags.map((tag: string) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
              
              {pattern.frontmatter.components && (
                <div className="components-used">
                  <strong>Uses:</strong> {pattern.frontmatter.components.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .patterns-page {
          padding: 2rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .page-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .page-header h1 {
          font-size: var(--esds-alias-heading-1-font-size);
          margin-bottom: 1rem;
          color: var(--esds-alias-text-heading);
        }

        .page-header p {
          font-size: var(--esds-alias-body-large-font-size);
          color: var(--esds-alias-text-muted);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .patterns-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .pattern-card {
          background: var(--esds-alias-background-elevated);
          border: 1px solid var(--esds-alias-sidebar-border);
          border-radius: 0.5rem;
          padding: 1.5rem;
          transition: all 0.2s ease;
        }

        .pattern-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .pattern-meta {
          margin-bottom: 1rem;
        }

        .difficulty {
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: var(--esds-alias-label-small-font-size);
          font-weight: var(--esds-alias-label-small-font-weight);
        }

        .difficulty-beginner {
          background: #dcfce7;
          color: #166534;
        }

        .difficulty-intermediate {
          background: #fef3c7;
          color: #92400e;
        }

        .difficulty-advanced {
          background: #fee2e2;
          color: #991b1b;
        }

        .pattern-card h3 {
          margin-bottom: 0.75rem;
        }

        .pattern-card h3 a {
          color: var(--esds-alias-text-heading);
          text-decoration: none;
          font-size: var(--esds-alias-heading-5-font-size);
        }

        .pattern-card h3 a:hover {
          color: var(--esds-alias-color-brand-primary);
        }

        .pattern-card p {
          color: var(--esds-alias-text-muted);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .tag {
          padding: 0.125rem 0.5rem;
          background: var(--esds-alias-background-surface);
          border: 1px solid var(--esds-alias-sidebar-border);
          border-radius: 0.25rem;
          font-size: var(--esds-alias-label-small-font-size);
          color: var(--esds-alias-text-muted);
        }

        .components-used {
          font-size: var(--esds-alias-body-small-font-size);
          color: var(--esds-alias-text-muted);
        }

        .components-used strong {
          color: var(--esds-alias-text-heading);
        }
      `}</style>
    </div>
  )
}

export default MDXContentRenderer