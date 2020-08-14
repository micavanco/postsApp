import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getComments, getSelectedPost, loadComments, loadPost } from '@wordpress-posts-app/posts';

@Component({
  selector: 'wordpress-posts-app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post: any;
  comments: any;
  postId: number;

  constructor(private route: ActivatedRoute,
              private router: Router ,
              private store: Store) {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.store.dispatch(loadPost({id: this.postId}));
      this.store.dispatch(loadComments({id: this.postId}));
    });
  }

  ngOnInit(): void {
    this.store.select(getSelectedPost).subscribe(post => this.post = post);

    this.store.select(getComments).subscribe(comments => this.comments = comments);
  }

}
