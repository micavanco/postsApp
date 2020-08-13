import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  POSTS_FEATURE_KEY,
  State,
  PostsPartialState,
  postsAdapter,
} from './posts.reducer';

// Lookup the 'Posts' feature state managed by NgRx
export const getPostsState = createFeatureSelector<PostsPartialState, State>(
  POSTS_FEATURE_KEY
);

const { selectAll } = postsAdapter.getSelectors();

export const getPostsLoaded = createSelector(
  getPostsState,
  (state: State) => state.loaded
);

export const getPostsError = createSelector(
  getPostsState,
  (state: State) => state.error
);

export const getAllPosts = createSelector(getPostsState, (state: State) =>
  selectAll(state)
);

export const getPostsData = createSelector(
  getPostsState,
  (state: State) => state.data
);

export const getSelectedId = createSelector(
  getPostsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
