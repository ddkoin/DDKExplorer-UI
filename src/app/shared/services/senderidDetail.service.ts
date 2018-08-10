import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { Services } from '@angular/core/src/view';
import { Body } from '@angular/http/src/body';
import { environment } from '../../../environments/environment';

@Injectable()
export class SenderidDetailService {

    constructor(private http: Http) { }

    getSenderidDetail(address) {
        return this.http.get(environment.serverUrl + '/api/accounts', {
            params: {
                address: address
            }
        })
        .map((res: Response) => res.json());
    }

    /* For All Transactions List Services */
    getSenderTransactions(limit, offset, recipientId, publicKey) {
        return this.http.get(environment.serverUrl + '/api/transactions', {
            params: {
                limit: limit,
                offset: offset,
                senderPublicKey: publicKey,
                recipientId: recipientId,
                orderBy: 'timestamp:desc'
            }
        })
        .map((res: Response) => res.json());
    }
}

/* return this.http.get(environment.serverUrl + '/api/blocks/get?id='+id) */
