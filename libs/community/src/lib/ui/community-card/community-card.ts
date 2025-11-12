import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef, HostListener, inject, input,
  Input
} from "@angular/core";
import {RouterLink} from "@angular/router";
import {ImgUrlPipe, SvgIconComponent} from '@tt/common-ui';
import {ProfileService, Community, CommunityService, communityActions} from '@tt/data-access';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {Store} from '@ngrx/store';
import {finalize, firstValueFrom, map, tap} from 'rxjs';

@Component({
  selector: "app-community-card",
  imports: [ImgUrlPipe, RouterLink, SvgIconComponent],
  templateUrl: "./community-card.html",
  styleUrl: "./community-card.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityCard {
  community = input.required<Community>();
  me = inject(ProfileService).me()?.id
  communityService = inject(CommunityService)
  store = inject(Store);

  async toSubscribe(community_id: number) {
    await firstValueFrom(this.communityService.communityToSub(community_id)).then(() => {
      this.store.dispatch(communityActions.communityUpdate())
    })
  }

  async toUnsubscribe(community_id: number) {
    await firstValueFrom(this.communityService.communityToUnsub(community_id)).then(() => {
      this.store.dispatch(communityActions.communityUpdate())
    })
  }
}
