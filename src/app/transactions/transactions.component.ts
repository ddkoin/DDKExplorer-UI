import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { allTransactionsService } from '../shared/services/allTransactions.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DataTablesModule } from 'angular-datatables';
import { transition } from '@angular/animations';
import { Subject } from 'rxjs';

declare var require: any;

class DataTablesResponse {
	data: any[];
	draw: number;
	recordsFiltered: number;
	recordsTotal: number;
}
@Component({
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.css']
})
export class TransactionsComponent implements OnInit,  AfterViewInit {
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	public transactionlist: any = [];
	public transactionInfo: any = [];
	fixedTimezone = new Date(Date.UTC(2016, 0, 1, 17, 0, 0, 0));

	constructor(private router: Router, private allTransaction: allTransactionsService, private http: HttpClient) { }

	allTransactionsList() {
		this.allTransaction.getAllTransactions().subscribe(
			resp => {
				console.log('resp.count : ', resp.count);
				if (resp.success) {
					//this.transactionlist = resp.transactions;
					//this.dtOptions.data = resp.transactions;
				}
			},
			error => {
				console.log(error)
			}
		);
	}

	getTransactionId(id) {
		localStorage.setItem('transactionId', id);
		this.router.navigate(['/transaction-info', id]);
	}



	/* For Transactions Detail By ID */
	getTxId(id,name) {
		this.router.navigate(['/transaction-info', name, id]);
	}

	/* For Block ID By Height */
	getBlockId(id,name) {
		this.router.navigate(['/block-info', name, id]);
	}

	/* For Amount Detail By Address */
	getSenderId(senderId,name) {
		this.router.navigate(['/user-info',name, senderId]);
	}


	ngAfterViewInit() {
		//this.allTransactionsList();
		
	}

	ngOnInit(){
		this.transactionlist = [];
		var that = this;
		this.dtOptions = {
			serverSide: true,
			processing: true,
			ajax: (dataTablesParameters: any, callback) => {
				that.http
					.get(
					environment.serverUrl + '/api/transactions?orderBy=timestamp:desc&limit=100',
				).subscribe(resp => {
					this.transactionlist = resp['transactions'];
					callback({
						recordsTotal: resp['count'],
						recordsFiltered: resp['count'],
						data: []
					});
				});
			},
			columns: [{ data: 'transactionId' }, { data: 'height' }, { data: 'blockId' }, { data: 'senderId' }, { data: 'recipientId' }, { data: 'timestamp' }, { data: 'amount' }, { data: 'fee' }]
		};
	}
}



