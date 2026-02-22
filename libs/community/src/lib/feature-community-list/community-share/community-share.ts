import {AfterViewInit, ChangeDetectionStrategy, Component, computed, inject, input, signal} from "@angular/core";
import {ChatsService, postsActions, Profile, ProfileService} from '@tt/data-access';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChooseControl, ModalBase, SvgIconComponent, TtInput, TtRadio} from '@tt/common-ui';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {from, mergeMap, switchMap} from 'rxjs';
import {NgClass} from '@angular/common';

@Component({
  selector: "tt-community-share",
  imports: [
    ModalBase,
    ReactiveFormsModule,
    TtRadio,
    ChooseControl,
    SvgIconComponent,
    TtInput,
    NgClass
  ],
  templateUrl: "./community-share.html",
  styleUrl: "./community-share.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityShare implements AfterViewInit {
  fb = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);
  profileService = inject(ProfileService);
  chatService = inject(ChatsService);
  subscribers = input<Profile[]>([]);
  link = signal<string>('');
  submitted = signal<boolean>(false);

  shareForm = this.fb.nonNullable.group({
    type: ['', Validators.required],
    target: [[], Validators.required],
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

  onSubmit() {
    const type = this.shareForm.controls.type.value
    const text = this.shareForm.controls.text.value
    this.shareForm.markAllAsTouched()
    this.shareForm.updateValueAndValidity()

    if (type === 'На своей странице') {
      this.store.dispatch(postsActions.createPost({
        post: {
          title: 'share post',
          content: `${text}, ${this.link()}`,
          authorId: this.profileService.me()!.id
        }
      }))
    }
    else {
      const ids = this.shareForm.controls.target.value;
      from(ids).pipe(
        mergeMap(id =>
          this.chatService.createChat(id).pipe(
            switchMap(chat =>
              this.chatService.sendMessage(text, chat.id)
            )
          )
        )
      ).subscribe();
    }
    this.submitted.set(true)
  }

  ngAfterViewInit() {
    this.link.set(`https://${this.profileService.me()?.username}.icherniakov.ru${this.router.url}`)
  }
}
