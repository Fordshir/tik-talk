import {Directive, HostListener, inject, Renderer2} from '@angular/core';
import {ModalService} from '@tt/data-access';

@Directive({
  selector: '[clickout]'
})

export class ClickOut {
  modalService = inject(ModalService);
  r2 = inject(Renderer2)
  @HostListener('click', ['$event'])
  onClickOut(event: MouseEvent) {
    const target = event.target as HTMLElement
    const currentTarget = event.currentTarget as HTMLElement
    if (currentTarget.contains(target)) return

    this.modalService.close();
  }
}
