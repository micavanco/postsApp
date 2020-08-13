import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromPosts from './posts.reducer';
import * as PostsActions from './posts.actions';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return PostsActions.loadPostsSuccess({ posts: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return PostsActions.loadPostsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
