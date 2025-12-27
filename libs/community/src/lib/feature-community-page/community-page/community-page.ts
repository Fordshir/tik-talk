import {ChangeDetectionStrategy, Component, inject, linkedSignal} from "@angular/core";
import {CommunityService, ProfileService} from '@tt/data-access';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {PostFeed} from '@tt/posts';
import {ImgUrlPipe, SvgIconComponent, BannerUrlPipe} from '@tt/common-ui';
import {CommunityHeader} from '../../ui/community-header/community-header';
import {toSignal} from '@angular/core/rxjs-interop';

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
  myId = linkedSignal(()=> this.profileService.me()?.id)

  subscribers$ = this.route.params.pipe(
    switchMap(({id}) => {
      return this.communityService.getSubscribersShortList(id, 6)
    })
  )

  community$ = this.route.params.pipe(
    switchMap(({id}) => {
      return this.communityService.getCommunity(id)
    })
  )
}
