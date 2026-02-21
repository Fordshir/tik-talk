import {ChangeDetectionStrategy, Component, computed, inject, input,} from "@angular/core";
import {DeleteConfirmationModal, ModalBase, Select, StackInput, SvgIconComponent, TtInput,} from "@tt/common-ui";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Community, communityActions, CommunityThemes, ModalService, UpdateCommunity,} from "@tt/data-access";
import {Store} from "@ngrx/store";
import {defaultIfEmpty, firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: "tt-community-create",
  imports: [
    ModalBase,
    TtInput,
    ReactiveFormsModule,
    StackInput,
    SvgIconComponent,
    Select,
  ],
  templateUrl: "./community-create.html",
  styleUrl: "./community-create.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCreate {
  fb = inject(FormBuilder);
  #modalService = inject(ModalService);
  store = inject(Store);
  router = inject(Router);
  themes = Object.values(CommunityThemes);
  community = input<Community>();
  communityCreateForm = computed(()=> {
    const community = this.community();
    return this.fb.nonNullable.group({
      name: [community?.name ?? "", Validators.required],
      themes: [community?.themes ?? [], Validators.required],
      tags: [community?.tags ?? [], Validators.required],
      description: [community?.description ?? ""],
    });
  })

  onSubmit() {
    const community = this.community();
    this.communityCreateForm().markAllAsTouched();
    this.communityCreateForm().updateValueAndValidity();

    if (this.communityCreateForm().invalid) return;

    const request: UpdateCommunity = this.communityCreateForm().getRawValue();

    community
      ? this.store.dispatch(communityActions.updateCommunity({ request, community_id: community.id }))
      : this.store.dispatch(communityActions.createCommunity({ request }));

    this.#modalService.close();
    community ? setTimeout(()=> {this.store.dispatch(communityActions.getCommunity({community_id: community.id}))}, 100) : null
  }

  async onDelete() {
    const community = this.community();
    if (community){
      this.#modalService.close()
      const res = await firstValueFrom(this.#modalService.show(DeleteConfirmationModal)?.pipe(defaultIfEmpty(false))!)

      if (res === false) {
        this.#modalService.close()
        this.#modalService.show(CommunityCreate, {community: community})
      }
      else if (res === true) {
        this.store.dispatch(communityActions.deleteCommunity({community_id: community.id}))
        this.router.navigate(['community'])
        this.#modalService.close()
      }
    }
    else {
      this.communityCreateForm().reset();
    }
  }

  onCancel() {
    this.#modalService.close();
  }
}
