import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wordpress-posts-app-post-box',
  templateUrl: './post-box.component.html',
  styleUrls: ['./post-box.component.scss']
})
export class PostBoxComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit(): void {
  }

}
