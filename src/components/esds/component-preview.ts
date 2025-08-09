import { LitElement, html, css, nothing, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

@customElement('esds-component-preview')
export class ESDSComponentPreview extends LitElement {
  @property({ type: String }) code = ''
  @property({ type: String }) title = 'Example'
  @property({ type: Boolean }) preview = true
  @property({ type: Boolean }) showCopy = true
  @property({ type: String }) previewBackground = 'var(--esds-alias-background-surface)'
  @property({ type: String }) language = 'html'
  
  @state() private _copySuccess = false
  
  static styles = css`
    :host {
      display: block;
      margin: 1.5rem 0;
      border: 1px solid var(--esds-alias-sidebar-border);
      border-radius: 0.5rem;
      overflow: hidden;
      background: var(--esds-alias-background-page);
    }

    .preview-container {
      border-bottom: 1px solid var(--esds-alias-sidebar-border);
    }

    .preview-header {
      display: flex;
      justify-content: between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: var(--esds-alias-background-surface);
      border-bottom: 1px solid var(--esds-alias-sidebar-border);
      font-size: var(--esds-alias-label-small-font-size);
      color: var(--esds-alias-text-muted);
      font-weight: var(--esds-alias-label-small-font-weight);
    }

    .preview-area {
      padding: 2rem 1rem;
      min-height: 120px;
      background: var(--preview-bg, var(--esds-alias-background-surface));
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .code-container {
      position: relative;
    }

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: var(--esds-alias-background-surface);
      border-bottom: 1px solid var(--esds-alias-sidebar-border);
      font-size: var(--esds-alias-label-small-font-size);
      color: var(--esds-alias-text-muted);
      font-weight: var(--esds-alias-label-small-font-weight);
    }

    .copy-button {
      background: none;
      border: 1px solid var(--esds-alias-sidebar-border);
      border-radius: 0.25rem;
      padding: 0.25rem 0.5rem;
      cursor: pointer;
      color: var(--esds-alias-text-muted);
      font-size: var(--esds-alias-label-small-font-size);
      display: flex;
      align-items: center;
      gap: 0.25rem;
      transition: all 0.2s ease;
    }

    .copy-button:hover {
      background: var(--esds-alias-background-page);
      color: var(--esds-alias-color-brand-primary);
      border-color: var(--esds-alias-color-brand-primary);
    }

    .copy-button.success {
      color: #22c55e;
      border-color: #22c55e;
    }

    .copy-icon {
      width: 14px;
      height: 14px;
      fill: currentColor;
    }

    .code-content {
      background: var(--esds-alias-background-page);
      color: var(--esds-alias-text-heading);
      overflow-x: auto;
    }

    [data-theme="dark"] .code-content {
      background: var(--esds-alias-text-heading);
      color: var(--esds-alias-background-page);
    }

    .code-content pre {
      margin: 0;
      padding: 1.5rem;
      background: none;
      border: none;
      overflow-x: auto;
      font-family: var(--esds-alias-font-family-code);
      font-size: var(--esds-alias-code-block-font-size);
      line-height: var(--esds-alias-code-block-line-height);
      white-space: pre;
    }

    .code-content code {
      color: var(--esds-alias-color-brand-primary);
      font-family: var(--esds-alias-font-family-code);
    }

    [data-theme="dark"] .code-content code {
      color: #61dafb;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .preview-area {
        padding: 1.5rem 0.75rem;
      }
      
      .code-content pre {
        padding: 1rem;
        font-size: 0.875rem;
      }
    }
  `

  private async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.code)
      this._copySuccess = true
      
      // Dispatch copy event for parent components
      this.dispatchEvent(new CustomEvent('copy', {
        detail: { code: this.code },
        bubbles: true
      }))
      
      setTimeout(() => {
        this._copySuccess = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  private renderPreview() {
    if (!this.preview || !this.code) return nothing

    // Clean the code and ensure it's safe to render
    const cleanCode = this.code.trim()
    
    return html`
      <div class="preview-container">
        <div class="preview-header">
          Preview
        </div>
        <div 
          class="preview-area"
          style="--preview-bg: ${this.previewBackground}"
        >
          ${unsafeHTML(cleanCode)}
        </div>
      </div>
    `
  }

  private renderCodeBlock() {
    if (!this.code) return nothing

    const copyIcon = this._copySuccess ? html`
      <svg class="copy-icon" viewBox="0 0 24 24">
        <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
      </svg>
      Copied!
    ` : html`
      <svg class="copy-icon" viewBox="0 0 24 24">
        <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/>
      </svg>
      Copy
    `

    return html`
      <div class="code-container">
        <div class="code-header">
          <span>Code Example</span>
          ${this.showCopy ? html`
            <button 
              class="copy-button ${this._copySuccess ? 'success' : ''}"
              @click=${this.copyToClipboard}
              title="Copy code to clipboard"
            >
              ${copyIcon}
            </button>
          ` : nothing}
        </div>
        <div class="code-content">
          <pre><code>${this.code}</code></pre>
        </div>
      </div>
    `
  }

  render() {
    return html`
      ${this.renderPreview()}
      ${this.renderCodeBlock()}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'esds-component-preview': ESDSComponentPreview
  }
}