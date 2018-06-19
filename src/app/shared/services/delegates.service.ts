import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DelegatesService {

  constructor(private http: Http) { }

  /* For All Delegate List Services */
  getDelegatesDetail() {
    return this.http.get('http://localhost:7000/api/delegates')
      .map((res: Response) => res.json());
  }

  getStandbyDelegates(offset) {
    return this.http.get('http://localhost:7000/api/delegates?offset=' + offset)
      .map((res: Response) => res.json());
  }

  getNextForgers() {
    return this.http.get('http://localhost:7000/api/delegates/getNextForgers?limit=10')
      .map((res: Response) => res.json());

  }

  getLatestVotes() {
    return this.http.get('http://localhost:7000/api/delegates/getLatestVoters?limit=5')
      .map((res: Response) => res.json());

  }

  getLatestDelegates() {
    return this.http.get('http://localhost:7000/api/delegates/getLatestDelegates?limit=5')
    .map((res: Response) => res.json());
  }
}
