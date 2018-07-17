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
    getSenderidDetail(senderId) {
        console.log('type of address :', senderId)
        return this.http.get(environment.serverUrl + '/api/transactions?senderId='+senderId)
            .map((res: Response) => res.json());
    }
}

/* return this.http.get(environment.serverUrl + '/api/blocks/get?id='+id) */
