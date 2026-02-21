import {AfterViewInit, ChangeDetectionStrategy, Component, inject, input, linkedSignal, Type} from "@angular/core";
import {
  communityActions,
  ModalService,
  postsActions,
  ProfileService,
  selectedCommunity,
  selectedPosts,
  selectedSubscribers
} from '@tt/data-access';
import {PostFeed} from '@tt/posts';
import {BannerUrlPipe, SubscriberCircle, SvgIconComponent} from '@tt/common-ui';
import {CommunityHeader} from '../../ui/community-header/community-header';
import {CommunityShare} from '../../feature-community-list/community-share/community-share';
import {Store} from '@ngrx/store';
import {CommunityCreate} from '../../feature-community-list/community-create/community-create';

@Component({
  selector: "tt-community-page",
  imports: [
    PostFeed,
    CommunityHeader,
    SvgIconComponent,
    BannerUrlPipe,
    SubscriberCircle
  ],
  templateUrl: "./community-page.html",
  styleUrl: "./community-page.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityPage implements AfterViewInit{
  profileService = inject(ProfileService)
  store = inject(Store)
  modalService = inject(ModalService)
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

  showModal(component: Type<unknown>, input: Record<string, unknown>) {
    this.modalService.show(component, input)
  }

  protected readonly CommunityCreate = CommunityCreate;
  protected readonly SharePost = CommunityShare;
}
