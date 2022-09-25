import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private siteUrl = 'http://localhost/pocketblog/';
  constructor(private http: HttpClient) {}
  getPosts() {
    const postsUrl = `${this.siteUrl}/wp-json/wp/v2/posts`;
    return this.http.get(postsUrl);
  }
  getSinglePost(id: any) {
    const postsUrl = `${this.siteUrl}/wp-json/wp/v2/posts/${id}`;
    return this.http.get(postsUrl);
  }
}
