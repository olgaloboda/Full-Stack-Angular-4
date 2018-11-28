import { Injectable } from '@angular/core';
import { Feedback, ContactType } from '../shared/feedback';
import { Http, Response } from '@angular/http';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { RestangularModule, Restangular } from 'ngx-restangular';

import { Observable } from 'rxjs/Observable';



@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular,
  			  private processHTTPMsgService: ProcessHTTPMsgService) { }


  // getOneFeedback(): Observable<Feedback[]> {
  // 	return this.restangular.all('feedback').getList();
  // }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
  	return this.restangular.all('feedback').post(feedback);
  }

}
