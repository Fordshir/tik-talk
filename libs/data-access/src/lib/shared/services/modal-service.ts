import {ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {outputToObservable} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})

export class ModalService {
  #container?: ViewContainerRef


  registerContainer(vcr: ViewContainerRef) {
    this.#container = vcr;
  }

  show(component: any) {
    if (!this.#container) return
    const content:ComponentRef<any> = this.#container.createComponent(component)
    if (!content.instance.closed) return
    return outputToObservable(content.instance.closed);
  }

  close() {
    this.#container?.clear()
  }
}
