import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * ESDS GitHub Link
 * 
 * A WebComponent that adds GitHub issue linking functionality to elements.
 * Features:
 * - Automatic issue linking
 * - Hover preview
 * - Configurable appearance
 * - Accessibility support
 */
@customElement('esds-github-link')
export class ESDSGithubLink extends LitElement {
  @property({ type: String }) repo = 'owrede-inform/elevate-docsite'
  @property({ type: String, attribute: 'issue-number' }) issueNumber = ''
  @property({ type: String }) text = ''
  @property({ type: String }) title = ''
  @property({ type: String }) size = 'small' // small, medium, large
  @property({ type: Boolean, attribute: 'show-icon' }) showIcon = true
  @property({ type: Boolean, attribute: 'external-link' }) externalLink = true
  
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .github-link {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.125rem 0.25rem;
      color: var(--elevate-color-text-secondary, #6c757d);
      text-decoration: none;
      font-size: var(--link-font-size);
      font-weight: 500;
      border-radius: 0.25rem;
      transition: all 0.2s ease;
      background: transparent;
      border: 1px solid transparent;
    }

    .github-link:hover {
      color: var(--elevate-color-primary, #0066cc);
      background: var(--elevate-color-background-secondary, #f8f9fa);
      border-color: var(--elevate-color-border-light, #e9ecef);
      text-decoration: none;
    }

    .github-link:focus {
      outline: 2px solid var(--elevate-color-focus, #4285f4);
      outline-offset: 2px;
    }

    .github-icon {
      width: var(--icon-size);
      height: var(--icon-size);
      fill: currentColor;
      flex-shrink: 0;
    }

    .external-icon {
      width: calc(var(--icon-size) * 0.75);
      height: calc(var(--icon-size) * 0.75);
      fill: currentColor;
      opacity: 0.6;
    }

    .issue-tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 0.25rem;
      padding: 0.5rem;
      background: var(--elevate-color-text-primary, #1a1a1a);
      color: white;
      font-size: 0.75rem;
      white-space: nowrap;
      border-radius: 0.25rem;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
      z-index: 1000;
    }

    .issue-tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 4px solid transparent;
      border-top-color: var(--elevate-color-text-primary, #1a1a1a);
    }

    .github-link:hover .issue-tooltip {
      opacity: 1;
    }

    /* Size variations */
    :host([size="small"]) {
      --link-font-size: 0.75rem;
      --icon-size: 0.875rem;
    }

    :host([size="medium"]) {
      --link-font-size: 0.875rem;
      --icon-size: 1rem;
    }

    :host([size="large"]) {
      --link-font-size: 1rem;
      --icon-size: 1.125rem;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .github-link {
        border-width: 2px;
      }
      
      .github-link:hover {
        border-width: 2px;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .github-link {
        transition: none;
      }
      
      .issue-tooltip {
        transition: none;
      }
    }
  `

  private get githubUrl(): string {
    const baseUrl = `https://github.com/${this.repo}`
    
    if (this.issueNumber) {
      return `${baseUrl}/issues/${this.issueNumber}`
    }
    
    return `${baseUrl}/issues`
  }

  private get displayText(): string {
    if (this.text) return this.text
    
    if (this.issueNumber) {
      return `Issue #${this.issueNumber}`
    }
    
    return 'Create Issue'
  }

  private get tooltipText(): string {
    if (this.title) return this.title
    
    if (this.issueNumber) {
      return `View issue #${this.issueNumber} on GitHub`
    }
    
    return 'Create new issue on GitHub'
  }

  private handleClick(event: Event) {
    const customEvent = new CustomEvent('github-link-click', {
      detail: { 
        repo: this.repo,
        issueNumber: this.issueNumber,
        url: this.githubUrl
      },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(customEvent)
  }

  render() {
    return html`
      <a 
        href=${this.githubUrl}
        class="github-link"
        target=${this.externalLink ? '_blank' : '_self'}
        rel=${this.externalLink ? 'noopener noreferrer' : 'none'}
        aria-label=${this.tooltipText}
        @click=${this.handleClick}
      >
        ${this.showIcon ? html`
          <svg class="github-icon" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        ` : ''}
        
        <span>${this.displayText}</span>
        
        ${this.externalLink ? html`
          <svg class="external-icon" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3.75 2A1.75 1.75 0 002 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.25v-3.5a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h3.5a.75.75 0 000-1.5h-3.5z"/>
            <path d="M6.22 8.72a.75.75 0 001.06 1.06L13.25 3.81v2.69a.75.75 0 001.5 0V2.75A1.75 1.75 0 0013 1H9.25a.75.75 0 000 1.5h2.69L6.22 8.72z"/>
          </svg>
        ` : ''}
        
        <div class="issue-tooltip" role="tooltip">
          ${this.tooltipText}
        </div>
      </a>
    `
  }
}