import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

/**
 * @class SocketService
 * @classdesc socket service and methods
 */
export class SocketService {
    private url = environment.serverUrl ;
    private socket;    

    constructor() {
        this.socket = io(this.url);
    }

    /**
     * @function getBlocks
     * @description listens 'blocks/change' socket event
     */
    public getBlocks = () => {
        return Observable.create((observer) => {
            this.socket.on('blocks/change', (block) => {
                observer.next(block);
            });
        });
    }

    /**
     * @function getTransactions
     * @description listens 'transactions/change' socket event
     */
    public getTransactions = () => {
        return Observable.create((observer) => {
            this.socket.on('transactions/change', (transaction) => {
                observer.next(transaction);
            });
        });
    }

    /**
     * @function getNextForgers
     * @description listens 'delegates/nextForgers' socket event
     */
    public getNextForgers = () => {
        return Observable.create((observer) => {
            this.socket.on('delegates/nextForgers', (nextForgersList) => {
                observer.next(nextForgersList);
            });
        });
    }
}
