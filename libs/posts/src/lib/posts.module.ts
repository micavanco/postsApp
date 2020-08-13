import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsContainerComponent } from './posts-container/posts-container.component';
import { PostBoxComponent } from './post-box/post-box.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPosts from './+state/posts/posts.reducer';
import { PostsEffects } from './+state/posts/posts.effects';

const routes = [{ path: '', component: PostsContainerComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromPosts.POSTS_FEATURE_KEY, fromPosts.reducer),
    EffectsModule.forFeature([PostsEffects]),
  ],
  declarations: [
    PostsContainerComponent,
    PostBoxComponent,
    PostDetailsComponent,
  ],
  exports: [PostsContainerComponent],
})
export class PostsModule {}
