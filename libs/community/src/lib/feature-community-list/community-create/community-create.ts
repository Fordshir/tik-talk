import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {ModalBase, Select, StackInput, SvgIconComponent, TtInput} from '@tt/common-ui';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommunityService, CommunityThemes, ModalService} from '@tt/data-access';
import {CreateCommunity} from '../../../../../data-access/src/lib/community/interface/community-interface';

@Component({
  selector: "tt-community-create",
  imports: [
    ModalBase,
    TtInput,
    ReactiveFormsModule,
    StackInput,
    SvgIconComponent,
    Select
  ],
  templateUrl: "./community-create.html",
  styleUrl: "./community-create.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCreate {
  fb = inject(FormBuilder);
  communityService = inject(CommunityService);
  modalService = inject(ModalService)
  themes = Object.values(CommunityThemes)
  communityCreateForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    themes: [[], Validators.required],
    tags: [[], Validators.required],
    description: [''],
  })

  onSubmit(){
    this.communityCreateForm.markAllAsTouched()
    this.communityCreateForm.updateValueAndValidity()

    if(this.communityCreateForm.invalid) return;

    const request: CreateCommunity = this.communityCreateForm.getRawValue()

    console.log(request)

    this.communityService.createCommunity(request).subscribe(() => {
      this.modalService.close();
    })
  }

  onDelete(){
    this.communityCreateForm.reset()
  }

  onCancel(){
    this.modalService.close();
  }
}
