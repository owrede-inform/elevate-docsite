import { LitElement, html, css, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('esds-component-preview')
export class ESDSComponentPreview extends LitElement {
  @property({ type: String }) code = ''
  @property({ type: String }) title = 'Example'
  
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `

  render() {
    return html`
      <div>
        <h3>${this.title}</h3>
        <pre><code>${this.code}</code></pre>
      </div>
    `
  }
}