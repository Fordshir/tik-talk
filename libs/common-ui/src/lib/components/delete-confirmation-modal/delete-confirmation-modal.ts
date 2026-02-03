import {ChangeDetectionStrategy, Component, EventEmitter, inject, output, Output} from "@angular/core";
import {ModalBase} from "@tt/common-ui";
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {communityActions, ModalService, selectedCommunity} from '@tt/data-access';

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
