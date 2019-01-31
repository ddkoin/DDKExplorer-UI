import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { forkJoin } from "rxjs/observable/forkJoin";

@Injectable()
export class DelegatesService {

  constructor(private http: Http) { }

  /**
   * @function getActiveDelegates
   * @description get active delegates list
   * @param limit 
   * @param offset 
   */
  getActiveDelegates(limit, offset) {
    return this.http.get(environment.serverUrl + '/api/delegates', {
      params: {
        limit: limit,
        offset: offset
      }
    })
      .map((res: Response) => res.json());
  }

  /**
   * @function getStandbyDelegates
   * @description get stand by delegates list
   * @param limit 
   * @param offset 
   */
  getStandbyDelegates(limit, offset) {
    return this.http.get(environment.serverUrl + '/api/delegates', {
      params: {
        limit: limit,
        offset: offset
      }
    })
      .map((res: Response) => res.json());
  }

  /**
   * @function getNextForgers
   * @description get next forgers list
   * @param limit 
   */
  getNextForgers(limit) {
    return this.http.get(environment.serverUrl + '/api/delegates/getNextForgers', {
      params: {
        limit: limit
      }
    })
      .map((res: Response) => res.json());
  }

  /**
   * @function getLatestVotes
   * @description get latest votes transactions
   * @param limit 
   */
  getLatestVotes(limit) {
    return this.http.get(environment.serverUrl + '/api/delegates/getLatestVoters', {
      params: {
        limit: limit
      }
    })
      .map((res: Response) => res.json());
  }

  /**
   * @function getLatestDelegates
   * @description get latest delegates transactions
   * @param limit 
   */
  getLatestDelegates(limit) {
    return this.http.get(environment.serverUrl + '/api/delegates/getLatestDelegates', {
      params: {
        limit: limit,
        orderBy: 'timestamp:desc'
      }
    })
      .map((res: Response) => res.json());
  }

  /**
   * @function getDelegateDetails
   * @description get delegate details by publicKey
   * @param publicKey 
   */
  getDelegateDetails(publicKey) {
    return this.http.get(environment.serverUrl + '/api/delegates/get', {
      params: {
        publicKey: publicKey
      }
    })
      .map((res: Response) => res.json());
  }

  /**
   * @function getVoters
   * @description get voter list by publicKey
   * @param publickey 
   * @param limit 
   * @param offset 
   */
  getVoters(publickey, limit, offset) {
    return this.http.get(environment.serverUrl + '/api/delegates/voters', {
      params: {
        limit: limit,
        offset: offset,
        publicKey: publickey
      }
    })
      .map((res: Response) => res.json());
  }

  /**
   * @function getPrice
   * @description get DDK price
   */
  getPrice() {
    return this.http.get('http://ddkoin.com/price/price-ddk-api.php?com=sell')
      .map((res: Response) => res.json());
  }


}


