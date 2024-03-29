import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import 'rxjs/add/observable/throw';

@Injectable()
export class ProcessHTTPMsgService {

  constructor() { }

  public extractData(res: Response) {
  	let body = res.json();

  	//if the body is null, then return an empty object
  	return body || { };
  }

  public handleError(error: Response | any) {
  	let errMsg: string;

  	if (error instanceof Response) {
  		const body = error.json() || '';
  		const err = body.error || JSON.stringify(body);
  		errMsg = `${err.status} - ${err.statusText || ''} ${err}`;
   	} else {
   		errMsg = error.message ? error.message : error.toString();
  	}

  	return Observable.throw(errMsg);

  }

}
