import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { Services } from '@angular/core/src/view';
import { Body } from '@angular/http/src/body';

@Injectable()
export class allBlockService {

    constructor(private http: Http) { }

    /* For All Transactions List Services */
    getAllBlocks() {
        return this.http.get('http://localhost:7000/api/blocks')
            .map((res: Response) => res.json());
    }
}