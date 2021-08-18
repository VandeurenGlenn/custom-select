export default customElements.define('custom-select', class customSelect extends HTMLElement {
  static get observedAttributes() {
    return ['selected']
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template


    this._onClick = this._onClick.bind(this)
    this.addEventListener('click', this._onClick)

    this.shadowRoot.querySelector('.expand').addEventListener('click', () => {
        // this.input.addEventListener('sele')
      this.opened = true
    })
  }


  attributeChangedCallback(name, oldValue, newValue) {
    if (this[name] !== newValue) this[name] = newValue
  }

  _onClick(event) {

    const target = event.composedPath()[0]
    console.log(target);
    if (!target.dataset.route) this.opened = true
    else {
      this.opened = false
      const prev = this.querySelector(`[selected]`)
      if (prev) prev.removeAttribute('selected')

      target.setAttribute('selected', '')

      this.selected = target.dataset.route
    }
  }

  set selected(value) {
    this.setAttribute('selected', value)
    this.shadowRoot.querySelector('.selected').innerHTML = value
    this.dispatchEvent(new CustomEvent('selected', {detail: value}))
  }

  get selected() {
    return this.getAttribute('selected')
  }

  set opened(value) {
    if (value) {
      this.setAttribute('opened', '')
      document.addEventListener('mouseup', () => this.opened = false)
    } else
      this.removeAttribute('opened')
      document.removeEventListener('mouseup', () => this.opened = false);
  }

  get template() {
    return `<style>
      * {
        pointer-events: none;
        user-select: none;
        outline: none;
      }
      :host {
        position: relative;
        display: flex;
        cursor: pointer;
        padding-left: 12px;
        pointer-events: none;

        --hero-border-radius: 24px;
        --hero-color: #eee;
      }

      .dropdown {
        position: absolute;
        opacity: 0;
        top: 0;
        left: 0;
        min-height: 110px;
        max-height: 240px;
        width: max-content;
        background: #333;
        border: 1px solid rgba(0,0,0,0.5);
        user-select: none;
        overflow: auto;
        z-index: 1001;
        display: flex;
        flex-direction: column;
        padding: 12px;
        box-sizing: border-box;
        outline: none;
        align-items: center;
        background: var(--main-background-color);
        border-color: var(--hero-border-color);
        border-radius: var(--hero-border-radius);
        color: var(--hero-color);
        pointer-events: var(--dropdown-pointer-events, auto);
      }

      :host([right]) .dropdown {
        right: 0;
        left: auto;
      }

      span.row {
        pointer-events: auto;
      }

      ::slotted(*) {
        pointer-events: none !important;
      }
      .expand {
        pointer-events: auto;
        transform: rotate(270deg);
        font-size: 24px;
        font-weight: 800;
      }
      :host([opened]) .dropdown, :host([opened]) ::slotted(*) {
        opacity: 1;
      }
      :host([opened]) ::slotted(*) {
        pointer-events: auto !important;
      }
      :host([opened]) .expand, :host([opened]) .selected {
        pointer-events: none !important;
      }

      :host([opened][center]) .dropdown {
        top: 50%;
        left: 50%;
        position: fixed;
        transform: translate(-50%, -50%);
        width: 320px;
        max-height: 480px;
        height: 100%;
        box-sizing: border-box;
      }

      .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 1;
      }

      .selected {
        padding-right: 12px;
      }

    </style>

    <span class="row">
      <span class="selected" icon></span>
      <span class="expand">&#10096;</span>
    </span>

    <span class="dropdown">
      <slot name="top"></slot>
      <slot></slot>
    </span>`
  }
})
