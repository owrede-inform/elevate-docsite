import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const GuidesPage: React.FC = () => {
  const { role, guide } = useParams()

  // Guide structure by role
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

  // If viewing a specific guide
  if (role && guide) {
    const roleData = guidesByRole[role as keyof typeof guidesByRole]
    const guideData = roleData?.guides.find(g => g.id === guide)

    if (!roleData || !guideData) {
      return (
        <div className="guide-not-found">
          <div className="container">
            <h1>Guide not found</h1>
            <p>The guide "{guide}" for {role} could not be found.</p>
            <Link to="/guides">← Back to Guides</Link>
          </div>
        </div>
      )
    }

    return (
      <div className="guide-detail-page">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/guides">Guides</Link>
            <span> / </span>
            <Link to={`/guides/${role}`}>{roleData.title}</Link>
            <span> / </span>
            <span>{guideData.title}</span>
          </div>
          
          <header className="guide-header">
            <h1>{guideData.title}</h1>
            <p>{guideData.description}</p>
          </header>
          
          <div className="guide-content">
            <div className="placeholder-notice">
              <h3>📝 Guide Content Coming Soon</h3>
              <p>
                This guide's content will be loaded from MDX files in the 
                <code>/src/content/guides/{role}/</code> directory.
              </p>
              <p>Each guide will include:</p>
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
      </div>
    )
  }

  // If viewing a specific role
  if (role) {
    const roleData = guidesByRole[role as keyof typeof guidesByRole]

    if (!roleData) {
      return (
        <div className="role-not-found">
          <div className="container">
            <h1>Role not found</h1>
            <p>Guides for "{role}" could not be found.</p>
            <Link to="/guides">← Back to Guides</Link>
          </div>
        </div>
      )
    }

    return (
      <div className="role-guides-page">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/guides">Guides</Link>
            <span> / </span>
            <span>{roleData.title}</span>
          </div>
          
          <header className="role-header">
            <div className="role-icon">{roleData.icon}</div>
            <h1>{roleData.title}</h1>
            <p>{roleData.description}</p>
          </header>

          <div className="guides-grid">
            {roleData.guides.map(guide => (
              <div key={guide.id} className="guide-card">
                <h3>
                  <Link to={`/guides/${role}/${guide.id}`}>
                    {guide.title}
                  </Link>
                </h3>
                <p>{guide.description}</p>
                <Link to={`/guides/${role}/${guide.id}`} className="read-guide">
                  Read Guide →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Main guides page
  return (
    <div className="guides-page">
      <div className="container">
        <header className="page-header">
          <h1>Guides</h1>
          <p>
            Role-based guidance for designers, developers, and product managers. 
            Choose your role to see relevant documentation and best practices.
          </p>
        </header>

        <div className="roles-grid">
          {Object.entries(guidesByRole).map(([roleKey, roleData]) => (
            <div key={roleKey} className="role-card">
              <div className="role-card-header">
                <div className="role-icon">{roleData.icon}</div>
                <h2>
                  <Link to={`/guides/${roleKey}`}>
                    {roleData.title}
                  </Link>
                </h2>
              </div>
              <p className="role-description">{roleData.description}</p>
              
              <div className="guide-list">
                <h4>Available Guides:</h4>
                <ul>
                  {roleData.guides.slice(0, 4).map(guide => (
                    <li key={guide.id}>
                      <Link to={`/guides/${roleKey}/${guide.id}`}>
                        {guide.title}
                      </Link>
                    </li>
                  ))}
                  {roleData.guides.length > 4 && (
                    <li className="more-guides">
                      <Link to={`/guides/${roleKey}`}>
                        +{roleData.guides.length - 4} more guides
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="role-actions">
                <Link to={`/guides/${roleKey}`} className="view-all-guides">
                  View All Guides →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick start section */}
        <section className="quick-start-section">
          <h2>Quick Start</h2>
          <div className="quick-start-grid">
            <div className="quick-start-card">
              <h3>New to ELEVATE?</h3>
              <p>Start with our comprehensive overview and installation guide.</p>
              <Link to="/guides/getting-started" className="quick-start-link">
                Getting Started →
              </Link>
            </div>
            <div className="quick-start-card">
              <h3>Ready to Build?</h3>
              <p>Jump into component documentation and implementation examples.</p>
              <Link to="/components" className="quick-start-link">
                Browse Components →
              </Link>
            </div>
            <div className="quick-start-card">
              <h3>Need Patterns?</h3>
              <p>Explore reusable patterns and code examples for common use cases.</p>
              <Link to="/patterns" className="quick-start-link">
                View Patterns →
              </Link>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .guides-page,
        .role-guides-page,
        .guide-detail-page {
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

        .page-header,
        .role-header,
        .guide-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .page-header h1,
        .role-header h1,
        .guide-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--elevate-color-text-primary, #1a1a1a);
        }

        .page-header p,
        .role-header p,
        .guide-header p {
          font-size: 1.125rem;
          color: var(--elevate-color-text-secondary, #4a4a4a);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .role-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .roles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .role-card {
          background: var(--elevate-color-background-primary, #ffffff);
          border: 1px solid var(--elevate-color-border-light, #e9ecef);
          border-radius: 0.5rem;
          padding: 2rem;
          transition: all 0.2s ease;
        }

        .role-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .role-card-header {
          margin-bottom: 1rem;
        }

        .role-card h2 a {
          color: var(--elevate-color-text-primary, #1a1a1a);
          text-decoration: none;
          font-size: 1.5rem;
        }

        .role-card h2 a:hover {
          color: var(--elevate-color-primary, #0066cc);
        }

        .role-description {
          margin-bottom: 1.5rem;
          color: var(--elevate-color-text-secondary, #4a4a4a);
          line-height: 1.6;
        }

        .guide-list h4 {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--elevate-color-text-secondary, #6c757d);
          margin-bottom: 0.75rem;
        }

        .guide-list ul {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem 0;
        }

        .guide-list li {
          margin-bottom: 0.5rem;
        }

        .guide-list a {
          color: var(--elevate-color-primary, #0066cc);
          text-decoration: none;
          font-size: 0.875rem;
        }

        .guide-list a:hover {
          text-decoration: underline;
        }

        .more-guides a {
          color: var(--elevate-color-text-secondary, #6c757d);
          font-style: italic;
        }

        .role-actions {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid var(--elevate-color-border-light, #e9ecef);
        }

        .view-all-guides {
          color: var(--elevate-color-primary, #0066cc);
          text-decoration: none;
          font-weight: 600;
        }

        .view-all-guides:hover {
          text-decoration: underline;
        }

        .guides-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .guide-card {
          background: var(--elevate-color-background-primary, #ffffff);
          border: 1px solid var(--elevate-color-border-light, #e9ecef);
          border-radius: 0.5rem;
          padding: 1.5rem;
          transition: all 0.2s ease;
        }

        .guide-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .guide-card h3 {
          margin-bottom: 0.75rem;
        }

        .guide-card h3 a {
          color: var(--elevate-color-text-primary, #1a1a1a);
          text-decoration: none;
          font-size: 1.25rem;
        }

        .guide-card h3 a:hover {
          color: var(--elevate-color-primary, #0066cc);
        }

        .guide-card p {
          color: var(--elevate-color-text-secondary, #4a4a4a);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .read-guide {
          color: var(--elevate-color-primary, #0066cc);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.875rem;
        }

        .read-guide:hover {
          text-decoration: underline;
        }

        .quick-start-section {
          padding: 3rem 0;
          border-top: 1px solid var(--elevate-color-border-light, #e9ecef);
        }

        .quick-start-section h2 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: var(--elevate-color-text-primary, #1a1a1a);
        }

        .quick-start-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .quick-start-card {
          background: var(--elevate-color-background-secondary, #f8f9fa);
          border: 1px solid var(--elevate-color-border-light, #e9ecef);
          border-radius: 0.5rem;
          padding: 1.5rem;
          text-align: center;
        }

        .quick-start-card h3 {
          margin-bottom: 0.75rem;
          color: var(--elevate-color-text-primary, #1a1a1a);
        }

        .quick-start-card p {
          color: var(--elevate-color-text-secondary, #4a4a4a);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .quick-start-link {
          color: var(--elevate-color-primary, #0066cc);
          text-decoration: none;
          font-weight: 600;
        }

        .quick-start-link:hover {
          text-decoration: underline;
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

        .placeholder-notice ul {
          text-align: left;
          max-width: 600px;
          margin: 0 auto;
        }

        .placeholder-notice code {
          background: var(--elevate-color-background-primary, #ffffff);
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .roles-grid,
          .guides-grid,
          .quick-start-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default GuidesPage