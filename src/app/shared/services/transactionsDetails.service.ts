import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { Services } from '@angular/core/src/view';
import { Body } from '@angular/http/src/body';
import { environment } from '../../../environments/environment';

@Injectable()
export class transactionsDetailsService {

    constructor(private http: Http) { }

    /* For Transactions Details by ID */
    getTransactionsDetail(id) {
        return this.http.get(environment.serverUrl + '/api/transactions?id=' + id)
            .map((res: Response) => res.json());
    }


    /* For Transactions Details by Height */
    /* getTransactionsBYHeight(height) {
        return this.http.get(environment.serverUrl + '/api/transactions?height='+height)
            .map((res: Response) => res.json());
    } */


}
