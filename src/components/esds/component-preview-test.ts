import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('esds-test')
export class ESDSTest extends LitElement {
  render() {
    return html`<p>Test component works!</p>`
  }
}