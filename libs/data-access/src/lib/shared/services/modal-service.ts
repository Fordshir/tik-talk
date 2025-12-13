import {Injectable, ViewContainerRef} from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ModalService {
  #container?: ViewContainerRef


  registerContainer(vcr: ViewContainerRef) {
    this.#container = vcr;
  }

  show(component: any) {
    this.#container?.createComponent(component)
  }

  close() {
    this.#container?.clear()
  }
}
