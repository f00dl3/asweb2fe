import { Component } from '@angular/core';
import { SharedBeans as sb } from './SharedBeans';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string = sb.apiTitle;
}
