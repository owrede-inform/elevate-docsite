import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success'
export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * ELEVATE Button Component
 * 
 * A web component button that follows ELEVATE design system patterns.
 * Features:
 * - Multiple variants (primary, secondary, tertiary, danger, success)
 * - Size variants (sm, md, lg)
 * - Loading and disabled states
 * - Icon support
 * - Accessibility compliant
 */
@customElement('elevate-button')
export class ElevateButton extends LitElement {
  @property({ type: String }) variant: ButtonVariant = 'primary'
  @property({ type: String }) size: ButtonSize = 'md'
  @property({ type: Boolean }) disabled = false
  @property({ type: Boolean }) loading = false
  @property({ type: String }) href?: string
  @property({ type: String }) target?: string
  @property({ type: String }) icon?: string
  @property({ type: String }) iconPosition: 'left' | 'right' = 'left'
  @property({ type: Boolean }) fullWidth = false

  static styles = css`
    :host {
      display: inline-block;
    }

    :host([full-width]) {
      display: block;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--elevate-spacing-sm, 0.5rem);
      padding: var(--elevate-spacing-sm, 0.5rem) var(--elevate-spacing-md, 1rem);
      border: none;
      border-radius: var(--elevate-radius-md, 0.375rem);
      font-family: var(--elevate-font-family-primary, Inter, sans-serif);
      font-weight: var(--elevate-font-weight-medium, 500);
      font-size: var(--elevate-font-size-base, 1rem);
      line-height: var(--elevate-line-height-tight, 1.25);
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      box-shadow: var(--elevate-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
      position: relative;
      white-space: nowrap;
    }

    .button:focus-visible {
      outline: 2px solid var(--elevate-color-focus, #4285f4);
      outline-offset: 2px;
    }

    .button[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }

    /* Size variants */
    .button--sm {
      padding: var(--elevate-spacing-xs, 0.25rem) var(--elevate-spacing-sm, 0.5rem);
      font-size: var(--elevate-font-size-sm, 0.875rem);
    }

    .button--md {
      padding: var(--elevate-spacing-sm, 0.5rem) var(--elevate-spacing-md, 1rem);
      font-size: var(--elevate-font-size-base, 1rem);
    }

    .button--lg {
      padding: var(--elevate-spacing-md, 1rem) var(--elevate-spacing-lg, 1.5rem);
      font-size: var(--elevate-font-size-lg, 1.125rem);
    }

    /* Primary variant */
    .button--primary {
      background: var(--elevate-color-primary, #0066cc);
      color: white;
    }

    .button--primary:hover:not([disabled]) {
      background: var(--elevate-color-primary-hover, #0052a3);
      box-shadow: var(--elevate-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
    }

    .button--primary:active:not([disabled]) {
      background: var(--elevate-color-primary-dark, #004494);
    }

    /* Secondary variant */
    .button--secondary {
      background: var(--elevate-color-background-secondary, #f8f9fa);
      color: var(--elevate-color-text-primary, #1a1a1a);
      border: 1px solid var(--elevate-color-border-medium, #dee2e6);
    }

    .button--secondary:hover:not([disabled]) {
      background: var(--elevate-color-background-tertiary, #f1f3f4);
      border-color: var(--elevate-color-border-hover, #cbd5e0);
      box-shadow: var(--elevate-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
    }

    /* Tertiary variant */
    .button--tertiary {
      background: transparent;
      color: var(--elevate-color-primary, #0066cc);
    }

    .button--tertiary:hover:not([disabled]) {
      background: var(--elevate-color-primary-light, #e3f2fd);
      color: var(--elevate-color-primary-hover, #0052a3);
    }

    /* Danger variant */
    .button--danger {
      background: var(--elevate-color-danger, #dc3545);
      color: white;
    }

    .button--danger:hover:not([disabled]) {
      background: var(--elevate-color-danger-hover, #c82333);
      box-shadow: var(--elevate-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
    }

    /* Success variant */
    .button--success {
      background: var(--elevate-color-success, #28a745);
      color: white;
    }

    .button--success:hover:not([disabled]) {
      background: var(--elevate-color-success-hover, #218838);
      box-shadow: var(--elevate-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
    }

    /* Full width */
    .button--full-width {
      width: 100%;
    }

    /* Loading state */
    .button--loading {
      pointer-events: none;
    }

    .loading-spinner {
      width: 1em;
      height: 1em;
      border: 2px solid currentColor;
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Icon styling */
    .icon {
      width: 1.2em;
      height: 1.2em;
      display: inline-block;
      vertical-align: middle;
      fill: currentColor;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .button {
        border: 2px solid;
      }
      
      .button--primary {
        border-color: var(--elevate-color-primary, #0066cc);
      }
      
      .button--secondary {
        border-color: var(--elevate-color-text-primary, #1a1a1a);
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .button {
        transition: none;
      }
      
      .loading-spinner {
        animation: none;
      }
    }
  `

  private handleClick(event: Event) {
    if (this.disabled || this.loading) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    // Emit custom event for programmatic usage
    const customEvent = new CustomEvent('elevate-button-click', {
      detail: { variant: this.variant, size: this.size },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(customEvent)
  }

  private renderIcon(position: 'left' | 'right') {
    if (!this.icon || this.iconPosition !== position) return ''
    
    return html`
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d=${this.icon}></path>
      </svg>
    `
  }

  render() {
    const classes = {
      button: true,
      [`button--${this.variant}`]: true,
      [`button--${this.size}`]: true,
      'button--full-width': this.fullWidth,
      'button--loading': this.loading
    }

    const content = html`
      ${this.renderIcon('left')}
      ${this.loading ? html`<div class="loading-spinner"></div>` : ''}
      <slot></slot>
      ${this.renderIcon('right')}
    `

    if (this.href) {
      return html`
        <a
          href=${this.href}
          target=${this.target || 'none'}
          class=${classMap(classes)}
          ?disabled=${this.disabled}
          @click=${this.handleClick}
          role="button"
          aria-disabled=${this.disabled ? 'true' : 'false'}
        >
          ${content}
        </a>
      `
    }

    return html`
      <button
        type="button"
        class=${classMap(classes)}
        ?disabled=${this.disabled || this.loading}
        @click=${this.handleClick}
        aria-disabled=${this.disabled || this.loading ? 'true' : 'false'}
      >
        ${content}
      </button>
    `
  }
}