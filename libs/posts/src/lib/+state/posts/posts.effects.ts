import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromPosts from './posts.reducer';
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
      mergeMap(([action, store]) => this.postsService.getAllPostsByPage(store.pageNumber)
        .pipe(
          map(data => PostsActions.loadPostsSuccess({data})),
          catchError(error => of(PostsActions.loadPostsFailure({error})))
        ))
    )
  );

  constructor(private actions$: Actions, private postsService: PostsService, private store$: Store<State>) {}
}
