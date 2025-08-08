import React, { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Navigation, Container } from '@/components/react'
import type { NavigationData } from '@/components/react'
import { createPath } from '@/lib/path-utils'
import { loadNavigationConfig } from '@/lib/navigation-config'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const [userRole, setUserRole] = useState<'designer' | 'developer' | 'product-manager' | undefined>(undefined)

  // Load navigation configuration from YAML-based config
  const baseNavigationData = useMemo(() => loadNavigationConfig(), [])
  
  // Create final navigation data with user role
  const navigationData: NavigationData = useMemo(() => ({
    ...baseNavigationData,
    userRole
  }), [baseNavigationData, userRole])

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
        <Container size="xl">
          {children}
        </Container>
      </main>
      
      <footer className="site-footer">
        <Container size="xl">
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
                <li><a href={createPath('/components')}>Components</a></li>
                <li><a href={createPath('/patterns')}>Patterns</a></li>
                <li><a href={createPath('/guides')}>Guides</a></li>
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
                <li><a href={createPath('/guides/designers')}>For Designers</a></li>
                <li><a href={createPath('/guides/developers')}>For Developers</a></li>
                <li><a href={createPath('/guides/product-managers')}>For Product Managers</a></li>
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
        </Container>
      </footer>
      
      <style jsx>{`
        .app-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
          padding: var(--elevate-spacing-xl, 2rem) 0;
          background: var(--elevate-color-background-primary, #ffffff);
        }

        .site-footer {
          background: var(--elevate-color-background-secondary, #f8f9fa);
          border-top: 1px solid var(--elevate-color-border-light, #e9ecef);
          padding: var(--elevate-spacing-2xl, 3rem) 0 var(--elevate-spacing-md, 1rem) 0;
          margin-top: auto;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--elevate-spacing-xl, 2rem);
          margin-bottom: var(--elevate-spacing-xl, 2rem);
        }

        .footer-section h3 {
          color: var(--elevate-color-primary, #0066cc);
          margin-bottom: var(--elevate-spacing-md, 1rem);
          font-size: var(--elevate-font-size-xl, 1.25rem);
          font-weight: var(--elevate-font-weight-semibold, 600);
          font-family: var(--elevate-font-family-primary);
        }

        .footer-section h4 {
          color: var(--elevate-color-text-primary, #1a1a1a);
          margin-bottom: var(--elevate-spacing-sm, 0.75rem);
          font-size: var(--elevate-font-size-base, 1rem);
          font-weight: var(--elevate-font-weight-semibold, 600);
          font-family: var(--elevate-font-family-primary);
        }

        .footer-section p {
          color: var(--elevate-color-text-secondary, #4a4a4a);
          line-height: var(--elevate-line-height-relaxed, 1.6);
          margin-bottom: var(--elevate-spacing-md, 1rem);
          font-family: var(--elevate-font-family-primary);
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-section ul li {
          margin-bottom: var(--elevate-spacing-sm, 0.5rem);
        }

        .footer-section ul li a {
          color: var(--elevate-color-text-secondary, #4a4a4a);
          text-decoration: none;
          transition: color 0.2s ease;
          font-family: var(--elevate-font-family-primary);
        }

        .footer-section ul li a:hover {
          color: var(--elevate-color-primary, #0066cc);
          text-decoration: underline;
        }

        .footer-bottom {
          padding-top: var(--elevate-spacing-xl, 2rem);
          border-top: 1px solid var(--elevate-color-border-light, #e9ecef);
          text-align: center;
          color: var(--elevate-color-text-secondary, #4a4a4a);
        }

        .footer-bottom p {
          margin: var(--elevate-spacing-xs, 0.25rem) 0;
          font-family: var(--elevate-font-family-primary);
        }

        .footer-bottom small {
          font-size: var(--elevate-font-size-sm, 0.875rem);
          font-family: var(--elevate-font-family-primary);
        }

        @media (max-width: 768px) {
          .main-content {
            padding: var(--elevate-spacing-md, 1rem) 0;
          }
          
          .site-footer {
            padding: var(--elevate-spacing-xl, 2rem) 0 var(--elevate-spacing-md, 1rem) 0;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
            gap: var(--elevate-spacing-lg, 1.5rem);
          }
        }
      `}</style>
    </div>
  )
}

export default Layout