export function dispatch(element: Element, event: string, detail?: any) {
  element.dispatchEvent(new CustomEvent(event, { bubbles: true, detail }));
}
