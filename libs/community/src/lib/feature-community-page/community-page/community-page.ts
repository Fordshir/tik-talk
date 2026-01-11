import {ChangeDetectionStrategy, Component, inject, linkedSignal, signal} from "@angular/core";
import {CommunityService, postsActions, ProfileService} from '@tt/data-access';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {switchMap, tap} from 'rxjs';
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
export class CommunityPage {
  profileService = inject(ProfileService)
  communityService = inject(CommunityService)
  route = inject(ActivatedRoute)
  store = inject(Store)
  myId = linkedSignal(()=> this.profileService.me()?.id)
  communityId = signal<number>(0)

  subscribers$ = this.route.params.pipe(
    switchMap(({id}) => {
      return this.communityService.getSubscribersShortList(id, 6)
    })
  )

  community$ = this.route.params.pipe(
    switchMap(({id}) => {
      return this.communityService.getCommunity(id).pipe(tap(()=> {this.communityId.set(id)}))
    })
  )

  onCreatePost(postText: string) {
    if (!postText) return
    this.store.dispatch(
      postsActions.createPost({
        post: {
          title: 'клёвый пост',
          content: postText,
          communityId: this.communityId()
        }
      })
    )
  }
}
