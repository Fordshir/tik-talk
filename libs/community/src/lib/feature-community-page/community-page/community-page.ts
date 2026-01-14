import {AfterViewInit, ChangeDetectionStrategy, Component, inject, input, linkedSignal} from "@angular/core";
import {
  communityActions,
  postsActions,
  ProfileService,
  selectedCommunity,
  selectedPosts, selectedSubscribers
} from '@tt/data-access';
import {RouterLink} from '@angular/router';
import {PostFeed} from '@tt/posts';
import {BannerUrlPipe, ImgUrlPipe, SvgIconComponent} from '@tt/common-ui';
import {CommunityHeader} from '../../ui/community-header/community-header';
import {Store} from '@ngrx/store';

@Component({
  selector: "tt-community-page",
  imports: [
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
  store = inject(Store)
  myId = linkedSignal(()=> this.profileService.me()?.id)
  id = input<number>()
  feed = this.store.selectSignal(selectedPosts)

  subscribers = this.store.selectSignal(selectedSubscribers)

  community = this.store.selectSignal(selectedCommunity)

  ngAfterViewInit() {
    const id = this.id()
    if (!id) return
    this.store.dispatch(communityActions.getCommunity({community_id: id}))
    this.store.dispatch(communityActions.getCommunitySubscribers({community_id: id}))
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
