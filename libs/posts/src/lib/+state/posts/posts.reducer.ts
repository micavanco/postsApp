import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as PostsActions from './posts.actions';
import { PostsEntity } from './posts.models';

export const POSTS_FEATURE_KEY = 'posts';

export interface State extends EntityState<PostsEntity> {
  selectedId?: string | number; // which Posts record has been selected
  loaded: boolean; // has the Posts list been loaded
  error?: string | null; // last known error (if any)
  data: object;
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
  data: null
});

const postsReducer = createReducer(
  initialState,
  on(PostsActions.loadPosts, (state) => ({
    ...state,
    loaded: false,
    error: null,
    data: null
  })),
  on(PostsActions.loadPostsSuccess, (state, { posts }) =>
    ({...state, loaded: true, error: null, data: posts})
  ),
  on(PostsActions.loadPostsFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return postsReducer(state, action);
}
