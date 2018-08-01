import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { Services } from '@angular/core/src/view';
import { Body } from '@angular/http/src/body';
import { environment } from '../../../environments/environment';

@Injectable()
export class allTransactionsService {

    constructor(private http: Http) { }

    /* For All Transactions List Services */
    getAllTransactions(limit, offset) {
        return this.http.get(environment.serverUrl + '/api/transactions', {
            params: {
                limit: limit,
                offset: offset,
                orderBy: 'timestamp:desc'
            }
        })
        .map((res: Response) => res.json());
    }

    getTransactionsBasedOnHeight(height) {
        return this.http.get(environment.serverUrl + '/api/transactions', {
            params: {
                height: height,
                orderBy: 'height:desc'
            }
        })
        .map((res: Response) => res.json());
    }

    getTransactionsBasedOnId(id) {
        return this.http.get(environment.serverUrl + '/api/transactions', {
            params: {
                id: id
            }
        })
        .map((res: Response) => res.json());
    }

    getTransactionsBasedOnSender(senderId) {
        return this.http.get(environment.serverUrl + '/api/transactions', {
            params: {
                senderId: senderId
            }
        })
        .map((res: Response) => res.json());
    }

    getTransactionsBasedOnType(type) {
        return this.http.get(environment.serverUrl + '/api/transactions', {
            params: {
                type: type
            }
        })
        .map((res: Response) => res.json());
    }

}
