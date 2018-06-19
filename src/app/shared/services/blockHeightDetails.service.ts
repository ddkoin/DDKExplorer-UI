import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { Services } from '@angular/core/src/view';
import { Body } from '@angular/http/src/body';

@Injectable()
export class BlockHeightDetailsService {

    constructor(private http: Http) { }

    /* For All Block List Services */
    getBlockHeightDetail(height) {
        return this.http.get('http://localhost:7000/api/blocks?height='+height)
            .map((res: Response) => res.json());
    }


}