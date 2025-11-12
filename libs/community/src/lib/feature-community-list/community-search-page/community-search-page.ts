import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {Store} from '@ngrx/store';
import {InfiniteScrollTrigger, SvgIconComponent} from '@tt/common-ui';
import {CommunityCard} from '../../ui/community-card/community-card';
import {communityActions, selectFilteredCommunities} from '../../../../../data-access/src/lib/community';
import {CommunityFilters} from '@tt/community';

@Component({
  selector: "tt-community-search-page",
  imports: [CommunityCard, InfiniteScrollTrigger, CommunityFilters, SvgIconComponent],
  templateUrl: "./community-search-page.html",
  styleUrl: "./community-search-page.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunitySearchPage {
  store = inject(Store)
  communities = this.store.selectSignal(selectFilteredCommunities);

  timeToFetch() {
    this.store.dispatch(communityActions.setPage({}))
  }

}
