import { inject, bindable, bindingMode } from 'aurelia-framework';

@inject(Element)
export class CollapseCustomElement {

  @bindable() private heading = "";
  @bindable({
    attribute: 'collapsed',
    defaultBindingMode: bindingMode.twoWay
  }) isCollapsed = false;

  // refs
  private content: HTMLElement;
  private header: HTMLElement

  private isAttached = false;

  constructor(
    public element: HTMLElement) { }

  /**
  * Expands the element.
  */
  expand() {
    this.isCollapsed = false;
  }

  /**
  * Collapses the element.
  */
  collapse() {
    this.isCollapsed = true;
  }

  /**
  * Expands the element if collapsed, otherwise collapses the element.
  */
  toggle() {
    this.isCollapsed ? this.expand() : this.collapse();
  }

  private bind() {
    this.isCollapsed = this.isCollapsed || this.element.hasAttribute('collapsed');
  }

  private attached() {
    this.isAttached = true;
    this.updateHeightRecursive();
  }

  private detatched() {
    this.isAttached = false;
  }

  private isCollapsedChanged(collapsed) {
    this.element.dispatchEvent(
      new CustomEvent(collapsed ? 'collapse' : 'expand', { bubbles: true })
    );
  }

  private updateHeightRecursive() {
    const { header, content } = this;
    let oldHeight = null;
    const updateHeight = () => {
      let newHeight = header.getBoundingClientRect().height;
      if (!this.isCollapsed) {
        newHeight += content.getBoundingClientRect().height;
      }
      if (newHeight !== oldHeight) {
        this.element.style.height = `${newHeight}px`;
        oldHeight = newHeight;
      }
      if (this.isAttached) {
        requestAnimationFrame(updateHeight);
      }
    };
    updateHeight();
  }
}
