import {Component, effect, inject, ViewChild} from '@angular/core';
import {ProfileHeader} from '../../common-ui/profile-header/profile-header';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProfileService} from '../../data/services/profile';
import {firstValueFrom} from 'rxjs';
import {AvatarUpload} from './avatar-upload/avatar-upload';
import {toObservable} from '@angular/core/rxjs-interop';
import {AsyncPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {SvgIcon} from '../../common-ui/svg-icon/svg-icon';

@Component({
  selector: 'tt-settings-page',
  imports: [
    ProfileHeader,
    ReactiveFormsModule,
    AvatarUpload,
    AsyncPipe,
    RouterLink,
    SvgIcon
  ],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss'
})
export class SettingsPage {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  profile$ = toObservable(this.profileService.me)

  @ViewChild (AvatarUpload) avatarUploader!: AvatarUpload

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: ['']
  })

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack)
      })
    });
  }

  onSave() {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) return

    if (this.avatarUploader.avatar) {
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar))
    }

    //@ts-ignore
    firstValueFrom(this.profileService.patchProfile({
        ...this.form.value,
      stack: this.splitStack(this.form.value.stack)
    }))
  }

  splitStack(stack: string | null | string[] | undefined): string[] {
    if (!stack) return []
    if (Array.isArray(stack)) return stack

    return stack.split(',')
  }

  mergeStack(stack: string | null | string[] | undefined) {
    if (!stack) return ''
    if (Array.isArray(stack)) return stack.join(',')

    return stack
  }
}
