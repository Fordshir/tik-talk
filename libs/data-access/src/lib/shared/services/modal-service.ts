import {Injectable, signal, ViewContainerRef} from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ModalService {
  #container?: ViewContainerRef
  isShown = signal(false)

  registerContainer(vcr: ViewContainerRef) {
    this.#container = vcr;
  }

  show() {
    this.isShown.set(true)
  }

  close() {
    this.isShown.set(false)
  }
}
