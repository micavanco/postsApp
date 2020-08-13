import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as PostsActions from './posts.actions';
import { PostsEntity } from './posts.models';

export const POSTS_FEATURE_KEY = 'posts';

export interface State extends EntityState<PostsEntity> {
  selectedId?: string | number; // which Posts record has been selected
  loaded: boolean; // has the Posts list been loaded
  error?: string | null; // last known error (if any)
  posts: object;
  postsFound: number;
  pageNumber: number;
  tablePageNumber: number;
}

export interface PostsPartialState {
  readonly [POSTS_FEATURE_KEY]: State;
}

export const postsAdapter: EntityAdapter<PostsEntity> = createEntityAdapter<
  PostsEntity
>();

export const initialState: State = postsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  posts: null,
  postsFound: 0,
  pageNumber: 0,
  tablePageNumber: 0
});

const postsReducer = createReducer(
  initialState,
  on(PostsActions.loadPosts, (state) => ({
    ...state,
    loaded: false,
    error: null,
    posts: null,
    postsFound: 0
  })),
  on(PostsActions.loadPostsSuccess, (state, { data }) =>
    ({...state, loaded: true, error: null, posts: data.posts, postsFound: data.found})
  ),
  on(PostsActions.loadPostsFailure, (state, { error }) => ({ ...state, error })),
  on(PostsActions.setTablePageNumber, (state, { tablePageNumber }) => ({ ...state, tablePageNumber }))
);

export function reducer(state: State | undefined, action: Action) {
  return postsReducer(state, action);
}
