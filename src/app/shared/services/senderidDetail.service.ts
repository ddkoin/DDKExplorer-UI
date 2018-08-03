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

    /* For All Transactions List Services */
    getSenderidDetail(limit, offset, senderId) {
        return this.http.get(environment.serverUrl + '/api/transactions', {
            params: {
                limit: limit,
                offset: offset,
                senderId: senderId,
                orderBy: 'timestamp:desc'
            }
        })
            .map((res: Response) => res.json());
    }
}

/* return this.http.get(environment.serverUrl + '/api/blocks/get?id='+id) */
