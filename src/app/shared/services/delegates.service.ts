import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { forkJoin } from "rxjs/observable/forkJoin";

@Injectable()
export class DelegatesService {

  constructor(private http: Http) { }

  /* For All Delegate List Services */
  getDelegatesDetail() {
    return this.http.get(environment.serverUrl + '/api/delegates')
      .map((res: Response) => res.json());
  }

  getStandbyDelegates(offset) {
    return this.http.get(environment.serverUrl + '/api/delegates?offset=' + offset)
      .map((res: Response) => res.json());
  }

  getNextForgers() {
    return this.http.get(environment.serverUrl + '/api/delegates/getNextForgers?limit=10')
      .map((res: Response) => res.json());

  }

  getLatestVotes() {
    return this.http.get(environment.serverUrl + '/api/delegates/getLatestVoters?limit=5')
      .map((res: Response) => res.json());

  }

  getLatestDelegates() {
    return this.http.get(environment.serverUrl + '/api/delegates/getLatestDelegates', {
      params: {
        limit: 5
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

  /* getDelegate(publickey) {
    let getdelegateInfoUri = environment.serverUrl + '/api/delegates/get?publickey';
    let getDelegate = this.http.get(getdelegateInfoUri, {
      params: {
        publickey: publickey
      }
    });

    let getVotersUri = environment.serverUrl + '/api/delegates/voters?publicKey';
    let getVoters = this.http.get(getVotersUri, {
      params: {
        publickey: publickey
      }
    });

    forkJoin([getDelegate, getVoters]).subscribe(results => {
      return results.map(res => res);
    });
  } */

  getPrice() {
    return this.http.get('http://ddkoin.com/price/price-ddk-api.php?com=sell')
    .map((res: Response) => res.json());
  }

  
}


