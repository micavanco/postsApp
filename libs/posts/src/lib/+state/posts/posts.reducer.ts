import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as PostsActions from './posts.actions';
import { PostsEntity } from './posts.models';

export const POSTS_FEATURE_KEY = 'posts';

export interface State extends EntityState<PostsEntity> {
  selectedId?: string | number; // which Posts record has been selected
  loaded: boolean; // has the Posts list been loaded
  error?: string | null; // last known error (if any)
  posts: any;
  post: any;
  postsFound: number;
  pageNumber: number;
  loadedPost: boolean;
  comments: any;
  errorPost?: string;
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
  loadedPost: false,
  posts: null,
  post: null,
  comments: null,
  postsFound: 0,
  pageNumber: 0,
});

const postsReducer = createReducer(
  initialState,
  on(PostsActions.loadPosts, (state) => ({
    ...state,
    loaded: false,
    error: null,
    posts: null
  })),
  on(PostsActions.loadPostsSuccess, (state, { data }) =>
    ({...state, loaded: true, error: null, posts: data.posts, postsFound: data.found})
  ),
  on(PostsActions.loadPostsFailure, (state, { error }) => ({ ...state, error })),
  on(PostsActions.loadPost, (state, {id}) => ({
    ...state,
    selectedId: id,
    loadedPost: false,
    post: null
  })),
  on(PostsActions.loadPostSuccess, (state, { data }) =>
    ({...state, loadedPost: true, errorPost: null, post: data})
  ),
  on(PostsActions.loadPostFailure, (state, { error }) => ({ ...state, errorPost: error })),
  on(PostsActions.setPageNumber, (state, { pageNumber }) => ({ ...state, pageNumber })),
  on(PostsActions.loadComments, (state, {id}) => ({
    ...state,
    comments: null
  })),
  on(PostsActions.loadCommentsSuccess, (state, { data }) =>
    ({...state, comments: data})
  ),
  on(PostsActions.loadCommentsFailure, (state, { error }) => ({ ...state })),
);

export function reducer(state: State | undefined, action: Action) {
  return postsReducer(state, action);
}
