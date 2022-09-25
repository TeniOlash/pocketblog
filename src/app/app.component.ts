import { Component } from '@angular/core';

declare var device: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  token: any = null;
  // title = 'pocket-blog';
}
