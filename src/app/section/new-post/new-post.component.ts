import { Component, OnInit, Input } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
declare var camera: any;
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  @Input() token: any;

  postUrl: string = 'http://localhost/pocketblog/wp-json/wp/v2/posts';
  categoryId!: number;
  image: any;
  newPost = {
    title: '',
    content: '',
    categories: [this.categoryId, 4],
    status: 'publish',
  };

  constructor(private http: HttpClient) {}
  createPost() {
    let headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json; charset=utf-8',
    });
    this.http
      .post(this.postUrl, JSON.stringify(this.newPost), { headers: headers })
      .subscribe((response) => {
        console.log(response);
      });
  }

  ngOnInit(): void {
    console.log(this.categoryId, this.image);
  }

  takePicture() {
    navigator.camera.getPicture(this.onSuccess, this.onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
    });
  }
  onSuccess(imageData: any) {
    let image = document.getElementById('image');
    this.image = 'data:image/jpeg;base64,' + imageData;
  }
  onFail(err: string) {
    alert('Operation Failed' + err);
  }
}
