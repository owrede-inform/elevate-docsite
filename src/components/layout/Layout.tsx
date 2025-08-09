import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import EsdsTreeSidebar from '../navigation/EsdsTreeSidebar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [userRole, setUserRole] = useState<'designer' | 'developer' | 'product-manager' | undefined>(undefined)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const sidebarRef = useRef<any>(null)

  // Update sidebar collapsed state when it changes
  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.collapsed = sidebarCollapsed;
    }
  }, [sidebarCollapsed]);

  // Add event listener for sidebar navigation
  useEffect(() => {
    const handleSidebarNav = (event: any) => handleSidebarNavigation(event);
    document.addEventListener('navigate', handleSidebarNav);
    return () => document.removeEventListener('navigate', handleSidebarNav);
  }, [isMobile]);

  // Navigation items for top navigation
  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Getting Started', href: '/getting-started' },
    { label: 'Components', href: '/components' },
    { label: 'Patterns', href: '/patterns' },
    { label: 'Design Tokens', href: '/tokens' },
    { label: 'Resources', href: '/resources/downloads' },
  ]

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'designer', label: 'Designer' },
    { value: 'developer', label: 'Developer' },
    { value: 'product-manager', label: 'Product Manager' },
  ]

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
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

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    
    // Apply theme to document
    if (newDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('elevate-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('elevate-theme', 'light')
    }
  }

  // Load saved role preference and handle responsive behavior
  useEffect(() => {
    const savedRole = localStorage.getItem('elevate-user-role')
    if (savedRole && ['designer', 'developer', 'product-manager'].includes(savedRole)) {
      setUserRole(savedRole as typeof userRole)
    }

    // Load saved theme preference
    const savedTheme = localStorage.getItem('elevate-theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.setAttribute('data-theme', 'light')
    }

    // Handle responsive sidebar behavior
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      
      if (mobile) {
        setSidebarCollapsed(true)
      } else {
        setSidebarCollapsed(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle sidebar navigation
  const handleSidebarNavigation = (event: any) => {
    const href = event.detail?.href
    if (href) {
      navigate(href)
      if (isMobile) {
        setSidebarCollapsed(true)
      }
    }
  }

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
    setIsMobileMenuOpen(false)
  }

  // Close sidebar when clicking overlay on mobile
  const closeSidebarOverlay = () => {
    if (isMobile && !sidebarCollapsed) {
      setSidebarCollapsed(true)
    }
  }

  return (
    <div className="app-layout">
      <elvt-application>
        <elvt-toolbar slot="header" border="end">
          <elvt-stack slot="start" gap="0">
            {/* INFORM + ELEVATE Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={(import.meta as any).env?.BASE_URL ? `${(import.meta as any).env.BASE_URL}data/images/inform-brand.svg` : '/data/images/inform-brand.svg'}
                alt="INFORM"
                style={{ height: '1rem', width: 'auto' }}
              />
              <h2 style={{ margin: 0, fontSize: '18px', color: 'var(--elevate-color-text-primary)', fontWeight: 'normal' }}>
                <strong>ELEVATE</strong> Design System
              </h2>
            </Link>
          </elvt-stack>
          
          {/* Navigation Menu for larger screens - removed per requirement */}
          <div className="desktop-nav" style={{ display: 'none' }} />
          
          <elvt-stack slot="end" gap="s">
            {/* Sidebar Toggle (Tablet/Mobile) */}
            <elvt-icon-button 
              className="sidebar-toggle-button"
              size="medium" 
              label="Toggle Sidebar"
              icon="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
              onClick={toggleSidebar}
            />
            
            {/* Role Selector */}
            <elvt-select 
              name="user-role" 
              value={userRole || 'all'}
              size="small"
              placeholder="All Roles"
              style={{ minWidth: '120px' }}
              options={roleOptions}
              onInput={(e: any) => handleRoleChange(e.target.value)}
            />
            
            {/* Dark Mode Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <elvt-icon-button 
                size="small" 
                label="Light Mode"
                icon="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"
                style={{ opacity: isDarkMode ? '0.5' : '1' }}
              />
              <elvt-switch 
                checked={isDarkMode}
                size="small"
                hideLabel={true}
                onInput={(e: any) => toggleDarkMode()}
                style={{ margin: '0' }}
              />
              <elvt-icon-button 
                size="small" 
                label="Dark Mode"
                icon="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.4 6.35,17.41C9.37,20.43 14,20.54 17.33,17.97Z"
                style={{ opacity: isDarkMode ? '1' : '0.5' }}
              />
            </div>
            
            {/* GitHub Link */}
            <elvt-icon-button 
              size="medium" 
              label="View on GitHub"
              icon="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
              onClick={() => window.open('https://github.com/owrede-inform/elevate-docsite', '_blank')}
            />
          </elvt-stack>
        </elvt-toolbar>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-overlay">
            <elvt-stack gap="s" padding="l">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    color: isActive(item.href) ? 'var(--elevate-color-primary)' : 'var(--elevate-color-text-primary)',
                    backgroundColor: isActive(item.href) ? 'var(--elevate-color-primary-light)' : 'transparent',
                    fontWeight: isActive(item.href) ? '600' : '500',
                    display: 'block'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </elvt-stack>
          </div>
        )}
        
        {/* Main Content Area with Sidebar */}
        <div className="app-body">
          {/* Sidebar Navigation */}
          <div className={`sidebar-container ${sidebarCollapsed ? 'collapsed' : ''}`}>
            {/* Use ESDS Tree Sidebar */}
            <EsdsTreeSidebar 
              sections={[
                {
                  title: 'Getting Started',
                  pages: [
                    { title: 'Introduction', path: '/guides/introduction' },
                    { title: 'Installation', path: '/guides/installation' },
                    { title: 'Quick Start', path: '/guides/quick-start' }
                  ]
                },
                {
                  title: 'Components',
                  pages: [
                    { title: 'Button', path: '/components/button' },
                    { title: 'Input', path: '/components/input' },
                    { title: 'Card', path: '/components/card' }
                  ]
                },
                {
                  title: 'Design Tokens',
                  pages: [
                    { title: 'Colors', path: '/tokens/colors' },
                    { title: 'Typography', path: '/tokens/typography' },
                    { title: 'Spacing', path: '/tokens/spacing' }
                  ]
                },
                {
                  title: 'Patterns',
                  pages: [
                    { title: 'Form Layouts', path: '/patterns/forms' },
                    { title: 'Navigation', path: '/patterns/navigation' }
                  ]
                }
              ]}
              className={sidebarCollapsed ? 'sidebar-collapsed' : ''}
            />
          </div>
          
          {/* Mobile Overlay */}
          {isMobile && !sidebarCollapsed && (
            <div className="sidebar-overlay" onClick={closeSidebarOverlay} />
          )}
          
          {/* Main Content */}
          <main className="main-content">
            {children}
          </main>
        </div>
      </elvt-application>

      {/* Footer */}
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

      <style>{`
        .app-layout {
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        elvt-application {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .app-body {
          display: flex;
          flex: 1;
          overflow: hidden;
          position: relative;
          height: calc(100vh - 64px); /* Account for toolbar height */
        }

        .sidebar-container {
          flex-shrink: 0;
          width: 280px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 100;
          background: var(--elevate-color-background-primary, #ffffff);
          border-right: 1px solid var(--elevate-color-border-light, #e9ecef);
          height: 100%;
          overflow-y: auto;
        }

        .sidebar-container.collapsed {
          width: 0;
          overflow: hidden;
        }

        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 99;
          opacity: 1;
          visibility: visible;
        }

        .main-content {
          flex: 1;
          overflow-y: auto;
          background: var(--elevate-color-background-primary);
          min-width: 0;
          height: 100%;
        }

        /* Sidebar Toggle Button - only show on tablet and mobile */
        .sidebar-toggle-button {
          display: none !important;
        }
        
        @media (max-width: 1024px) {
          .sidebar-toggle-button {
            display: inline-flex !important;
          }
        }
        
        /* Hide desktop navigation on mobile */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          
          .sidebar-container {
            position: fixed;
            top: 64px;
            left: 0;
            height: calc(100vh - 64px);
            z-index: 1000;
            transform: translateX(-100%);
            box-shadow: var(--elevate-shadow-lg);
            background: var(--elevate-color-background-primary);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .sidebar-container:not(.collapsed) {
            transform: translateX(0);
          }
        }
        
        /* Tablet adjustments */
        @media (max-width: 1024px) and (min-width: 769px) {
          .sidebar-container {
            width: 240px;
          }
          
          .sidebar-container.collapsed {
            width: 0;
          }
        }

        /* Mobile navigation overlay */
        .mobile-nav-overlay {
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          background: var(--elevate-color-background-primary);
          border-bottom: 1px solid var(--elevate-color-border-light);
          box-shadow: var(--elevate-shadow-lg);
          z-index: 1000;
        }

        /* Footer */
        .site-footer {
          background: var(--elevate-color-background-secondary);
          border-top: 1px solid var(--elevate-color-border-light);
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
          color: var(--elevate-color-primary);
          margin-bottom: 1rem;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .footer-section h4 {
          color: var(--elevate-color-text-primary);
          margin-bottom: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .footer-section p {
          color: var(--elevate-color-text-secondary);
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
          color: var(--elevate-color-text-secondary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-section ul li a:hover {
          color: var(--elevate-color-primary);
          text-decoration: underline;
        }

        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid var(--elevate-color-border-light);
          text-align: center;
          color: var(--elevate-color-text-secondary);
        }

        .footer-bottom p {
          margin: 0.25rem 0;
        }

        .footer-bottom small {
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .main-content {
            padding: 0;
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