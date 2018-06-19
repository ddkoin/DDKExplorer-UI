import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { Services } from '@angular/core/src/view';
import { Body } from '@angular/http/src/body';

@Injectable()
export class AddressDetailService {

    constructor(private http: Http) { }

    /* For All Transactions List Services */
    getAddressDetail(address) {
        console.log('type of address :', address)
        return this.http.get('http://localhost:7000/api/accounts?address='+address)
            .map((res: Response) => res.json());
    }
}

/* return this.http.get('http://localhost:7000/api/blocks/get?id='+id) */