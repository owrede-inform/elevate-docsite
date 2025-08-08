import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { 
  ElvtApplication, 
  ElvtToolbar, 
  ElvtButton, 
  ElvtIcon,
  ElvtStack,
  ElvtIconButton 
} from '@inform-elevate/elevate-core-ui/dist/react'
import { Container } from '@/components/react'
import EsdsTreeSidebar from '@/components/navigation/EsdsTreeSidebar'
import EsdsThemeToggle from '@/components/esds/EsdsThemeToggle'
import { createPath } from '@/lib/path-utils'
import { loadSidebarNavigationConfig } from '@/lib/sidebar-navigation-config'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Load sidebar navigation configuration
  const navigationSections = loadSidebarNavigationConfig()

  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('esds-theme-dark') ||
                     document.querySelector('elvt-application')?.classList.contains('elvt-theme-dark')
      setIsDarkMode(isDark)
    }

    // Initial check
    checkTheme()

    // Listen for class changes on document root and elvt-application
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    const appElement = document.querySelector('elvt-application')
    if (appElement) {
      observer.observe(appElement, { attributes: true, attributeFilter: ['class'] })
    }

    return () => observer.disconnect()
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  return (
    <ElvtApplication className="elvt-theme-light">
      {/* Header with INFORM logo in top-left */}
      <ElvtToolbar slot="header" border="end">
        <ElvtStack slot="start" gap="0">
          <Link to={createPath('/')} className="header-brand-link">
            <img 
              src={isDarkMode ? "/data/images/inform-brand-dark.svg" : "/data/images/inform-brand.svg"}
              alt="INFORM" 
              className="inform-logo"
            />
            <h2 className="brand-title">
              <strong>ELEVATE</strong> Design System
            </h2>
          </Link>
        </ElvtStack>
        
        <ElvtStack slot="end" gap="sm">
          <EsdsThemeToggle size="medium" />
          <ElvtIconButton 
            size="medium"
            label="GitHub Repository"
            icon="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
          />
          <ElvtIconButton 
            className="mobile-menu-toggle"
            size="medium"
            label="Menu"
            icon="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
          />
        </ElvtStack>
      </ElvtToolbar>

      {/* ESDS Sidebar Navigation */}
      <div slot="side-start">
        <EsdsTreeSidebar 
          sections={navigationSections}
          className={sidebarOpen ? 'sidebar-open' : ''}
        />
      </div>

      {/* Main Content */}
      <main className="main-content">
        <Container size="xl">
          {children}
        </Container>
      </main>

      {/* Footer */}
      <div slot="footer">
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
                  <li><a href={createPath('/tokens')}>Design Tokens</a></li>
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
      </div>
      
      <style>{`
        /* ApplicationShell styling */
        elvt-application {
          min-height: 100vh;
        }

        /* Header Brand Styling */
        .header-brand-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: var(--esds-color-text-primary);
          transition: all var(--esds-transition-normal);
        }

        .header-brand-link:hover {
          opacity: 0.8;
        }

        .inform-logo {
          height: 1rem;
          display: inline-block;
          margin-right: 0.5rem;
          transition: all var(--esds-transition-normal);
        }

        .brand-title {
          margin: 0;
          font-size: 18px;
          color: var(--esds-color-text-primary);
          transition: color var(--esds-transition-normal);
        }

        /* Header styling */
        .header-left {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .header-center {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: var(--elevate-spacing-sm, 0.5rem);
          flex: 1;
          justify-content: flex-end;
        }

        .inform-logo {
          display: flex;
          align-items: center;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: var(--elevate-spacing-md, 1rem);
          text-decoration: none;
          color: var(--elevate-color-text-primary, #1a1a1a);
        }

        .inform-logo-img {
          height: 32px;
          width: auto;
        }

        .app-title {
          font-size: var(--elevate-font-size-lg, 1.125rem);
          font-weight: var(--elevate-font-weight-semibold, 600);
          font-family: var(--elevate-font-family-primary);
        }

        .button-text {
          margin-left: var(--elevate-spacing-xs, 0.25rem);
        }

        .mobile-menu-toggle {
          display: none;
        }

        .header-title {
          flex: 1;
          text-align: center;
        }

        .header-logo {
          text-decoration: none;
          color: var(--elevate-color-primary, #0066cc);
        }

        .header-logo h1 {
          margin: 0;
          font-size: var(--elevate-font-size-xl, 1.25rem);
          font-weight: var(--elevate-font-weight-semibold, 600);
          font-family: var(--elevate-font-family-primary);
        }

        .header-actions {
          display: flex;
          gap: var(--elevate-spacing-sm, 0.5rem);
          align-items: center;
        }

        /* Main content styling */
        .main-content {
          padding: var(--elevate-spacing-xl, 2rem) 0;
          background: var(--elevate-color-background-primary, #ffffff);
          min-height: calc(100vh - 120px);
        }

        /* Footer styling */
        .site-footer {
          background: var(--elevate-color-background-secondary, #f8f9fa);
          border-top: 1px solid var(--elevate-color-border-light, #e9ecef);
          padding: var(--elevate-spacing-2xl, 3rem) 0 var(--elevate-spacing-md, 1rem) 0;
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

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block;
          }

          .header-title {
            text-align: left;
            margin-left: var(--elevate-spacing-md, 1rem);
          }

          .header-actions {
            display: none;
          }
          
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

        /* Mobile overlay for sidebar */
        @media (max-width: 768px) {
          elvt-application::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }

          elvt-application:has(.sidebar-open)::before {
            opacity: 1;
            visibility: visible;
          }
        }
      `}</style>
    </ElvtApplication>
  )
}

export default Layout