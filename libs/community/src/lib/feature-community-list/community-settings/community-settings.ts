import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  communityActions,
  CommunityThemes,
  UpdateCommunity,
  ModalService,
  selectedCommunity
} from '@tt/data-access';
import {Store} from '@ngrx/store';
import {DeleteConfirmationModal, ModalBase, Select, StackInput, SvgIconComponent, TtInput} from '@tt/common-ui';
import {Router} from '@angular/router';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: "tt-community-settings",
  imports: [
    FormsModule,
    ModalBase,
    ReactiveFormsModule,
    Select,
    StackInput,
    SvgIconComponent,
    TtInput
  ],
  templateUrl: "./community-settings.html",
  styleUrl: "./community-settings.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitySettings {
  fb = inject(FormBuilder);
  #modalService = inject(ModalService)
  store = inject(Store)
  router = inject(Router);
  themes = Object.values(CommunityThemes)
  community = this.store.selectSignal(selectedCommunity)
  communityCreateForm = this.fb.nonNullable.group({
    name: [this.community().name, Validators.required],
    themes: [this.community().themes, Validators.required],
    tags: [this.community().tags, Validators.required],
    description: this.community().description,
  })


  onSubmit(){
    this.communityCreateForm.markAllAsTouched()
    this.communityCreateForm.updateValueAndValidity()

    if(this.communityCreateForm.invalid) return;

    const request: UpdateCommunity = this.communityCreateForm.getRawValue()

    this.store.dispatch(communityActions.updateCommunity({request, community_id: this.community().id}))

    this.#modalService.close()
    setTimeout(()=> {this.store.dispatch(communityActions.getCommunity({community_id: this.community().id}))}, 100)
  }

  async onDelete(){
    this.#modalService.close()
    const res = await firstValueFrom(this.#modalService.show(DeleteConfirmationModal)!)

    if (res === false) {
      this.#modalService.close()
      this.#modalService.show(CommunitySettings)
    }
    else if (res === true) {
      const community = this.community()
      if (!community) return
      this.store.dispatch(communityActions.deleteCommunity({community_id: community.id}))
      this.router.navigate(['community'])
      this.#modalService.close()
    }
  }

  onCancel() {
    this.#modalService.close();
  }
}
