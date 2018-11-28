import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { RestangularModule, Restangular } from 'ngx-restangular';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';

@Injectable()
export class LeaderService {

	constructor(private restangular: Restangular,
				private processHTTPMsgService: ProcessHTTPMsgService) {}

	getLeaders(): Observable<Leader[]> {
		return this.restangular.all('leaders').getList();
	}

	getFeaturedLeader(): Observable<Leader> {
		return this.restangular.all('leaders').getList({featured: true})
			.map(leaders => leaders[0]);
  	}


}
