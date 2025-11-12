import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Community} from '../interface/community-interface';

export const communityActions = createActionGroup({
  source: '',
  events: {
    'filter events': props<{ filters: Record<string, any> }>(),
    'set page': props<{ page?: number }>(),
    'communities loaded': props<{ communities: Community[] }>(),
    'communities updated': props<{ communities: Community[] }>(),
    'community update': emptyProps(),
  }
})
