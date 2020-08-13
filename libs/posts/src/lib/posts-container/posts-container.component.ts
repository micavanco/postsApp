import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PostsActions from '../../lib/+state/posts/posts.actions';

@Component({
  selector: 'wordpress-posts-app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.scss']
})
export class PostsContainerComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(PostsActions.loadPosts());
  }

}
