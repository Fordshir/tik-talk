import {ChangeDetectionStrategy, Component, output} from "@angular/core";
import {ModalBase} from "@tt/common-ui";

@Component({
  selector: "tt-delete-confirmation-modal",
	imports: [
		ModalBase
	],
  templateUrl: "./delete-confirmation-modal.html",
  styleUrl: "./delete-confirmation-modal.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConfirmationModal {
  closed = output<boolean>()
  onYes() {
    this.closed.emit(true);
  }

  onNo() {
    this.closed.emit(false);
  }
}
