import { createAction, props } from '@ngrx/store';

export const loadPosts = createAction('[Posts] Load Posts');

export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ data: any }>()
);

export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: any }>()
);

export const setPageNumber = createAction(
  '[Posts] Set Page Number',
  props<{ pageNumber: number }>()
);

export const loadPost = createAction('[Posts] Load Post', props<{ id: any }>());

export const loadPostSuccess = createAction(
  '[Posts] Load Post Success',
  props<{ data: any }>()
);

export const loadPostFailure = createAction(
  '[Posts] Load Post Failure',
  props<{ error: any }>()
);

export const loadComments = createAction('[Posts] Load Comments', props<{ id: any }>());

export const loadCommentsSuccess = createAction(
  '[Posts] Load Comments Success',
  props<{ data: any }>()
);

export const loadCommentsFailure = createAction(
  '[Posts] Load Comments Failure',
  props<{ error: any }>()
);
