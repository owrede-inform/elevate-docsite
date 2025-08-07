import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1>Page Not Found</h1>
          <p>
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          
          <div className="suggestions">
            <h2>Try these instead:</h2>
            <div className="suggestions-grid">
              <div className="suggestion-card">
                <h3>🧩 Components</h3>
                <p>Browse the complete ELEVATE component library</p>
                <Link to="/components" className="suggestion-link">
                  View Components →
                </Link>
              </div>
              
              <div className="suggestion-card">
                <h3>📐 Patterns</h3>
                <p>Discover reusable patterns and code examples</p>
                <Link to="/patterns" className="suggestion-link">
                  View Patterns →
                </Link>
              </div>
              
              <div className="suggestion-card">
                <h3>📚 Guides</h3>
                <p>Learn best practices for your role</p>
                <Link to="/guides" className="suggestion-link">
                  View Guides →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="actions">
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="btn btn-secondary"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .not-found-page {
          padding: 4rem 0;
          min-height: 60vh;
          display: flex;
          align-items: center;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .not-found-content {
          text-align: center;
        }

        .error-code {
          font-size: 8rem;
          font-weight: 700;
          color: var(--elevate-color-primary, #0066cc);
          line-height: 1;
          margin-bottom: 1rem;
          opacity: 0.8;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--elevate-color-text-primary, #1a1a1a);
        }

        .not-found-content > p {
          font-size: 1.125rem;
          color: var(--elevate-color-text-secondary, #4a4a4a);
          line-height: 1.6;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .suggestions {
          margin-bottom: 3rem;
        }

        .suggestions h2 {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          color: var(--elevate-color-text-primary, #1a1a1a);
        }

        .suggestions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .suggestion-card {
          background: var(--elevate-color-background-primary, #ffffff);
          border: 1px solid var(--elevate-color-border-light, #e9ecef);
          border-radius: 0.5rem;
          padding: 1.5rem;
          transition: all 0.2s ease;
        }

        .suggestion-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-color: var(--elevate-color-border-hover, #cbd5e0);
        }

        .suggestion-card h3 {
          font-size: 1.125rem;
          margin-bottom: 0.75rem;
          color: var(--elevate-color-text-primary, #1a1a1a);
        }

        .suggestion-card p {
          color: var(--elevate-color-text-secondary, #4a4a4a);
          line-height: 1.5;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }

        .suggestion-link {
          color: var(--elevate-color-primary, #0066cc);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .suggestion-link:hover {
          text-decoration: underline;
        }

        .actions {
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
          cursor: pointer;
          background: none;
          font-family: inherit;
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

        /* Responsive design */
        @media (max-width: 768px) {
          .error-code {
            font-size: 6rem;
          }
          
          h1 {
            font-size: 2rem;
          }
          
          .not-found-content > p {
            font-size: 1rem;
          }
          
          .suggestions-grid {
            grid-template-columns: 1fr;
          }
          
          .actions {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 100%;
            max-width: 300px;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .suggestion-card {
            border-width: 2px;
          }
          
          .btn {
            border-width: 2px;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .suggestion-card {
            transition: none;
          }
          
          .btn {
            transition: none;
          }
          
          .suggestion-card:hover,
          .btn:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}

export default NotFoundPage