import {
  ChangeDetectionStrategy,
  Component,
  computed, DestroyRef,
  inject,
  input,
  signal
} from "@angular/core";
import {ChatsService, postsActions, Profile, ProfileService} from '@tt/data-access';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChooseControl, ModalBase, SvgIconComponent, TtInput, TtRadio, TtTextarea} from '@tt/common-ui';
import {Store} from '@ngrx/store';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {from, mergeMap, switchMap} from 'rxjs';
import {NgClass} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: "tt-community-share",
  imports: [
    ModalBase,
    ReactiveFormsModule,
    TtRadio,
    ChooseControl,
    SvgIconComponent,
    TtInput,
    NgClass,
    TtTextarea
  ],
  templateUrl: "./community-share.html",
  styleUrl: "./community-share.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityShare {
  fb = inject(FormBuilder);
  store = inject(Store);
  profileService = inject(ProfileService);
  chatService = inject(ChatsService);
  subscribers = input<Profile[]>([]);
  link = signal<string>('');
  submitted = signal<boolean>(false);
  id = input<number>();
  destroyRef = inject(DestroyRef);
  router = inject(Router);

  radioOptions = [
    { value: 'wall', label: 'На своей странице' },
    { value: 'message', label: 'В личном сообщении' }
  ];

  shareForm = this.fb.nonNullable.group({
    type: ['', Validators.required],
    target: [],
    search: [''],
    text: ['', Validators.required],
  })

  searchValue = toSignal(this.shareForm.controls.search.valueChanges)
  filteredSubscribers = computed(() => {
    const search = this.searchValue()?.toLowerCase() ?? ''
    const list = this.subscribers()

    if (!search) return list

    return list.filter(sub =>
      sub.firstName.toLowerCase().includes(search) || sub.lastName.toLowerCase().includes(search)
    )
  })

  constructor() {
    this.shareForm.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe( () => {
          if (this.shareForm.controls.type.value === 'wall') {
            this.shareForm.controls.target.clearValidators()
            this.shareForm.controls.target.updateValueAndValidity()
          }
          else if (this.shareForm.controls.type.value === 'message') {
            this.shareForm.controls.target.setValidators(Validators.required)
            this.shareForm.controls.target.updateValueAndValidity()
          }
      })
  }

  onSubmit() {
    this.shareForm.markAllAsTouched()
    this.shareForm.updateValueAndValidity()

    if (this.shareForm.invalid) return

    if (this.shareForm.controls.type.value === 'wall') {
      this.store.dispatch(postsActions.createPost({
        post: {
          title: 'share post',
          content: `${this.shareForm.controls.text.value}, ${this.router.url}`,
          authorId: this.profileService.me()!.id
        }
      }))
      this.submitted.set(true)
    }
    else if (this.shareForm.controls.type.value === 'message') {
      from(this.shareForm.controls.target.value).pipe(
        mergeMap(id =>
          this.chatService.createChat(id).pipe(
            switchMap(chat =>
              this.chatService.sendMessage(this.shareForm.controls.text.value, chat.id)
            )
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe();
      this.submitted.set(true)
    }
  }
}
