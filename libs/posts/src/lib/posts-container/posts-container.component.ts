import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PostsActions from '../../lib/+state/posts/posts.actions';
import { getPosts, getTablePageNumber } from '@wordpress-posts-app/posts';

@Component({
  selector: 'wordpress-posts-app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.scss']
})
export class PostsContainerComponent implements OnInit {
  posts: object[];
  pageNumber: number;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(PostsActions.loadPosts());

    this.store.select(getPosts).subscribe(posts => this.posts = posts);

    this.store.select(getTablePageNumber).subscribe(page => this.pageNumber = page);
  }

}
