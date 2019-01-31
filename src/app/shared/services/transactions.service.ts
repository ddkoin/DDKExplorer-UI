import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { Services } from '@angular/core/src/view';
import { Body } from '@angular/http/src/body';
import { environment } from '../../../environments/environment';

@Injectable()
export class TransactionsService {

    constructor(private http: Http) { }

    /**
     * @function getSenderTransactionsBySenderId
     * @description get transactions for a sender
     * @param limit : { Number }
     * @param offset : { Number}
     * @param recipientId : { String }
     * @param senderId : { String }
     */
    getSenderTransactionsBySenderId(limit, offset, recipientId, senderId) {
        return this.http.get(environment.serverUrl + '/api/transactions', {
            params: {
                limit: limit,
                offset: offset,
                senderId: senderId,
                recipientId: recipientId,
                orderBy: 'timestamp:desc'
            }
        })
            .map((res: Response) => res.json());
    }

    /**
     * @function getAllTransactions
     * @description get all transactions
     * @param limit : { Number }
     * @param offset : { Number }
     */
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

    /**
     * @function getUnconfirmedTransactions
     * @description get all unconfirmed transactions 
     * @param offset : { Number }
     */
    getUnconfirmedTransactions(limit, offset) {
        return this.http.get(environment.serverUrl + '/api/transactions/unconfirmed', {
            params: {
                limit: limit,
                offset: offset,
                orderBy: 'timestamp:desc'
            }
        })
            .map((res: Response) => res.json());
    }

    /**
     * @function getTransactionsByHeight
     * @description get transactions by height
     * @param height 
     */
    getTransactionsByHeight(height) {
        return this.http.get(environment.serverUrl + '/api/transactions', {
            params: {
                height: height,
                orderBy: 'height:desc'
            }
        })
            .map((res: Response) => res.json());
    }

    /**@function getTransactionsById
     * @description get transaction details by transactionId
     * @param id : { String }
     */
    getTransactionsById(id) {
        return this.http.get(environment.serverUrl + '/api/transactions', {
            params: {
                id: id
            }
        })
            .map((res: Response) => res.json());
    }

    /**
     * @function getTransactionsBySender
     * @description get transactions by sender
     * @param senderId : { String }
     */
    getTransactionsBySender(senderId) {
        return this.http.get(environment.serverUrl + '/api/transactions', {
            params: {
                senderId: senderId
            }
        })
            .map((res: Response) => res.json());
    }

    /**
     * @function getTransactionsByType
     * @description get transactions by type
     * @param type : { String }
     */
    getTransactionsByType(type) {
        return this.http.get(environment.serverUrl + '/api/transactions', {
            params: {
                type: type
            }
        })
            .map((res: Response) => res.json());
    }

    /**
     * @function getTransactionsHistory
     * @description get transactions history for last 14 days
     */
    getTransactionsHistory() {
        return this.http.get(environment.serverUrl + '/api/transactions/getTransactionHistory')
            .map((res: Response) => res.json());
    }

    /**
     * @function getBlockTransactions
     * @description get block transactions
     * @param blockId : { String }
     */
    getBlockTransactions(blockId) {
        return this.http.get(environment.serverUrl + '/api/transactions', {
            params: {
                blockId: blockId
            }
        })
            .map((res: Response) => res.json());
    }
}
