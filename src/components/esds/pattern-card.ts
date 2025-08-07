import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

export interface PatternCardData {
  id: string
  title: string
  description: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  components: string[]
  previewUrl?: string
}

/**
 * ESDS Pattern Card
 * 
 * A WebComponent for displaying pattern information in a card format.
 * Features:
 * - Responsive card layout
 * - Tag filtering support
 * - Difficulty indicators
 * - Component listing
 * - Interactive hover states
 * - Accessibility support
 */
@customElement('esds-pattern-card')
export class ESDSPatternCard extends LitElement {
  @property({ type: Object }) pattern!: PatternCardData
  @property({ type: Boolean, reflect: true }) interactive = true
  @property({ type: String }) size = 'medium' // small, medium, large
  
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--elevate-color-background-primary, #ffffff);
      border: 1px solid var(--elevate-color-border-light, #e9ecef);
      border-radius: 0.5rem;
      padding: 1.5rem;
      transition: all 0.2s ease;
      cursor: var(--card-cursor, default);
    }

    :host([interactive]) .card {
      --card-cursor: pointer;
    }

    :host([interactive]) .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-color: var(--elevate-color-border-hover, #cbd5e0);
    }

    :host([interactive]) .card:focus-within {
      outline: 2px solid var(--elevate-color-focus, #4285f4);
      outline-offset: 2px;
    }

    .card-header {
      margin-bottom: 1rem;
    }

    .card-title {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--elevate-color-text-primary, #1a1a1a);
      line-height: 1.2;
    }

    .card-description {
      margin: 0;
      color: var(--elevate-color-text-secondary, #4a4a4a);
      line-height: 1.5;
      font-size: 0.875rem;
    }

    .card-meta {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: auto;
      padding-top: 1rem;
    }

    .difficulty-badge {
      align-self: flex-start;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-radius: 0.25rem;
      color: white;
    }

    .difficulty-beginner {
      background: var(--elevate-color-success, #28a745);
    }

    .difficulty-intermediate {
      background: var(--elevate-color-warning, #ffc107);
      color: var(--elevate-color-text-primary, #1a1a1a);
    }

    .difficulty-advanced {
      background: var(--elevate-color-danger, #dc3545);
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tag {
      padding: 0.25rem 0.5rem;
      background: var(--elevate-color-background-secondary, #f8f9fa);
      color: var(--elevate-color-text-secondary, #4a4a4a);
      font-size: 0.75rem;
      font-weight: 500;
      border-radius: 0.25rem;
      border: 1px solid var(--elevate-color-border-light, #e9ecef);
    }

    .components {
      margin-top: 0.75rem;
    }

    .components-label {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--elevate-color-text-secondary, #4a4a4a);
      margin-bottom: 0.5rem;
    }

    .component-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }

    .component-link {
      font-size: 0.75rem;
      color: var(--elevate-color-primary, #0066cc);
      text-decoration: none;
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
      transition: background-color 0.2s ease;
    }

    .component-link:hover {
      background: var(--elevate-color-background-secondary, #f8f9fa);
      text-decoration: underline;
    }

    /* Size variations */
    :host([size="small"]) .card {
      padding: 1rem;
    }

    :host([size="small"]) .card-title {
      font-size: 1.125rem;
    }

    :host([size="large"]) .card {
      padding: 2rem;
    }

    :host([size="large"]) .card-title {
      font-size: 1.5rem;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .card {
        padding: 1rem;
      }
      
      .card-title {
        font-size: 1.125rem;
      }
      
      .tags {
        gap: 0.25rem;
      }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .card {
        border-width: 2px;
      }
      
      .tag {
        border-width: 2px;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .card {
        transition: none;
      }
      
      :host([interactive]) .card:hover {
        transform: none;
      }
    }
  `

  private handleCardClick(event: Event) {
    if (!this.interactive) return
    
    const customEvent = new CustomEvent('pattern-select', {
      detail: { pattern: this.pattern },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(customEvent)
  }

  private handleComponentClick(event: Event, componentName: string) {
    event.stopPropagation()
    
    const customEvent = new CustomEvent('component-select', {
      detail: { componentName },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(customEvent)
  }

  render() {
    if (!this.pattern) {
      return html`<div>No pattern data provided</div>`
    }

    const { title, description, tags, difficulty, components } = this.pattern

    return html`
      <div class="card" @click=${this.handleCardClick} role="${this.interactive ? 'button' : 'article'}" tabindex="${this.interactive ? '0' : '-1'}">
        <div class="card-header">
          <h3 class="card-title">${title}</h3>
          <p class="card-description">${description}</p>
        </div>
        
        <div class="card-meta">
          <span class="difficulty-badge difficulty-${difficulty}">
            ${difficulty}
          </span>
          
          ${tags.length > 0 ? html`
            <div class="tags">
              ${tags.map(tag => html`
                <span class="tag">${tag}</span>
              `)}
            </div>
          ` : ''}
          
          ${components.length > 0 ? html`
            <div class="components">
              <div class="components-label">Uses Components:</div>
              <div class="component-list">
                ${components.map(component => html`
                  <a 
                    href="#" 
                    class="component-link"
                    @click=${(e: Event) => this.handleComponentClick(e, component)}
                  >
                    ${component}
                  </a>
                `)}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `
  }
}