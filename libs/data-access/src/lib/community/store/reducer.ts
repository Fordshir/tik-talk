import { createFeature, createReducer, on } from '@ngrx/store'
import { communityActions } from './actions'
import { Community } from '../interface/community-interface'

export interface CommunityState {
	communities: Community[]
	communityFilters: Record<string, any>
	page: number
	size: number
}

export const initialStateCommunity: CommunityState = {
	communities: [],
	communityFilters: {},
	page: 1,
	size: 10
}

export const communityFeature = createFeature({
	name: 'communityFeature',
	reducer: createReducer(
		initialStateCommunity,
		on(communityActions.communitiesLoaded, (state, payload) => {
			return {
				...state,
				communities: state.communities.concat(payload.communities)
			}
		}),
		on(communityActions.filterEvents, (state, payload) => {
			return {
				...state,
				communities: [],
				communityFilters: payload.filters,
				page: 1
			}
		}),
		on(communityActions.setPage, (state, payload) => {
			let page = payload.page
			if (!page) page = state.page + 1

			return {
				...state,
				page
			}
		})
	)
})
