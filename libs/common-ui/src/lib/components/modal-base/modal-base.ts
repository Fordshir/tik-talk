import {ChangeDetectionStrategy, Component, inject, input} from "@angular/core";
import {SvgIconComponent} from '@tt/common-ui';
import {ModalService} from '@tt/data-access';
import {ClickOut} from '../../directives/tt-click-out';

@Component({
  selector: "tt-modal-base",
  imports: [
    SvgIconComponent,
    ClickOut
  ],
  templateUrl: "./modal-base.html",
  styleUrl: "./modal-base.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalBase {
  #modalService = inject(ModalService);

  header = input<String>('')

  close() {
    this.#modalService.close();
  }
}
