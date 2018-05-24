//supports root compontent

//imports component from the Angular core library
import { Component } from '@angular/core';

//decorator that takes a js object as a parameter
@Component({
  selector: 'app-root',
  //name of the template file for this component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	//variable related to the frontend of the app
	title = 'app';
}
