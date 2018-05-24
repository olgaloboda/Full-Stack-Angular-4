//supports root compontent

//imports component from the Angular core library
import { Component } from '@angular/core';

//decorator that takes a js object as a parameter
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	//variable related to the frontend of the app
	title = 'app';
}
