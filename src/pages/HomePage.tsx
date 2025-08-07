import React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              ELEVATE Design System
            </h1>
            <p className="hero-subtitle">
              Comprehensive documentation, components, and patterns for building exceptional user experiences with the ELEVATE Design System by INFORM.
            </p>
            <div className="hero-actions">
              <Link to="/components" className="btn btn-primary">
                Explore Components
              </Link>
              <Link to="/guides" className="btn btn-secondary">
                View Guides
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="features">
          <h2 className="features-title">Built for Everyone</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>For Designers</h3>
              <p>
                Visual guidelines, design tokens, and usage principles for creating cohesive user interfaces. 
                Access color palettes, typography scales, and spacing systems.
              </p>
              <Link to="/guides/designers" className="feature-link">
                Design Guidelines →
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>For Developers</h3>
              <p>
                Component APIs, implementation guides, and code examples for integrating ELEVATE components. 
                TypeScript support and comprehensive documentation.
              </p>
              <Link to="/guides/developers" className="feature-link">
                Implementation Docs →
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>For Product Managers</h3>
              <p>
                Best practices, business impact, and strategic guidance for design system adoption. 
                ROI metrics and team collaboration workflows.
              </p>
              <Link to="/guides/product-managers" className="feature-link">
                Strategy Guide →
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="quick-start">
          <div className="quick-start-content">
            <div className="quick-start-text">
              <h2>Get Started in Minutes</h2>
              <p>
                Install the ELEVATE components and start building with our comprehensive design system.
                Everything you need is documented and ready to use.
              </p>
              <Link to="/guides/getting-started" className="btn btn-primary">
                Quick Start Guide
              </Link>
            </div>
            <div className="quick-start-code">
              <div className="code-block">
                <div className="code-header">
                  <span>Terminal</span>
                </div>
                <pre><code>{`npm install @inform-design/elevate-core-ui
npm install @inform-design/elevate-design-tokens
npm install @inform-design/elevate-icons`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="stats">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Components</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Patterns</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">User Roles</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">TypeScript</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </section>

        {/* Features List */}
        <section className="features-detailed">
          <h2>What's Included</h2>
          <div className="features-list">
            <div className="features-column">
              <h3>Components & Patterns</h3>
              <ul>
                <li>✅ 50+ Production-ready components</li>
                <li>✅ Interactive code examples</li>
                <li>✅ Copy-paste patterns</li>
                <li>✅ Accessibility built-in</li>
                <li>✅ Responsive design</li>
              </ul>
            </div>
            <div className="features-column">
              <h3>Developer Experience</h3>
              <ul>
                <li>✅ TypeScript definitions</li>
                <li>✅ Live code previews</li>
                <li>✅ GitHub issue integration</li>
                <li>✅ Search functionality</li>
                <li>✅ Mobile-optimized</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .home-page {
          padding: 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        /* Hero Section */
        .hero {
          padding: 4rem 0 6rem 0;
          text-align: center;
          background: linear-gradient(135deg, 
            var(--elevate-color-background-primary, #ffffff) 0%,
            var(--elevate-color-background-secondary, #f8f9fa) 100%);
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--elevate-color-text-primary, #1a1a1a);
          line-height: 1.1;
        }

        .hero-subtitle {
          font-size: 1.375rem;
          color: var(--elevate-color-text-secondary, #4a4a4a);
          margin-bottom: 2.5rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.5;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-block;
          padding: 0.875rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
          border: 2px solid transparent;
        }

        .btn-primary {
          background: var(--elevate-color-primary, #0066cc);
          color: white;
        }

        .btn-primary:hover {
          background: var(--elevate-color-primary-hover, #0052a3);
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: transparent;
          color: var(--elevate-color-primary, #0066cc);
          border-color: var(--elevate-color-primary, #0066cc);
        }

        .btn-secondary:hover {
          background: var(--elevate-color-primary, #0066cc);
          color: white;
          transform: translateY(-1px);
        }

        /* Features Section */
        .features {
          padding: 4rem 0;
        }

        .features-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: var(--elevate-color-text-primary, #1a1a1a);
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          padding: 2rem;
          background: var(--elevate-color-background-primary, #ffffff);
          border: 1px solid var(--elevate-color-border-light, #e9ecef);
          border-radius: 0.75rem;
          text-align: center;
          transition: all 0.2s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border-color: var(--elevate-color-border-hover, #cbd5e0);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--elevate-color-text-primary, #1a1a1a);
        }

        .feature-card p {
          color: var(--elevate-color-text-secondary, #4a4a4a);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .feature-link {
          color: var(--elevate-color-primary, #0066cc);
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
        }

        .feature-link:hover {
          text-decoration: underline;
        }

        /* Quick Start Section */
        .quick-start {
          padding: 4rem 0;
          background: var(--elevate-color-background-secondary, #f8f9fa);
        }

        .quick-start-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .quick-start-text h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--elevate-color-text-primary, #1a1a1a);
        }

        .quick-start-text p {
          font-size: 1.125rem;
          color: var(--elevate-color-text-secondary, #4a4a4a);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .code-block {
          background: var(--elevate-color-text-primary, #1a1a1a);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .code-header {
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .code-block pre {
          margin: 0;
          padding: 1.5rem;
          background: none;
          border: none;
          overflow-x: auto;
        }

        .code-block code {
          color: #61dafb;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        /* Stats Section */
        .stats {
          padding: 3rem 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .stat-item {
          text-align: center;
          padding: 1.5rem;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--elevate-color-primary, #0066cc);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--elevate-color-text-secondary, #4a4a4a);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.875rem;
        }

        /* Features Detailed */
        .features-detailed {
          padding: 4rem 0;
          border-top: 1px solid var(--elevate-color-border-light, #e9ecef);
        }

        .features-detailed h2 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 3rem;
          color: var(--elevate-color-text-primary, #1a1a1a);
        }

        .features-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 3rem;
        }

        .features-column h3 {
          font-size: 1.375rem;
          margin-bottom: 1.5rem;
          color: var(--elevate-color-text-primary, #1a1a1a);
        }

        .features-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .features-column li {
          padding: 0.5rem 0;
          color: var(--elevate-color-text-secondary, #4a4a4a);
          font-size: 1.125rem;
          line-height: 1.5;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero {
            padding: 3rem 0 4rem 0;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.125rem;
          }
          
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 100%;
            max-width: 300px;
          }
          
          .feature-grid {
            grid-template-columns: 1fr;
          }
          
          .quick-start-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .features-list {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  )
}

export default HomePage