import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  user = {
    login: 'TeniOlash',
    password: 'Perseverance000@',
  };
  @Input() token: any;
  @Output() tokenChange = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  // ...
  auth() {
    this.http
      .post('http://localhost/pocketblog/wp-json/jwt-auth/v1/token', {
        username: this.user.login,
        password: this.user.password,
      })
      .subscribe((data: any) => {
        if (data['token']) {
          this.token = data['token'];
          this.tokenChange.emit(this.token);
          localStorage.setItem('jwt', this.token);
          console.log(this.token);
        }
      });
  }
}
