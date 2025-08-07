import { LitElement, html, css, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import Prism from 'prismjs'

// Import additional Prism languages
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'

/**
 * ESDS Component Preview
 * 
 * A WebComponent that renders code examples with live preview functionality.
 * Features:
 * - Syntax highlighting with Prism.js
 * - Live preview rendering
 * - Copy to clipboard
 * - Multiple language support
 * - Responsive design
 */
@customElement('esds-component-preview')
export class ESDSComponentPreview extends LitElement {
  @property({ type: String }) code = ''
  @property({ type: String }) language = 'typescript'
  @property({ type: String }) title = 'Example'
  @property({ type: Boolean }) preview = true
  @property({ type: Boolean, attribute: 'show-copy' }) showCopy = true
  @property({ type: String, attribute: 'preview-background' }) previewBackground = 'white'
  
  @state() private copied = false
  @state() private previewError = false
  
  static styles = css`
    :host {
      display: block;
      margin: 1.5rem 0;
      border: 1px solid var(--elevate-color-border-light, #e9ecef);
      border-radius: 0.5rem;
      overflow: hidden;
      background: var(--elevate-color-background-primary, #ffffff);
    }

    .preview-header {
      display: flex;
      justify-content: between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: var(--elevate-color-background-secondary, #f8f9fa);
      border-bottom: 1px solid var(--elevate-color-border-light, #e9ecef);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--elevate-color-text-primary, #1a1a1a);
    }

    .preview-title {
      flex: 1;
      margin: 0;
      font-size: inherit;
      font-weight: inherit;
    }

    .preview-actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .copy-button {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      background: var(--elevate-color-primary, #0066cc);
      color: white;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .copy-button:hover {
      background: var(--elevate-color-primary-hover, #0052a3);
    }

    .copy-button.copied {
      background: var(--elevate-color-success, #28a745);
    }

    .preview-content {
      display: flex;
      flex-direction: column;
    }

    .live-preview {
      padding: 2rem;
      background: var(--preview-bg);
      border-bottom: 1px solid var(--elevate-color-border-light, #e9ecef);
      min-height: 4rem;
    }

    .preview-error {
      padding: 1rem;
      background: #fdf2f2;
      color: #c53030;
      font-family: 'Roboto Mono', monospace;
      font-size: 0.875rem;
      border-bottom: 1px solid var(--elevate-color-border-light, #e9ecef);
    }

    .code-block {
      position: relative;
      margin: 0;
      background: var(--elevate-color-background-code, #f8f9fa);
    }

    .code-block pre {
      margin: 0;
      padding: 1rem;
      background: none;
      border: none;
      border-radius: 0;
      overflow-x: auto;
      font-family: 'Roboto Mono', 'Monaco', 'Consolas', 'Courier New', monospace;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .code-block code {
      background: none;
      color: inherit;
      padding: 0;
      border-radius: 0;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .live-preview {
        padding: 1rem;
      }
      
      .code-block pre {
        padding: 0.75rem;
        font-size: 0.8rem;
      }
      
      .preview-header {
        padding: 0.5rem 0.75rem;
        font-size: 0.8rem;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      :host {
        border-width: 2px;
      }
      
      .copy-button {
        border: 1px solid currentColor;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .copy-button {
        transition: none;
      }
    }
  `

  protected firstUpdated() {
    this.style.setProperty('--preview-bg', this.previewBackground)
  }

  private async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.code)
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  private getHighlightedCode() {
    try {
      return Prism.highlight(this.code, Prism.languages[this.language] || Prism.languages.text, this.language)
    } catch (error) {
      console.warn('Failed to highlight code:', error)
      return this.code
    }
  }

  private renderLivePreview() {
    if (!this.preview) return nothing
    
    try {
      // For security, we'll just show a placeholder for now
      // In a real implementation, you'd want to safely execute the code
      return html`
        <div class="live-preview">
          <div style="
            padding: 1rem;
            border: 2px dashed var(--elevate-color-border-light, #e9ecef);
            border-radius: 0.25rem;
            text-align: center;
            color: var(--elevate-color-text-secondary, #6c757d);
            font-style: italic;
          ">
            Live preview would render here
            <br />
            <small>Component: ${this.title}</small>
          </div>
        </div>
      `
    } catch (error) {
      this.previewError = true
      return html`
        <div class="preview-error">
          Preview Error: ${error}
        </div>
      `
    }
  }

  render() {
    const highlightedCode = this.getHighlightedCode()
    
    return html`
      <div class="preview-header">
        <h3 class="preview-title">${this.title}</h3>
        <div class="preview-actions">
          ${this.showCopy ? html`
            <button 
              class="copy-button ${this.copied ? 'copied' : ''}"
              @click=${this.copyToClipboard}
              aria-label="Copy code to clipboard"
            >
              ${this.copied ? '✓ Copied' : 'Copy'}
            </button>
          ` : nothing}
        </div>
      </div>
      
      <div class="preview-content">
        ${this.renderLivePreview()}
        
        <div class="code-block">
          <pre><code class="language-${this.language}">${unsafeHTML(highlightedCode)}</code></pre>
        </div>
      </div>
    `
  }
}