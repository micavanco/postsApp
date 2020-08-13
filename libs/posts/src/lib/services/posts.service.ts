import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseURL = 'https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/?number=';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getAllPostsByPage(pageNumber: number) {
    return this.http.get(baseURL + pageNumber)
  }
}
