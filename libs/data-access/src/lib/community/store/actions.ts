import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {Community, CreateCommunity} from '../interface/community-interface'

export const communityActions = createActionGroup({
  source: '',
  events: {
    'filter events': props<{ filters: Record<string, any> }>(),
    'set page': props<{ page?: number }>(),
    'communities loaded': props<{ communities: Community[] }>(),
    'create community': props<{ request: CreateCommunity }>(),
    'new community': props<{community: Community}>(),
    'delete community': props<{ community_id: number }>(),
    'communities reload': emptyProps()
  }
})
