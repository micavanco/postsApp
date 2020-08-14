import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as PostsActions from './posts.actions';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { PostsService } from '../../services/posts.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from './posts.reducer';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      withLatestFrom(this.store$),
      mergeMap(([action, store]) => this.postsService.getAllPostsByPage(store.posts.pageNumber)
        .pipe(
          map(data => PostsActions.loadPostsSuccess({data})),
          catchError(error => of(PostsActions.loadPostsFailure({error})))
        ))
    )
  );

  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPost),
      withLatestFrom(this.store$),
      mergeMap(([action, store]) => this.postsService.getPostById(store.posts.selectedId)
        .pipe(
          map(data => PostsActions.loadPostSuccess({data})),
          catchError(error => of(PostsActions.loadPostFailure({error})))
        ))
    )
  );

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadComments),
      withLatestFrom(this.store$),
      mergeMap(([action, store]) => this.postsService.getComments(store.posts.selectedId)
        .pipe(
          map(data => PostsActions.loadCommentsSuccess({data})),
          catchError(error => of(PostsActions.loadCommentsFailure({error})))
        ))
    )
  );

  constructor(private actions$: Actions, private postsService: PostsService, private store$: Store<State>) {}
}
