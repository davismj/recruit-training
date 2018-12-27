import { inject, bindable, bindingMode } from 'aurelia-framework';

@inject(Element)
export class CollapseCustomElement {

  @bindable() heading = 'Collapse';
  @bindable({
    defaultBindingMode: bindingMode.twoWay,
    attribute: 'collapsed'
  }) isCollapsed = false;

  @bindable() sort;

  private isAttached = false;

  // refs
  private header: HTMLElement;
  private content: HTMLElement;

  constructor(
    public element: HTMLElement) { }

  private bind() {
    this.isCollapsed = this.isCollapsed || this.element.hasAttribute('collapsed');
  }

  private attached() {
    this.isAttached = true;
    this.updateHeightRecursive();
  }

  private detached() {
    this.isAttached = false;
  }

  private isCollapsedChanged(value: boolean, oldValue?: boolean) {
    this.element.dispatchEvent(
      new CustomEvent(value ? 'collapse' : 'expand', { bubbles: true })
    );
  }

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
