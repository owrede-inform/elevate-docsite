import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'filled'

/**
 * ELEVATE Card Component
 * 
 * A flexible card container following ELEVATE design system patterns.
 * Features:
 * - Multiple variants (default, outlined, elevated, filled)
 * - Header, body, and footer slots
 * - Interactive states
 * - Accessibility compliant
 * - Responsive design
 */
@customElement('elevate-card')
export class ElevateCard extends LitElement {
  @property({ type: String }) variant: CardVariant = 'default'
  @property({ type: Boolean }) interactive = false
  @property({ type: String }) href?: string
  @property({ type: String }) target?: string

  static styles = css`
    :host {
      display: block;
    }

    .card {
      border-radius: var(--elevate-radius-lg, 0.5rem);
      overflow: hidden;
      transition: all 0.2s ease;
      position: relative;
      font-family: var(--elevate-font-family-primary, Inter, sans-serif);
    }

    .card--interactive {
      cursor: pointer;
    }

    .card--interactive:hover {
      transform: translateY(-2px);
    }

    .card--interactive:focus-within,
    .card--interactive:focus-visible {
      outline: 2px solid var(--elevate-color-focus, #4285f4);
      outline-offset: 2px;
    }

    /* Variant styles */
    .card--default {
      background: var(--elevate-color-background-primary, #ffffff);
      border: 1px solid var(--elevate-color-border-light, #e9ecef);
      box-shadow: var(--elevate-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
    }

    .card--outlined {
      background: var(--elevate-color-background-primary, #ffffff);
      border: 2px solid var(--elevate-color-border-medium, #dee2e6);
    }

    .card--elevated {
      background: var(--elevate-color-background-primary, #ffffff);
      border: none;
      box-shadow: var(--elevate-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
    }

    .card--filled {
      background: var(--elevate-color-background-secondary, #f8f9fa);
      border: 1px solid var(--elevate-color-border-light, #e9ecef);
    }

    /* Interactive hover states */
    .card--default.card--interactive:hover {
      box-shadow: var(--elevate-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
      border-color: var(--elevate-color-border-hover, #cbd5e0);
    }

    .card--outlined.card--interactive:hover {
      border-color: var(--elevate-color-primary, #0066cc);
      box-shadow: var(--elevate-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
    }

    .card--elevated.card--interactive:hover {
      box-shadow: var(--elevate-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
    }

    .card--filled.card--interactive:hover {
      background: var(--elevate-color-background-tertiary, #f1f3f4);
      box-shadow: var(--elevate-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
    }

    /* Card sections */
    .card-header {
      padding: var(--elevate-spacing-lg, 1.5rem);
      border-bottom: 1px solid var(--elevate-color-border-light, #e9ecef);
    }

    .card-header:empty {
      display: none;
    }

    .card-body {
      padding: var(--elevate-spacing-lg, 1.5rem);
    }

    .card-footer {
      padding: var(--elevate-spacing-lg, 1.5rem);
      border-top: 1px solid var(--elevate-color-border-light, #e9ecef);
      background: var(--elevate-color-background-secondary, #f8f9fa);
    }

    .card-footer:empty {
      display: none;
    }

    /* Typography within card */
    ::slotted(h1),
    ::slotted(h2),
    ::slotted(h3),
    ::slotted(h4),
    ::slotted(h5),
    ::slotted(h6) {
      color: var(--elevate-color-text-primary, #1a1a1a);
      margin-top: 0;
      margin-bottom: var(--elevate-spacing-sm, 0.5rem);
      font-weight: var(--elevate-font-weight-semibold, 600);
    }

    ::slotted(p) {
      color: var(--elevate-color-text-secondary, #4a4a4a);
      line-height: var(--elevate-line-height-relaxed, 1.6);
      margin-top: 0;
      margin-bottom: var(--elevate-spacing-md, 1rem);
    }

    ::slotted(p:last-child) {
      margin-bottom: 0;
    }

    /* Link styling when used as a link */
    .card-link {
      text-decoration: none;
      color: inherit;
      display: block;
    }

    /* Responsive design */
    @media (max-width: 640px) {
      .card-header,
      .card-body,
      .card-footer {
        padding: var(--elevate-spacing-md, 1rem);
      }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .card {
        border-width: 2px;
      }
      
      .card--outlined {
        border-width: 3px;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .card {
        transition: none;
      }
      
      .card--interactive:hover {
        transform: none;
      }
    }

    /* Print styles */
    @media print {
      .card {
        border: 2px solid var(--elevate-color-border-medium, #dee2e6);
        box-shadow: none;
      }
    }
  `

  private handleClick(event: Event) {
    if (!this.interactive) return

    // Emit custom event
    const customEvent = new CustomEvent('elevate-card-click', {
      detail: { variant: this.variant },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(customEvent)
  }

  render() {
    const classes = {
      card: true,
      [`card--${this.variant}`]: true,
      'card--interactive': this.interactive
    }

    const cardContent = html`
      <div class=${classMap(classes)} @click=${this.handleClick}>
        <div class="card-header">
          <slot name="header"></slot>
        </div>
        <div class="card-body">
          <slot></slot>
        </div>
        <div class="card-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `

    if (this.href) {
      return html`
        <a
          href=${this.href}
          target=${this.target || 'none'}
          class="card-link"
          role="button"
          tabindex="0"
        >
          ${cardContent}
        </a>
      `
    }

    return cardContent
  }
}