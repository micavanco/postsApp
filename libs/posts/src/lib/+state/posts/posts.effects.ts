import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromPosts from './posts.reducer';
import * as PostsActions from './posts.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PostsService } from '../../services/posts.service';
import { of } from 'rxjs';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      mergeMap(() => this.postsService.getAllPostsByPage(0)
        .pipe(
          map(data => PostsActions.loadPostsSuccess({posts: data})),
          catchError(error => of(PostsActions.loadPostsFailure({error})))
        ))
    )
  );

  constructor(private actions$: Actions, private postsService: PostsService) {}
}
