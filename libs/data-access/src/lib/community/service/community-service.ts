import {inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Pageable} from '@tt/data-access'
import {Community, CreateCommunity} from '../interface/community-interface'
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  http = inject(HttpClient)
  baseApiUrl = '/yt-course/community/'

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

  createCommunity(request: CreateCommunity): Observable<Community> {
      return this.http.post<Community>(`${this.baseApiUrl}`, request
    )
  }

  deleteCommunity(community_id: number) {
    return this.http.delete(`${this.baseApiUrl}${community_id}`)
  }
}
