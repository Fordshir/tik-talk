import {createSelector} from '@ngrx/store';
import {postsFeature} from './reducer';

export const selectedPosts = createSelector(
  postsFeature.selectPosts,
  (posts) => posts
)
