import { inject, inlineView, DOM } from 'aurelia-framework'
import { CollapseCustomElement } from './collapse';

@inject(DOM.Element)
@inlineView('<template class="collapse-group accordion" expand.delegate="onExpand($event)"><slot></slot></template>')
export class CollapseGroupCustomElement {

  constructor(
    private element: Element) { }

  private getChildCollapses(): Array<CollapseCustomElement> {
    return Array.from(this.element.children)
      .filter((el) => !el.classList.contains('.collapse-element'))
      .map((el: any) => el.au.controller.viewModel);
  }

  attached() {
    const collapses = this.getChildCollapses();
    const expanded = collapses.filter((c) => !c.isCollapsed);
    if (expanded.length > 1) {
      expanded.slice(1).forEach((c) => c.collapse());
    }
  }

  onExpand({ target }) {
    const collapses = this.getChildCollapses();
    const collapse = collapses.find((c) => c.element === target);
    if (collapse) {
      collapses
        .filter((c) => c !== collapse)
        .forEach((c) => c.collapse());
    }
  }
}
