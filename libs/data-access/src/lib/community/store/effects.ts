import {inject, Injectable} from '@angular/core'
import {CommunityService} from '@tt/data-access'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {communityActions} from './actions'
import {map, switchMap, withLatestFrom} from 'rxjs'
import {Store} from '@ngrx/store'
import {selectCommunityFilters, selectCommunityPageable} from './selectors'

@Injectable({
  providedIn: 'root'
})
export class CommunityEffects {
  communityService = inject(CommunityService)
  actions$ = inject(Actions)
  store = inject(Store)

  filterCommunities = createEffect(() => {
    return this.actions$.pipe(
      ofType(communityActions.filterEvents, communityActions.setPage),
      withLatestFrom(
        this.store.select(selectCommunityFilters),
        this.store.select(selectCommunityPageable)
      ),
      switchMap(([_, filters, pageable]) => {
        return this.communityService.filterCommunities({
          ...pageable,
          ...filters
        })
      }),
      map((res) =>
        communityActions.communitiesLoaded({communities: res.items})
      )
    )
  })
}
