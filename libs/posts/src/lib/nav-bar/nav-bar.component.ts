import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PostsActions from '../../lib/+state/posts/posts.actions';
import { getPostsFound } from '@wordpress-posts-app/posts';

@Component({
  selector: 'wordpress-posts-app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  foundPosts: number;
  currentPage = 0;
  barNumbers = [0, 1, 2, 3, 4];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(getPostsFound).subscribe(found => this.foundPosts = found/5);
  }

  onSelect(pageNumber: number) {
    this.currentPage = pageNumber;
    this.store.dispatch(PostsActions.setTablePageNumber({tablePageNumber: pageNumber}));
    if (pageNumber > 1) {
      this.barNumbers = [];
      for (let i = -2; i < 3; i++) {
        this.barNumbers.push(pageNumber + i);
        if (pageNumber + i > this.foundPosts) {
          break;
        }
      }
    }
  }

  onPrevious() {
    if(this.currentPage === 1) {
      this.barNumbers = [0, 1, 2, 3, 4];
    } else if (this.currentPage > 1){
      this.onSelect(this.currentPage - 1)
    }
  }

  onNext() {
    this.onSelect(this.currentPage + 1)
  }

}
