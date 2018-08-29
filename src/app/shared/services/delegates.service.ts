import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { forkJoin } from "rxjs/observable/forkJoin";

@Injectable()
export class DelegatesService {

  constructor(private http: Http) { }

  /* For All Delegate List Services */
  getDelegatesDetail(limit, offset) {
    return this.http.get(environment.serverUrl + '/api/delegates', {
      params: {
        limit: limit,
        offset: offset
      }
    })
      .map((res: Response) => res.json());
  }

  getStandbyDelegates(limit, offset) {
    return this.http.get(environment.serverUrl + '/api/delegates', {
      params: {
        offset: offset
      }
    })
    .map((res: Response) => res.json());
  }

  getNextForgers(limit) {
    return this.http.get(environment.serverUrl + '/api/delegates/getNextForgers', {
      params: {
        limit: limit
      }
    })
      .map((res: Response) => res.json());

  }

  getLatestVotes(limit) {
    return this.http.get(environment.serverUrl + '/api/delegates/getLatestVoters', {
      params: {
        limit: limit
      }
    })
      .map((res: Response) => res.json());

  }

  getLatestDelegates(limit) {
    return this.http.get(environment.serverUrl + '/api/delegates/getLatestDelegates', {
      params: {
        limit: limit
      }
    })
    .map((res: Response) => res.json());
  }

  getDelegate(publicKey) {
    return this.http.get(environment.serverUrl + '/api/delegates/get?publicKey=' + publicKey)
    .map((res: Response) => res.json());
  }

  getVoters(publickey) {
    return this.http.get(environment.serverUrl + '/api/delegates/voters?publicKey=' + publickey)
    .map((res: Response) => res.json());
  }

  getPrice() {
    return this.http.get('http://ddkoin.com/price/price-ddk-api.php?com=sell')
    .map((res: Response) => res.json());
  }
}


