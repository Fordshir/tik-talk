import {inject, Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {postsActions} from './actions'
import {map, switchMap} from 'rxjs'
import {PostService} from '../services/post.service'
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsEffects {
  postService = inject(PostService)
  actions$ = inject(Actions)
  router = inject(Router)

  fetchPost = createEffect(() => {
      return this.actions$.pipe(
        ofType(postsActions.postsGet),
        switchMap(({}) => {
          return this.postService.fetchPosts()
        }),
        map((posts) => postsActions.postsLoaded({posts: posts}))
      )
  })

  fetchCommunityPosts = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.communityPostsGet),
      switchMap(({}) => {
        return this.postService.fetchCommunityPosts()
      }),
      map((posts) => postsActions.postsLoaded({posts: posts.items}))
    )
  })

  createPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.createPost),
      switchMap(({post}) => {
        return this.postService.createPost({
          title: post.title,
          content: post.content,
          authorId: post.authorId
        })
      }),
      map(() => postsActions.postsGet())
    )
  })

  createComment = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.createComment),
      switchMap(({comment}) => {
        return this.postService.createComment({
          text: comment.text,
          authorId: comment.authorId,
          postId: comment.postId
        })
      }),
      map(() => postsActions.postsGet())
    )
  })

  loadComments = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.commentsGet),
      switchMap(({postId}) => this.postService.getCommentsByPostId(postId)),
      map(() => postsActions.postsGet())
    )
  })
}
