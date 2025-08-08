import React from 'react'
import { useParams } from 'react-router-dom'

const ComponentsPage: React.FC = () => {
  const { componentName } = useParams()

  if (componentName) {
    return (
      <div className="component-detail-page">
        <div className="container">
          <div className="breadcrumb">
            <a href="/components">Components</a>
            <span> / </span>
            <span>{componentName}</span>
          </div>
          
          <header className="component-header">
            <h1>{componentName}</h1>
            <p>Detailed documentation for the {componentName} component will be loaded from MDX files.</p>
          </header>
          
          <div className="component-content">
            <div className="placeholder-notice">
              <h3>🚧 Component Documentation Coming Soon</h3>
              <p>
                This component's documentation will be loaded from MDX files in the 
                <code>/src/content/components/</code> directory.
              </p>
              <p>
                Each component will include:
              </p>
              <ul>
                <li>Interactive examples with live preview</li>
                <li>API documentation with prop tables</li>
                <li>Usage guidelines and best practices</li>
                <li>Accessibility information</li>
                <li>Related patterns and components</li>
              </ul>
            </div>
          </div>
        </div>
        
        <style>{`
          .component-detail-page {
            padding: 2rem 0;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
          }

          .breadcrumb {
            margin-bottom: 2rem;
            font-size: 0.875rem;
            color: var(--elevate-color-text-secondary, #6c757d);
          }

          .breadcrumb a {
            color: var(--elevate-color-primary, #0066cc);
            text-decoration: none;
          }

          .breadcrumb a:hover {
            text-decoration: underline;
          }

          .component-header {
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--elevate-color-border-light, #e9ecef);
          }

          .component-header h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: var(--elevate-color-text-primary, #1a1a1a);
          }

          .component-header p {
            font-size: 1.125rem;
            color: var(--elevate-color-text-secondary, #4a4a4a);
            line-height: 1.6;
          }

          .placeholder-notice {
            background: var(--elevate-color-background-secondary, #f8f9fa);
            border: 1px solid var(--elevate-color-border-light, #e9ecef);
            border-radius: 0.5rem;
            padding: 2rem;
            text-align: center;
          }

          .placeholder-notice h3 {
            color: var(--elevate-color-primary, #0066cc);
            margin-bottom: 1rem;
          }

          .placeholder-notice p {
            margin-bottom: 1rem;
            color: var(--elevate-color-text-secondary, #4a4a4a);
          }

          .placeholder-notice ul {
            text-align: left;
            max-width: 600px;
            margin: 0 auto;
            color: var(--elevate-color-text-secondary, #4a4a4a);
          }

          .placeholder-notice code {
            background: var(--elevate-color-background-primary, #ffffff);
            padding: 0.125rem 0.25rem;
            border-radius: 0.25rem;
            font-family: 'Roboto Mono', monospace;
            font-size: 0.875rem;
          }
        `}</style>
      </div>
    )
  }

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
          {/* Placeholder component cards */}
          {[
            { name: 'Button', category: 'Actions', description: 'Primary and secondary buttons for user interactions' },
            { name: 'Input', category: 'Forms', description: 'Text input fields with validation support' },
            { name: 'Card', category: 'Layout', description: 'Content containers with flexible layouts' },
            { name: 'Modal', category: 'Overlays', description: 'Dialog boxes and modal windows' },
            { name: 'Table', category: 'Data Display', description: 'Data tables with sorting and filtering' },
            { name: 'Navigation', category: 'Navigation', description: 'Primary and secondary navigation components' },
            { name: 'Avatar', category: 'Data Display', description: 'User profile images and initials' },
            { name: 'Badge', category: 'Data Display', description: 'Status indicators and labels' },
            { name: 'Tooltip', category: 'Overlays', description: 'Contextual help and information' },
            { name: 'Dropdown', category: 'Actions', description: 'Menu dropdowns and select lists' },
            { name: 'Checkbox', category: 'Forms', description: 'Multiple choice selections' },
            { name: 'Radio', category: 'Forms', description: 'Single choice selections' },
          ].map((component, index) => (
            <div key={index} className="component-card">
              <div className="component-category">{component.category}</div>
              <h3>
                <a href={`/components/${component.name.toLowerCase()}`}>
                  {component.name}
                </a>
              </h3>
              <p>{component.description}</p>
              <div className="component-actions">
                <a href={`/components/${component.name.toLowerCase()}`} className="view-docs">
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
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--elevate-color-text-primary, #1a1a1a);
        }

        .page-header p {
          font-size: 1.125rem;
          color: var(--elevate-color-text-secondary, #4a4a4a);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .components-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .component-card {
          background: var(--elevate-color-background-primary, #ffffff);
          border: 1px solid var(--elevate-color-border-light, #e9ecef);
          border-radius: 0.5rem;
          padding: 1.5rem;
          transition: all 0.2s ease;
        }

        .component-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-color: var(--elevate-color-border-hover, #cbd5e0);
        }

        .component-category {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--elevate-color-primary, #0066cc);
          margin-bottom: 0.5rem;
        }

        .component-card h3 {
          margin-bottom: 0.75rem;
        }

        .component-card h3 a {
          color: var(--elevate-color-text-primary, #1a1a1a);
          text-decoration: none;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .component-card h3 a:hover {
          color: var(--elevate-color-primary, #0066cc);
        }

        .component-card p {
          color: var(--elevate-color-text-secondary, #4a4a4a);
          line-height: 1.5;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }

        .component-actions {
          margin-top: auto;
          padding-top: 1rem;
        }

        .view-docs {
          color: var(--elevate-color-primary, #0066cc);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.875rem;
        }

        .view-docs:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .components-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default ComponentsPage