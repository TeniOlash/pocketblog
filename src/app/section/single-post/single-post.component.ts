import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  public post: any;
  public id: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.getSinglePost();
  }
  getSinglePost() {
    this.apiService.getSinglePost(this.id).subscribe((data) => {
      this.post = data;
      console.log('Data???', data);
    });
  }
}
