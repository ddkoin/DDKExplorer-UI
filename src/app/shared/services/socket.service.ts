import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

export class SocketService {
    private url = environment.serverUrl ;
    private socket;    

    constructor() {
        this.socket = io(this.url);
    }

    public getBlocks = () => {
        return Observable.create((observer) => {
            this.socket.on('blocks/change', (block) => {
                observer.next(block);
            });
        });
    }

    public getTransactions = () => {
        return Observable.create((observer) => {
            this.socket.on('transactions/change', (transaction) => {
                observer.next(transaction);
            });
        });
    }

    public getNextForgers = () => {
        return Observable.create((observer) => {
            this.socket.on('delegates/nextForgers', (nextForgersList) => {
                observer.next(nextForgersList);
            });
        });
    }
}
