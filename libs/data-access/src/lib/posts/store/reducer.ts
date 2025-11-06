import {createFeature, createReducer, on} from '@ngrx/store';
import {postsActions} from './actions';
import { Post } from "../interfaces/post.interface";


export interface PostsState {
  posts: Post[]
}

export const initialStatePosts: PostsState = {
  posts: []
}

export const postsFeature = createFeature({
  name: 'postsFeature',
  reducer: createReducer(
    initialStatePosts,
    on(postsActions.postsLoaded, (state, payload) => ({
      ...state,
      posts: payload.posts,
    }))
  )
})
