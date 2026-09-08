import {inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Pageable, Profile} from '@tt/data-access'
import {Community, UpdateCommunity} from '../interface/community-interface'
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  http = inject(HttpClient)
  baseApiUrl = '/yt-course/community/'

  getCommunity(community_id: number){
    return this.http.get<Community>(`${this.baseApiUrl}${community_id}`)
  }

  getSubscribersShortList(community_id: number, subsAmount = 3) {
    return this.http
      .get<Pageable<Profile>>(`${this.baseApiUrl}subscribers/${community_id}`)
      .pipe(map((res) => res.items.slice(0, subsAmount)))
  }

  filterCommunities(params: Record<string, any>) {
    return this.http.get<Pageable<Community>>(`${this.baseApiUrl}`, {
      params
    })
  }

  communityToSub(community_id: number) {
    return this.http.post(
      `${this.baseApiUrl}${community_id}/join`,
      {}
    )
  }

  communityToUnsub(community_id: number) {
    return this.http.delete(`${this.baseApiUrl}${community_id}/join`)
  }

  createCommunity(request: UpdateCommunity): Observable<Community> {
      return this.http.post<Community>(`${this.baseApiUrl}`, request
    )
  }

  updateCommunity(request: UpdateCommunity, community_id: number): Observable<Community> {
      return this.http.patch<Community>(`${this.baseApiUrl}${community_id}`, request
    )
  }

  deleteCommunity(community_id: number) {
    return this.http.delete(`${this.baseApiUrl}${community_id}`)
  }
}
