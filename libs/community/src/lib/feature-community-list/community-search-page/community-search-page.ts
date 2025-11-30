import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { InfiniteScrollTrigger, SvgIconComponent } from '@tt/common-ui'
import { CommunityCard } from '../community-card/community-card'
import { CommunityFilters } from '../community-filters/community-filters'
import { communityActions, selectFilteredCommunities } from '@tt/data-access'

@Component({
	selector: 'tt-community-search-page',
	imports: [
		CommunityCard,
		InfiniteScrollTrigger,
		SvgIconComponent,
		CommunityFilters
	],
	templateUrl: './community-search-page.html',
	styleUrl: './community-search-page.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunitySearchPage {
	store = inject(Store)
	communities = this.store.selectSignal(selectFilteredCommunities)

	timeToFetch() {
		this.store.dispatch(communityActions.setPage({}))
	}
}
