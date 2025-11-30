import { createSelector } from '@ngrx/store'
import { communityFeature } from './reducer'

export const selectFilteredCommunities = createSelector(
	communityFeature.selectCommunities,
	(communities) => {
		return communities
	}
)

export const selectCommunityPageable = createSelector(
	communityFeature.selectCommunityFeatureState,
	(state) => ({
		page: state?.page ?? 1,
		size: state?.size ?? 10
	})
)

export const selectCommunityFilters = createSelector(
	communityFeature.selectCommunityFilters,
	(filters) => filters
)
