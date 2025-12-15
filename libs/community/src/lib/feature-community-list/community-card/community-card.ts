import {ChangeDetectionStrategy, Component, inject, input, linkedSignal} from '@angular/core'
import {RouterLink} from '@angular/router'
import {ImgUrlPipe, SvgIconComponent} from '@tt/common-ui'
import {Community, CommunityService, ProfileService} from '@tt/data-access'
import {Store} from '@ngrx/store'
import {firstValueFrom} from 'rxjs'

@Component({
  selector: 'tt-community-card',
  imports: [ImgUrlPipe, RouterLink, SvgIconComponent],
  templateUrl: './community-card.html',
  styleUrl: './community-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityCard {
  community = input.required<Community>()
  me = inject(ProfileService).me()?.id
  communityService = inject(CommunityService)
  store = inject(Store)

  subscribers = linkedSignal(() => this.community().subscribersAmount)
  isJoined = linkedSignal(() => this.community().isJoined)

  async toSubscribe(community_id: number) {
    await firstValueFrom(this.communityService.communityToSub(community_id))
    this.isJoined.set(true)
    this.subscribers.set(this.subscribers() + 1)
  }

  async toUnsubscribe(community_id: number) {
    await firstValueFrom(this.communityService.communityToUnsub(community_id))
    this.isJoined.set(false)
    this.subscribers.set(this.subscribers() - 1)
  }

  async deleteCommunity(community_id: number) {
    await firstValueFrom(this.communityService.deleteCommunity(community_id))
  }
}
