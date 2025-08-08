import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

/**
 * ELEVATE Container Component
 * 
 * A responsive container component following ELEVATE design system patterns.
 * Features:
 * - Multiple size variants
 * - Responsive behavior
 * - Optional padding
 * - Centered content
 */
@customElement('elevate-container')
export class ElevateContainer extends LitElement {
  @property({ type: String }) size: ContainerSize = 'lg'
  @property({ type: Boolean }) padding = true
  @property({ type: Boolean }) centered = true

  static styles = css`
    :host {
      display: block;
    }

    .container {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
    }

    .container--centered {
      margin-left: auto;
      margin-right: auto;
    }

    .container--padding {
      padding-left: var(--elevate-spacing-md, 1rem);
      padding-right: var(--elevate-spacing-md, 1rem);
    }

    /* Size variants */
    .container--sm {
      max-width: 640px;
    }

    .container--md {
      max-width: 768px;
    }

    .container--lg {
      max-width: 1024px;
    }

    .container--xl {
      max-width: 1200px;
    }

    .container--full {
      max-width: none;
    }

    /* Responsive padding adjustments */
    @media (min-width: 640px) {
      .container--padding {
        padding-left: var(--elevate-spacing-lg, 1.5rem);
        padding-right: var(--elevate-spacing-lg, 1.5rem);
      }
    }

    @media (min-width: 1024px) {
      .container--padding {
        padding-left: var(--elevate-spacing-xl, 2rem);
        padding-right: var(--elevate-spacing-xl, 2rem);
      }
    }

    /* Typography scoping */
    ::slotted(*) {
      font-family: var(--elevate-font-family-primary, Inter, sans-serif);
    }
  `

  render() {
    const classes = {
      container: true,
      [`container--${this.size}`]: true,
      'container--padding': this.padding,
      'container--centered': this.centered
    }

    return html`
      <div class=${classMap(classes)}>
        <slot></slot>
      </div>
    `
  }
}