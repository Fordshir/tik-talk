import {AfterViewInit, ChangeDetectionStrategy, Component, computed, inject, input, signal} from "@angular/core";
import {ChatsService, postsActions, Profile, ProfileService} from '@tt/data-access';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ChooseControl, ModalBase, SvgIconComponent, TtInput, TtRadio} from '@tt/common-ui';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {from, mergeMap, switchMap} from 'rxjs';

@Component({
  selector: "tt-community-share",
  imports: [
    ModalBase,
    ReactiveFormsModule,
    TtRadio,
    ChooseControl,
    SvgIconComponent,
    TtInput
  ],
  templateUrl: "./community-share.html",
  styleUrl: "./community-share.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityShare implements AfterViewInit {
  fb = inject(FormBuilder);
  store = inject(Store);
  profileService = inject(ProfileService);
  chatService = inject(ChatsService);
  subscribers = input<Profile[]>([]);
  router = inject(Router);
  link = signal<string>('')

  shareForm = this.fb.nonNullable.group({
    type: [''],
    target: [],
    search: [''],
    text: ['']
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

  }

  ngAfterViewInit() {
    this.link.set(`https://${this.profileService.me()?.username}.icherniakov.ru${this.router.url}`)
  }
}
