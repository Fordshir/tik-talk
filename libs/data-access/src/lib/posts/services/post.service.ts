import {inject, Injectable, signal} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable, switchMap, tap} from 'rxjs'
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

  posts = signal<Post[]>([])

  createPost(payload: PostCreateDto) {
    return this.#http.post<Post>(`${this.baseApiUrl}post/`, payload).pipe(
      switchMap(() => {
        return this.fetchPosts()
      })
    )
  }

  fetchCommunityPosts() {
    const userId = this.router.url.split('/')[2]
    return this.#http
      .get<Pageable<Post>>(`${this.baseApiUrl}community/${userId}/posts`)
      .pipe(tap((res) => this.posts.set(res.items)
      ))
  }

  fetchPosts() {
    const userId = this.router.url.split('/')[2]

    if (userId === 'me') {
      return this.#http
        .get<Post[]>(`${this.baseApiUrl}post/`)
        .pipe(tap((res) => this.posts.set(res)))
    }

    return this.#http
      .get<Post[]>(`${this.baseApiUrl}post/?user_id=${userId}`)
      .pipe(tap((res) => this.posts.set(res)))
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
