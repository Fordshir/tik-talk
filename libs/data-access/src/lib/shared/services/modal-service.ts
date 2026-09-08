import {ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {outputToObservable} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})

export class ModalService {
  #container?: ViewContainerRef

  registerContainer(vcr: ViewContainerRef) {
    this.#container = vcr;
  }

  show(component: Type<unknown>, inputs: Record<string, unknown> = {}) {
    if (!this.#container) return
    const content:ComponentRef<any> = this.#container.createComponent(component)
    for (const [key, val] of Object.entries(inputs)) {
      content.setInput(key, val);
    }
    if (!('closed' in content.instance)) return
    return outputToObservable(content.instance.closed);
  }

  close() {
    this.#container?.clear()
  }
}
