import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { Services } from '@angular/core/src/view';
import { Body } from '@angular/http/src/body';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

    constructor(private http: Http) { }

    /**
     * @function getAddressDetail
     * @description get address details
     * @param address : { String }
     */
    getAddressDetail(address) {
        return this.http.get(environment.serverUrl + '/api/accounts', {
            params: {
                address: address
            }
        })
            .map((res: Response) => res.json());
    }
}

/* return this.http.get(environment.serverUrl + '/api/blocks/get?id='+id) */
