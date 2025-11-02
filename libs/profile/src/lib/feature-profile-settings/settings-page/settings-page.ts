import {ChangeDetectionStrategy, Component, effect, inject, ViewChild} from "@angular/core";
import {ProfileHeader} from "../../ui/profile-header/profile-header";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {firstValueFrom} from "rxjs";
import {AvatarUpload} from "../../ui/avatar-upload/avatar-upload";
import {toObservable} from "@angular/core/rxjs-interop";
import {AsyncPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AddressInput, StackInput, SvgIconComponent} from '@tt/common-ui';
import {Auth, ProfileService} from '@tt/data-access';

@Component({
  selector: "tt-settings-page",
  imports: [
    ProfileHeader,
    ReactiveFormsModule,
    AvatarUpload,
    AsyncPipe,
    RouterLink,
    SvgIconComponent,
    StackInput,
    AddressInput,
  ],
  templateUrl: "./settings-page.html",
  styleUrl: "./settings-page.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  profile$ = toObservable(this.profileService.me);
  authService = inject(Auth);

  @ViewChild(AvatarUpload) avatarUploader!: AvatarUpload;

  form = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    username: [{ value: "", disabled: true }, Validators.required],
    description: [""],
    stack: [""],
    city: [null],
  });

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me()
      });
    });
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUploader.avatar)
      );
    }

    firstValueFrom(
    //@ts-ignore
      this.profileService.patchProfile({
        ...this.form.value
      })
    );
  }

}
