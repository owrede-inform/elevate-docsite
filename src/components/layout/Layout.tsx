import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import EsdsTreeSidebar from '../navigation/EsdsTreeSidebar'
import EsdsProductSwitcher from '../navigation/EsdsProductSwitcher'
import { MDI_ICON_REGISTRY } from '@/utils/icons'
import { getTreeSidebarSections } from '@/lib/navigation-yaml-loader'

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
    
    const theme = newDarkMode ? 'dark' : 'light'
    const oldTheme = newDarkMode ? 'light' : 'dark'
    
    // Apply ESDS data-theme attribute
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('elevate-theme', theme)
    
    // Update ELEVATE theme classes
    document.documentElement.classList.remove(`elvt-theme-${oldTheme}`)
    document.documentElement.classList.add(`elvt-theme-${theme}`)
    document.body.classList.remove(`elvt-theme-${oldTheme}`)
    document.body.classList.add(`elvt-theme-${theme}`)
  }

  // Load saved role preference and handle responsive behavior
  useEffect(() => {
    const savedRole = localStorage.getItem('elevate-user-role')
    if (savedRole && ['designer', 'developer', 'product-manager'].includes(savedRole)) {
      setUserRole(savedRole as typeof userRole)
    }

    // Load saved theme preference
    const savedTheme = localStorage.getItem('elevate-theme') || 'light'
    const isDark = savedTheme === 'dark'
    setIsDarkMode(isDark)
    
    // Apply theme attributes and classes
    document.documentElement.setAttribute('data-theme', savedTheme)
    document.documentElement.classList.remove('elvt-theme-light', 'elvt-theme-dark')
    document.documentElement.classList.add(`elvt-theme-${savedTheme}`)
    document.body.classList.remove('elvt-theme-light', 'elvt-theme-dark')
    document.body.classList.add(`elvt-theme-${savedTheme}`)

    // Handle responsive sidebar behavior
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024
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


  // Close sidebar when clicking overlay on mobile
  const closeSidebarOverlay = () => {
    if (isMobile && !sidebarCollapsed) {
      setSidebarCollapsed(true)
    }
  }

  // Toggle sidebar on mobile/tablet
  const toggleMobileSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="app-layout">
      <elvt-application>
        <elvt-toolbar slot="header" border="end">
          <elvt-stack slot="start" gap="s">
            {/* Mobile/Tablet Burger Menu */}
            {isMobile && (
              <elvt-icon-button 
                className="mobile-burger-menu"
                size="medium" 
                label="Toggle Menu"
                icon="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
                onClick={toggleMobileSidebar}
              />
            )}
            
            {/* INFORM + ELEVATE Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={`${import.meta.env.BASE_URL || '/'}assets/inform-brand${isDarkMode ? '-dark' : ''}.svg`}
                alt="INFORM"
                style={{ height: '1rem', width: 'auto' }}
              />
              <h2 style={{ margin: 0, fontSize: '18px', color: 'var(--esds-alias-text-heading)', fontWeight: 'normal' }}>
                <strong>ELEVATE</strong>{isMobile ? '' : ' Design System'}
              </h2>
            </Link>
            
            {/* Product Switcher - hide on mobile */}
            {!isMobile && <EsdsProductSwitcher />}
          </elvt-stack>
          
          {/* Navigation Menu for larger screens - removed per requirement */}
          <div className="desktop-nav" style={{ display: 'none' }} />
          
          <elvt-stack slot="end" gap="s">
            
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
            <elvt-icon-button 
              size="medium" 
              label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              icon={isDarkMode ? MDI_ICON_REGISTRY.sun : MDI_ICON_REGISTRY.moon}
              onClick={toggleDarkMode}
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
                    color: isActive(item.href) ? 'var(--esds-alias-color-brand-primary)' : 'var(--esds-alias-text-body)',
                    backgroundColor: isActive(item.href) ? 'var(--esds-alias-background-surface)' : 'transparent',
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
              sections={getTreeSidebarSections()}
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
          background: var(--esds-sidebar-background);
          border-right: 1px solid var(--esds-sidebar-border-color);
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
          background: var(--esds-alias-background-overlay, rgba(0, 0, 0, 0.5));
          z-index: 99;
          opacity: 1;
          visibility: visible;
        }

        .main-content {
          flex: 1;
          overflow-y: auto;
          background: var(--esds-content-background);
          min-width: 0;
          height: 100%;
        }

        
        /* Mobile/Tablet drawer behavior */
        @media (max-width: 1024px) {
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
            box-shadow: var(--esds-alias-shadow-sidebar);
            background: var(--esds-alias-sidebar-background);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .sidebar-container:not(.collapsed) {
            transform: translateX(0);
          }
        }
        

        /* Mobile navigation overlay */
        .mobile-nav-overlay {
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          background: var(--esds-alias-background-page);
          border-bottom: 1px solid var(--esds-alias-sidebar-border);
          box-shadow: var(--esds-alias-shadow-sidebar);
          z-index: 1000;
        }

        /* Footer */
        .site-footer {
          background: var(--esds-alias-background-surface);
          border-top: 1px solid var(--esds-alias-sidebar-border);
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
          color: var(--esds-alias-color-brand-primary);
          margin-bottom: 1rem;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .footer-section h4 {
          color: var(--esds-alias-text-heading);
          margin-bottom: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .footer-section p {
          color: var(--esds-alias-text-muted);
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
          color: var(--esds-alias-text-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-section ul li a:hover {
          color: var(--esds-alias-color-brand-primary);
          text-decoration: underline;
        }

        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid var(--esds-alias-sidebar-border);
          text-align: center;
          color: var(--esds-alias-text-muted);
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