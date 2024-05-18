import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more';

  /**
   * The number of times the button has been clicked.
   */
  @property({type: Number})
  count = 0;

  override render() {
    return html`
      <button @click=${this._onClick} part="button">
        count is ${this.count}
      </button>
    `;
  }

  private _onClick() {
    this.count++;
  }

  static override styles = css`
    :host {
      margin: 0.5rem;
      display: inline-block;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #283198;
      cursor: pointer;
      transition: border-color 0.25s;
      color: #fff;
    }
    button:hover {
      border-color: #646cff;
      box-shadow: 0px 0px 10px 0px #324fff inset;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto #324fff;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
