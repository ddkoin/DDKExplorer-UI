import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { Services } from '@angular/core/src/view';
import { Body } from '@angular/http/src/body';
import { environment } from '../../../environments/environment';

@Injectable()
export class allBlockService {

    constructor(private http: Http) { }

    /* For All Transactions List Services */
    getAllBlocks(limit, offset) {
        return this.http.get(environment.serverUrl + '/api/blocks', {
            params: {
                limit: limit,
                offset: offset,
                orderBy: 'timestamp:desc'
            }
        })
        .map((res: Response) => res.json());
    }

    getBlocksBasedOnHeight(height) {
        return this.http.get(environment.serverUrl + '/api/blocks', {
            params: {
                height: height
            }
        })
        .map((res: Response) => res.json());
    }
}
