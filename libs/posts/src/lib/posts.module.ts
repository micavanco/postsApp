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
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsService } from './services/posts.service';

const routes = [{ path: '', component: PostsContainerComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forRoot({}),
    StoreModule.forFeature(fromPosts.POSTS_FEATURE_KEY, fromPosts.reducer),
    EffectsModule.forFeature([PostsEffects]),
    EffectsModule.forRoot([]),
    HttpClientModule
  ],
  declarations: [
    PostsContainerComponent,
    PostBoxComponent,
    PostDetailsComponent,
    NavBarComponent,
  ],
  providers: [HttpClientModule, PostsService],
  exports: [PostsContainerComponent],
})
export class PostsModule {}
