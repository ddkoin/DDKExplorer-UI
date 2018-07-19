import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

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
    return this.http.get(environment.serverUrl + '/api/delegates/getLatestDelegates?limit=5')
    .map((res: Response) => res.json());
  }

  /* getPrice() {
    return this.http.get('http://bcmy.io/price/price-ddk-api.php?com=sell')
    .map((res: Response) => res.json());
  } */
}
