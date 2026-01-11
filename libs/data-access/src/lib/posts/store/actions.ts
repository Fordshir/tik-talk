import {createActionGroup, props} from '@ngrx/store'
import {CommentCreateDto, Post, PostComment, PostCreateDto} from '../interfaces/post.interface'

export const postsActions = createActionGroup({
  source: '',
  events: {
    'posts get': props<{ id: number }>(),
    'community posts get': props<{ id: number }>(),
    'create post': props<{ post: PostCreateDto }>(),
    'posts loaded': props<{ posts: Post[] }>(),
    'community posts loaded': props<{ posts: Post[] }>(),

    'comments get': props<{ postId: number }>(),
    'create comment': props<{ comment: CommentCreateDto }>(),
    'comments loaded': props<{ comments: PostComment[] }>()
  }
})
