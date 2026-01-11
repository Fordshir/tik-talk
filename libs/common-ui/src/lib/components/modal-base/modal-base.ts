import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {SvgIconComponent} from '@tt/common-ui';
import {ModalService} from '@tt/data-access';

@Component({
  selector: "tt-modal-base",
  imports: [
    SvgIconComponent
  ],
  templateUrl: "./modal-base.html",
  styleUrl: "./modal-base.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalBase {
  #modalService = inject(ModalService);

  close() {
    this.#modalService.close();
  }
}
