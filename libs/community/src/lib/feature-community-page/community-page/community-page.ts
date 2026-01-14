import {AfterViewInit, ChangeDetectionStrategy, Component, inject, input, linkedSignal} from "@angular/core";
import {CommunityService, postsActions, ProfileService, selectedPosts} from '@tt/data-access';
import {RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {PostFeed} from '@tt/posts';
import {BannerUrlPipe, ImgUrlPipe, SvgIconComponent} from '@tt/common-ui';
import {CommunityHeader} from '../../ui/community-header/community-header';
import {Store} from '@ngrx/store';

@Component({
  selector: "tt-community-page",
  imports: [
    AsyncPipe,
    RouterLink,
    PostFeed,
    ImgUrlPipe,
    CommunityHeader,
    SvgIconComponent,
    ImgUrlPipe,
    ImgUrlPipe,
    BannerUrlPipe
  ],
  templateUrl: "./community-page.html",
  styleUrl: "./community-page.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityPage implements AfterViewInit{
  profileService = inject(ProfileService)
  communityService = inject(CommunityService)
  store = inject(Store)
  myId = linkedSignal(()=> this.profileService.me()?.id)
  id = input<number>()
  feed = this.store.selectSignal(selectedPosts)

  subscribers$ = linkedSignal(() => {
    const id = this.id()
    if (!id) return
    return this.communityService.getSubscribersShortList(id, 6)
  })

  community$ = linkedSignal(() => {
    const id = this.id()
    if (!id) return
      return this.communityService.getCommunity(id)
  })


  ngAfterViewInit() {
    const id = this.id()
    if (!id) return
    this.store.dispatch(postsActions.communityPostsGet({id}))

  }

  onCreatePost(postText: string) {
    if (!postText) return
    this.store.dispatch(
      postsActions.createPost({
        post: {
          title: 'клёвый пост сообщества',
          content: postText,
          communityId: this.id()
        }
      })
    )
  }
}
