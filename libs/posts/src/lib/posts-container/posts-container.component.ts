import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PostsActions from '../../lib/+state/posts/posts.actions';
import { getPosts, getPageNumber, getPostsLoaded } from '@wordpress-posts-app/posts';

@Component({
  selector: 'wordpress-posts-app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.scss']
})
export class PostsContainerComponent implements OnInit {
  posts: object[];
  pageNumber: number;
  didPostsLoaded: boolean;
  iterable = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(PostsActions.loadPosts());

    this.store.select(getPosts).subscribe(posts => this.posts = posts);

    this.store.select(getPageNumber).subscribe(page => this.pageNumber = page);

    this.store.select(getPostsLoaded).subscribe(loaded => this.didPostsLoaded = loaded)
  }

}
