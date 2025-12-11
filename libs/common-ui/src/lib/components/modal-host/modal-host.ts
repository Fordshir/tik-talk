import {AfterViewInit, ChangeDetectionStrategy, Component, inject, ViewChild, ViewContainerRef} from "@angular/core";
import {ModalService} from '@tt/data-access';
import {ModalBase} from '@tt/common-ui';

@Component({
  selector: "tt-modal-host",
  imports: [
    ModalBase

  ],
  templateUrl: "./modal-host.html",
  styleUrl: "./modal-host.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalHost implements AfterViewInit {
  #modalService = inject(ModalService);
  isShown = this.#modalService.isShown;
  @ViewChild ('hostContainer', {read: ViewContainerRef})
  hostContainer?: ViewContainerRef;

  ngAfterViewInit() {
    const hostContainer = this.hostContainer;

    if (!hostContainer) return;

    this.#modalService.registerContainer(hostContainer);
  }
}
