import {createFeature, createReducer, on} from '@ngrx/store'
import {communityActions} from './actions'
import {Community} from '../interface/community-interface'

export interface CommunityState {
  communities: Community[]
  newCommunity: Community
  communityFilters: Record<string, any>
  page: number
  size: number
}

export const initialStateCommunity: CommunityState = {
  communities: [],
  newCommunity: {
    id: 0,
    admin: {
      id: 0,
      username: "",
      avatarUrl: "",
      subscribersAmount: 0,
      firstName: "",
      lastName: "",
      isActive: false,
      stack: [],
      city: "",
      description: ""
    },
    name: "",
    themes: [],
    tags: [],
    bannerUrl: "",
    avatarUrl: "",
    description: "",
    subscribersAmount: 0,
    createdAt: "",
    isJoined: false
  },
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
    on(communityActions.newCommunity, (state, payload) => {
      return {
        ...state,
        communities: [payload.community, ...state.communities]
      }
    }),
    on(communityActions.deleteCommunity, (state, payload) => {
      return {
        ...state,
        communities: state.communities.filter(community => community.id !== payload.community_id)
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
