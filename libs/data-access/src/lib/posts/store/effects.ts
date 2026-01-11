import {inject, Injectable, signal} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {postsActions} from "./actions";
import {map, switchMap, tap} from "rxjs";
import {PostService} from "../services/post.service";
import {idType} from "../interfaces/post.interface";

@Injectable({
  providedIn: "root",
})
export class PostsEffects {
  postService = inject(PostService);
  actions$ = inject(Actions);
  id = signal<idType>({ profileId: 0, communityId: 0 });

  fetchPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.postsGet),
      switchMap(({ id }) => {
        return this.postService.fetchPosts(id).pipe(
          tap(() => {
            this.id.set({ profileId: id, communityId: 0 });
          })
        );
      }),
      map((posts) => postsActions.postsLoaded({ posts: posts }))
    );
  });

  fetchCommunityPosts = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.communityPostsGet),
      switchMap(({ id }) => {
        return this.postService.fetchCommunityPosts(id).pipe(
          tap(() => {
            this.id.set({ communityId: id, profileId: 0 });
          })
        );
      }),
      map((posts) => postsActions.postsLoaded({ posts: posts.items }))
    );
  });

  createPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.createPost),
      switchMap(({ post }) => {
        return this.postService.createPost({
          title: post.title,
          content: post.content,
          authorId: post.authorId,
          communityId: post.communityId,
        });
      }),
      map(() =>
        this.id().communityId === 0
          ? postsActions.postsGet({ id: this.id().profileId })
          : postsActions.communityPostsGet({ id: this.id().communityId })
      )
    );
  });

  createComment = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.createComment),
      switchMap(({ comment }) => {
        return this.postService.createComment({
          text: comment.text,
          authorId: comment.authorId,
          postId: comment.postId,
        });
      }),
      map(() =>
        this.id().communityId === 0
          ? postsActions.postsGet({ id: this.id().profileId })
          : postsActions.communityPostsGet({ id: this.id().communityId })
      )
    );
  });

  loadComments = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.commentsGet),
      switchMap(({ postId }) => this.postService.getCommentsByPostId(postId)),
      map(() =>
        this.id().communityId === 0
          ? postsActions.postsGet({ id: this.id().profileId })
          : postsActions.communityPostsGet({ id: this.id().communityId })
      )
    );
  });
}
