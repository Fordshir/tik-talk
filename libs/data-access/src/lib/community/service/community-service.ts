import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Pageble} from '@tt/data-access';
import {Community} from '../interface/community-interface';


@Injectable({
  providedIn: "root",
})

export class CommunityService {
  http = inject(HttpClient);
  baseApiUrl = "/yt-course/";

  filterCommunities(params: Record<string, any>) {
    return this.http
      .get<Pageble<Community>>(`${this.baseApiUrl}community/`, {
        params,
      })
  }

  communityToSub(community_id: number) {
    return this.http
      .post(`${this.baseApiUrl}community/${community_id}/join`, {})
  }

  communityToUnsub(community_id: number) {
    return this.http
      .delete(`${this.baseApiUrl}community/${community_id}/join`)
  }
}
