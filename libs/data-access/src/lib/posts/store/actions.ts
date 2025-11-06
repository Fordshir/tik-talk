import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {CommentCreateDto, Post, PostComment, PostCreateDto} from "../interfaces/post.interface";

export const postsActions = createActionGroup({
  source: '',
  events: {
    'posts get': emptyProps(),
    'create post': props<{ post: PostCreateDto }>(),
    'posts loaded': props<{ posts: Post[] }>(),

    'comments get': props<{postId: number}>(),
    'create comment': props<{ comment: CommentCreateDto }>(),
    'comments loaded': props<{ comments: PostComment[] }>(),
  }
})
