import {Injectable, TemplateRef, ViewContainerRef} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PortalService {
  #container?: ViewContainerRef

  registerContainer(vcr: ViewContainerRef) {
    this.#container = vcr;
  }

  render(template: TemplateRef<unknown>) {
    this.#container?.createEmbeddedView(template)
  }

  destroy() {
    this.#container?.clear()
  }
}
