import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
})
export class AllPostsComponent implements OnInit {
  public posts: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getPosts();
  }
  getPosts() {
    this.apiService.getPosts().subscribe((data) => {
      this.posts = data;
      console.log('Data???', data);
    });
  }
  // viewPost(event: any) {

  // }
}
