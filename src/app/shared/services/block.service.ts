import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { Services } from '@angular/core/src/view';
import { Body } from '@angular/http/src/body';
import { environment } from '../../../environments/environment';

@Injectable()
export class BlockService {

    /**
     * @constructor
     * @param http : HTTP instance
     */
    constructor(private http: Http) { }

    /**
     * @function getAllBlocks
     * @description get all blocks with parameters
     * @param limit 
     * @param offset 
     */
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

    /**
     * @function getBlockDetailsByHeight
     * @description get block details by height
     * @param height 
     */
    getBlockDetailsByHeight(height) {
        return this.http.get(environment.serverUrl + '/api/blocks', {
            params: {
                height: height
            }
        })
            .map((res: Response) => res.json());
    }

    /**
     * @function getBlockDetailsById
     * @description get block details by id
     * @param blockId 
     */
    getBlockDetailsById(blockId) {
        return this.http.get(environment.serverUrl + '/api/blocks/get', {
            params: {
                id: blockId
            }
        })
            .map((res: Response) => res.json());
    }

    /**
     * @function getBlocksBasedOnpublicKey
     * @description get blocks by public key
     * @param publicKey 
     */
    getBlocksBasedOnpublicKey(publicKey) {
        return this.http.get(environment.serverUrl + '/api/blocks', {
            params: {
                generatorPublicKey: publicKey
            }
        })
            .map((res: Response) => res.json());
    }
}
