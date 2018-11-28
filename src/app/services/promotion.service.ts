import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';

import { baseURL } from '../shared/baseurl';
import { Http, Response } from '@angular/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { RestangularModule, Restangular } from 'ngx-restangular';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
  	return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
  	//filter the dishes array and extract only those items from the array for which the dish.id matches id that has been supplied as a parameter to the dish
  	return this.restangular.one('promotions', id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
  	return this.restangular.all('promotions').getList({featured: true})
      .map(promotions => promotions[0]);
  }

}
