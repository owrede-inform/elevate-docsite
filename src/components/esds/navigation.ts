import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

export interface NavigationItem {
  label: string
  href: string
  icon?: string
  children?: NavigationItem[]
  role?: ('designer' | 'developer' | 'product-manager')[]
}

export interface NavigationData {
  primary: NavigationItem[]
  secondary?: NavigationItem[]
  userRole?: 'designer' | 'developer' | 'product-manager'
}

/**
 * ESDS Navigation
 * 
 * A WebComponent for role-based two-level navigation.
 * Features:
 * - Two-level navigation structure
 * - Role-based filtering
 * - Responsive design with mobile menu
 * - Accessibility support
 * - Active state management
 */
@customElement('esds-navigation')
export class ESDSNavigation extends LitElement {
  @property({ type: Object }) navigation!: NavigationData
  @property({ type: String, attribute: 'current-path' }) currentPath = '/'
  @property({ type: Boolean }) mobile = false
  @property({ type: Boolean, reflect: true }) expanded = false
  
  @state() private mobileMenuOpen = false
  
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .nav-container {
      background: var(--elevate-color-background-primary, #ffffff);
      border-bottom: 1px solid var(--elevate-color-border-light, #e9ecef);
    }

    .nav-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    /* Primary Navigation */
    .primary-nav {
      display: flex;
      align-items: center;
      height: 4rem;
      gap: 2rem;
    }

    .nav-brand {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--elevate-color-primary, #0066cc);
      text-decoration: none;
      margin-right: auto;
    }

    .nav-brand:hover {
      color: var(--elevate-color-primary-hover, #0052a3);
    }

    .primary-links {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .primary-link {
      position: relative;
    }

    .primary-link a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      color: var(--elevate-color-text-primary, #1a1a1a);
      text-decoration: none;
      font-weight: 500;
      border-radius: 0.25rem;
      transition: all 0.2s ease;
    }

    .primary-link a:hover {
      background: var(--elevate-color-background-secondary, #f8f9fa);
      color: var(--elevate-color-primary, #0066cc);
    }

    .primary-link a.active {
      background: var(--elevate-color-primary, #0066cc);
      color: white;
    }

    .role-selector {
      margin-left: 1rem;
      position: relative;
    }

    .role-button {
      padding: 0.5rem 1rem;
      background: var(--elevate-color-background-secondary, #f8f9fa);
      border: 1px solid var(--elevate-color-border-light, #e9ecef);
      border-radius: 0.25rem;
      font-size: 0.875rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
    }

    .role-button:hover {
      border-color: var(--elevate-color-border-hover, #cbd5e0);
    }

    /* Secondary Navigation */
    .secondary-nav {
      background: var(--elevate-color-background-secondary, #f8f9fa);
      border-bottom: 1px solid var(--elevate-color-border-light, #e9ecef);
      padding: 0.75rem 0;
    }

    .secondary-links {
      display: flex;
      gap: 1rem;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0;
      flex-wrap: wrap;
    }

    .secondary-link a {
      padding: 0.375rem 0.75rem;
      color: var(--elevate-color-text-secondary, #4a4a4a);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      border-radius: 0.25rem;
      transition: all 0.2s ease;
    }

    .secondary-link a:hover {
      background: var(--elevate-color-background-primary, #ffffff);
      color: var(--elevate-color-primary, #0066cc);
    }

    .secondary-link a.active {
      background: var(--elevate-color-primary, #0066cc);
      color: white;
    }

    /* Mobile Navigation */
    .mobile-toggle {
      display: none;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.25rem;
    }

    .mobile-toggle:hover {
      background: var(--elevate-color-background-secondary, #f8f9fa);
    }

    .mobile-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--elevate-color-background-primary, #ffffff);
      border-bottom: 1px solid var(--elevate-color-border-light, #e9ecef);
      padding: 1rem;
      z-index: 1000;
    }

    .mobile-menu.open {
      display: block;
    }

    .mobile-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .mobile-link a {
      display: block;
      padding: 0.75rem 1rem;
      color: var(--elevate-color-text-primary, #1a1a1a);
      text-decoration: none;
      border-radius: 0.25rem;
      font-weight: 500;
    }

    .mobile-link a:hover {
      background: var(--elevate-color-background-secondary, #f8f9fa);
    }

    .mobile-link a.active {
      background: var(--elevate-color-primary, #0066cc);
      color: white;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .primary-links {
        display: none;
      }
      
      .role-selector {
        display: none;
      }
      
      .mobile-toggle {
        display: block;
      }
      
      .secondary-nav {
        display: none;
      }
    }

    /* Focus and accessibility */
    a:focus, button:focus {
      outline: 2px solid var(--elevate-color-focus, #4285f4);
      outline-offset: 2px;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .nav-container {
        border-bottom-width: 2px;
      }
      
      .secondary-nav {
        border-bottom-width: 2px;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
      }
    }
  `

  private toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen
  }

  private isActiveLink(href: string): boolean {
    return this.currentPath === href || this.currentPath.startsWith(href + '/')
  }

  private getRoleDisplayName(role?: string): string {
    switch (role) {
      case 'designer': return 'Designer'
      case 'developer': return 'Developer'  
      case 'product-manager': return 'Product Manager'
      default: return 'All Roles'
    }
  }

  private handleRoleChange(event: Event) {
    const customEvent = new CustomEvent('role-change', {
      detail: { role: (event.target as HTMLSelectElement).value },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(customEvent)
  }

  private filterItemsByRole(items: NavigationItem[]): NavigationItem[] {
    if (!this.navigation.userRole) return items
    
    return items.filter(item => 
      !item.role || item.role.includes(this.navigation.userRole!)
    )
  }

  private renderPrimaryNav() {
    const filteredItems = this.filterItemsByRole(this.navigation.primary)
    
    return html`
      <nav class="primary-nav" role="navigation" aria-label="Main navigation">
        <a href="/" class="nav-brand">ELEVATE</a>
        
        <ul class="primary-links">
          ${filteredItems.map(item => html`
            <li class="primary-link">
              <a 
                href=${item.href} 
                class=${classMap({ active: this.isActiveLink(item.href) })}
              >
                ${item.icon ? html`<span>${item.icon}</span>` : ''}
                ${item.label}
              </a>
            </li>
          `)}
        </ul>
        
        <div class="role-selector">
          <select 
            class="role-button" 
            @change=${this.handleRoleChange}
            value=${this.navigation.userRole || 'all'}
            aria-label="Select user role"
          >
            <option value="all">All Roles</option>
            <option value="designer">Designer</option>
            <option value="developer">Developer</option>
            <option value="product-manager">Product Manager</option>
          </select>
        </div>
        
        <button 
          class="mobile-toggle"
          @click=${this.toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded=${this.mobileMenuOpen}
        >
          ${this.mobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>
    `
  }

  private renderSecondaryNav() {
    if (!this.navigation.secondary?.length) return ''
    
    const filteredItems = this.filterItemsByRole(this.navigation.secondary)
    
    return html`
      <nav class="secondary-nav" role="navigation" aria-label="Secondary navigation">
        <div class="nav-wrapper">
          <ul class="secondary-links">
            ${filteredItems.map(item => html`
              <li class="secondary-link">
                <a 
                  href=${item.href}
                  class=${classMap({ active: this.isActiveLink(item.href) })}
                >
                  ${item.label}
                </a>
              </li>
            `)}
          </ul>
        </div>
      </nav>
    `
  }

  private renderMobileMenu() {
    const allItems = [
      ...this.navigation.primary,
      ...(this.navigation.secondary || [])
    ]
    const filteredItems = this.filterItemsByRole(allItems)
    
    return html`
      <div class="mobile-menu ${classMap({ open: this.mobileMenuOpen })}">
        <ul class="mobile-links">
          ${filteredItems.map(item => html`
            <li class="mobile-link">
              <a 
                href=${item.href}
                class=${classMap({ active: this.isActiveLink(item.href) })}
                @click=${() => this.mobileMenuOpen = false}
              >
                ${item.icon ? html`<span>${item.icon}</span> ` : ''}
                ${item.label}
              </a>
            </li>
          `)}
        </ul>
      </div>
    `
  }

  render() {
    if (!this.navigation?.primary) {
      return html`<div>No navigation data provided</div>`
    }

    return html`
      <header class="nav-container">
        <div class="nav-wrapper">
          ${this.renderPrimaryNav()}
        </div>
        ${this.renderMobileMenu()}
      </header>
      ${this.renderSecondaryNav()}
    `
  }
}