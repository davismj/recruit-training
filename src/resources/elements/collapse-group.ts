import { inject, inlineView } from 'aurelia-framework';
import { CollapseCustomElement } from './collapse';

@inject(Element)
@inlineView(`
<template class="collapse-group-element accordion"
          expand.delegate="expand($event)">
  <slot></slot>
</template>
`)
export class CollapseGroupCustomElement {

  constructor(
    public element: Element) { }

  private getChildCollapses(): Array<CollapseCustomElement> {
    return Array.from(this.element.querySelectorAll('collapse'))
      .filter((el) => !el.classList.contains('.collapse-element'))
      .map((el: any) => el.au.controller.viewModel)
  }

  private attached() {
    const collapses = this.getChildCollapses();
    const expanded = collapses.filter((c) => !c.isCollapsed);
    if (expanded.length > 1) {
      expanded.slice(1).forEach((c) => c.collapse());
    }
  }

  expand(event: CustomEvent) {
    const collapses = this.getChildCollapses();
    const collapse = collapses.find((c) => c.element === event.target);
    if (collapse) {
      collapses
        .filter((c) => c !== collapse)
        .forEach((c) => c.collapse());
    }
  }
}
