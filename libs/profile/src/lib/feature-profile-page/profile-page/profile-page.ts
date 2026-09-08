import {ChangeDetectionStrategy, Component, inject, linkedSignal, OnInit, signal} from '@angular/core'
import {ProfileHeader} from '../../ui/profile-header/profile-header'
import {ActivatedRoute, Router, RouterLink} from '@angular/router'
import {switchMap} from 'rxjs'
import {toObservable} from '@angular/core/rxjs-interop'
import {AsyncPipe} from '@angular/common'
import {SubscriberCircle, SvgIconComponent} from '@tt/common-ui'
import {postsActions, ProfileService, selectedPosts} from '@tt/data-access'
import {PostFeed} from '@tt/posts'
import {Store} from '@ngrx/store';

@Component({
  selector: 'tt-profile-page',
  imports: [
    ProfileHeader,
    AsyncPipe,
    SvgIconComponent,
    RouterLink,
    PostFeed,
    SubscriberCircle
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePage implements OnInit {
  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)
  router = inject(Router)
  store = inject(Store)
  feed = this.store.selectSignal(selectedPosts)
  filteredFeed = linkedSignal(() => this.feed().filter(post => post.communityId === null))

  me$ = toObservable(this.profileService.me)
  subscribers$ = this.profileService.getSubscribersShortList(5)

  isMyPage = signal(false)

  profile$ = this.route.params.pipe(
    switchMap(({id}) => {
      this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id)
      if (id === 'me') return this.me$

      return this.profileService.getAccount(id)
    })
  )

  ngOnInit() {
    this.profile$.subscribe(profile => {
      if (profile) {
        this.store.dispatch(postsActions.postsGet({id: profile.id}))
      }
    })
  }

  async sendMessage(userId: number) {
    this.router.navigate(['/chats', 'new'], {queryParams: {userId}})
  }

  onCreatePost(postText: string) {
    if (!postText) return
    this.store.dispatch(
      postsActions.createPost({
        post: {
          title: 'клёвый пост',
          content: postText,
          authorId: this.profileService.me()!.id
        }
      })
    )
  }
}
