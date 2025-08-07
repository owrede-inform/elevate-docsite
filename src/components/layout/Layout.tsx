import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Navigation } from '@/components/react'
import type { NavigationData } from '@/components/react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const [userRole, setUserRole] = useState<'designer' | 'developer' | 'product-manager' | undefined>(undefined)

  // Navigation configuration
  const navigationData: NavigationData = {
    primary: [
      {
        label: 'Components',
        href: '/components',
        icon: '🧩',
      },
      {
        label: 'Patterns',
        href: '/patterns', 
        icon: '📐',
      },
      {
        label: 'Guides',
        href: '/guides',
        icon: '📚',
      },
    ],
    secondary: [
      {
        label: 'Getting Started',
        href: '/guides/getting-started',
        role: ['designer', 'developer', 'product-manager'],
      },
      {
        label: 'Design Principles',
        href: '/guides/design-principles',
        role: ['designer'],
      },
      {
        label: 'Implementation',
        href: '/guides/implementation',
        role: ['developer'],
      },
      {
        label: 'Best Practices',
        href: '/guides/best-practices',
        role: ['product-manager'],
      },
    ],
    userRole
  }

  const handleRoleChange = (role: string) => {
    const newRole = role === 'all' ? undefined : role as typeof userRole
    setUserRole(newRole)
    
    // Store preference in localStorage
    if (newRole) {
      localStorage.setItem('elevate-user-role', newRole)
    } else {
      localStorage.removeItem('elevate-user-role')
    }
  }

  // Load saved role preference
  useEffect(() => {
    const savedRole = localStorage.getItem('elevate-user-role')
    if (savedRole && ['designer', 'developer', 'product-manager'].includes(savedRole)) {
      setUserRole(savedRole as typeof userRole)
    }
  }, [])

  return (
    <div className="app-layout">
      <Navigation
        navigation={navigationData}
        currentPath={location.pathname}
        onRoleChange={handleRoleChange}
      />
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>ELEVATE Design System</h3>
              <p>
                Comprehensive design system documentation for building exceptional user experiences.
              </p>
            </div>
            
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="/components">Components</a></li>
                <li><a href="/patterns">Patterns</a></li>
                <li><a href="/guides">Guides</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Community</h4>
              <ul>
                <li>
                  <a 
                    href="https://github.com/owrede-inform/elevate-docsite" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/owrede-inform/elevate-docsite/issues" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Report Issues
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Role-Based Guides</h4>
              <ul>
                <li><a href="/guides/designers">For Designers</a></li>
                <li><a href="/guides/developers">For Developers</a></li>
                <li><a href="/guides/product-managers">For Product Managers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>Built with ❤️ by INFORM for the ELEVATE Design System</p>
            <p>
              <small>
                Version 1.0.0 • Last updated: {new Date().toLocaleDateString()}
              </small>
            </p>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        .app-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
          padding: 2rem 0;
          background: var(--elevate-color-background-primary, #ffffff);
        }

        .site-footer {
          background: var(--elevate-color-background-secondary, #f8f9fa);
          border-top: 1px solid var(--elevate-color-border-light, #e9ecef);
          padding: 3rem 0 1rem 0;
          margin-top: auto;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section h3 {
          color: var(--elevate-color-primary, #0066cc);
          margin-bottom: 1rem;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .footer-section h4 {
          color: var(--elevate-color-text-primary, #1a1a1a);
          margin-bottom: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .footer-section p {
          color: var(--elevate-color-text-secondary, #4a4a4a);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-section ul li {
          margin-bottom: 0.5rem;
        }

        .footer-section ul li a {
          color: var(--elevate-color-text-secondary, #4a4a4a);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-section ul li a:hover {
          color: var(--elevate-color-primary, #0066cc);
          text-decoration: underline;
        }

        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid var(--elevate-color-border-light, #e9ecef);
          text-align: center;
          color: var(--elevate-color-text-secondary, #4a4a4a);
        }

        .footer-bottom p {
          margin: 0.25rem 0;
        }

        .footer-bottom small {
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .main-content {
            padding: 1rem 0;
          }
          
          .site-footer {
            padding: 2rem 0 1rem 0;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .container {
            padding: 0 0.75rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Layout