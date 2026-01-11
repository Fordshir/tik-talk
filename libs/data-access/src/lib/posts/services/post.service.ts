import {inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs'
import {CommentCreateDto, Post, PostComment, PostCreateDto} from '../interfaces/post.interface'
import {Router} from '@angular/router';
import {Pageable} from '@tt/data-access';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  #http = inject(HttpClient)
  router = inject(Router)

  baseApiUrl = '/yt-course/'


  createPost(payload: PostCreateDto) {
    return this.#http.post<Post>(`${this.baseApiUrl}post/`, payload)
  }

  fetchCommunityPosts(id: number) {
    return this.#http
      .get<Pageable<Post>>(`${this.baseApiUrl}community/${id}/posts`)
  }

  fetchPosts(id: number) {
    return this.#http
      .get<Post[]>(`${this.baseApiUrl}post/`, {params: {user_id: id}})
  }

  createComment(payload: CommentCreateDto) {
    return this.#http.post<PostComment>(`${this.baseApiUrl}comment/`, payload)
  }

  getCommentsByPostId(postId: number) {
    return this.#http
      .get<Post>(`${this.baseApiUrl}post/${postId}`)
      .pipe(map((res) => res.comments))
  }
}
