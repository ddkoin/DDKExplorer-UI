import { Component, ViewChild, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { allTransactionsService } from '../shared/services/allTransactions.service';
import { allBlockService } from '../shared/services/allBlock.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { transition } from '@angular/animations';

declare var require: any;
declare var jquery: any;
declare var $: any;
const transactionTypes: any = require('../../assets/json/transactionTypes.js');

@Component({
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.css']
})
export class TransactionsComponent implements OnInit,  AfterViewInit {
	rows = [];
	columns = [];
	offset: any;
	temp = [];
	public page: any = { totalElements: 0, pageNumber: 0, size: 20, searchValue: "" }
	public timeout: any = 100;
	@ViewChild('transactionId') transactionId: TemplateRef<any>;
	@ViewChild('blockId') blockId: TemplateRef<any>;
	@ViewChild('senderId') senderId: TemplateRef<any>;
	@ViewChild('recipientId') recipientId: TemplateRef<any>;
	@ViewChild('timestamp') timestamp: TemplateRef<any>;
	@ViewChild('amount') amount: TemplateRef<any>;
	@ViewChild('fee') fee: TemplateRef<any>;
	@ViewChild('stakedAmount') stakedAmount: TemplateRef<any>;
	public transactionlist: any = [];
	public transactionInfo: any = [];
	fixedTimezone = new Date(Date.UTC(2016, 0, 1, 17, 0, 0, 0));

	txFee: any;

	constructor(private router: Router, private allTransaction: allTransactionsService, private http: HttpClient, private blockService: allBlockService) { }

	filterData(event) {
		if (event) {
			clearTimeout(this.timeout);
			const that = this;
			this.timeout = setTimeout(function() {
				var searchValue = event.target.value;
				if(searchValue !== '') {
					if (!isNaN(searchValue)) {
						that.allTransaction.getTransactionsBasedOnId(searchValue).subscribe(
							resp => {
								if(parseInt(resp.count) !== 0) {
									if (resp.success) {
										that.transactionlist = resp.transactions;
										that.page.totalElements = resp.count;
									}
								} else {
									that.allTransaction.getTransactionsBasedOnHeight(searchValue).subscribe(
										resp => {
											if(resp.success) {
												that.transactionlist = resp.transactions;
												that.page.totalElements = resp.count;
											}else {
												that.transactionlist = [];
												that.page.totalElements = 0;
											}
										}
									);
								}
							}
						);
					} else {
						if(searchValue.toUpperCase().indexOf('DDK') !== -1 ) {
							that.allTransaction.getTransactionsBasedOnSender(searchValue).subscribe(
								resp => {
									if(resp.success) {
										that.transactionlist = resp.transactions;
										that.page.totalElements = resp.count;
									}else {
										that.transactionlist = [];
										that.page.totalElements = 0;
									}
								}
							);
						}else {
							if(transactionTypes[searchValue.toUpperCase()] !== undefined) {
								that.allTransaction.getTransactionsBasedOnType(transactionTypes[searchValue.toUpperCase()]).subscribe(
									resp => {
										if(resp.success) {
											that.transactionlist = resp.transactions;
											that.page.totalElements = resp.count;
										}else {
											that.transactionlist = [];
											that.page.totalElements = 0;
										}
									}
								);
							} else {
								that.transactionlist = [];
								that.page.totalElements = 0;
							}
						}
					}
				} else {
					that.allTransactionsList(that.page.size, that.page.offset);
				}
			}, 1000);
		}
	}

	allTransactionsList(limit, offset) {
		let trsType = window.location.href.split('/')[4];
		if(trsType === 'transactions') {
			this.allTransaction.getAllTransactions(limit, offset).subscribe(
				resp => {
					if (resp.success) {
						this.transactionlist = resp.transactions;
						this.page.totalElements = resp.count;
					}
				},
				error => {
					console.log(error)
				}
			);
		} else {
			this.allTransaction.getUnconfirmedTransactions(limit, offset).subscribe(
				resp => {
					if (resp.success) {
						this.transactionlist = resp.transactions;
						this.page.totalElements = resp.count;
					}
				},
				error => {
					console.log(error)
				}
			);
		}
		
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
	getSenderId(senderId) {
		this.router.navigate(['/user-info', senderId]);
	}

	setPage(event) {
		this.page.offset = this.page.size * event.offset;
		this.allTransactionsList(this.page.size, this.page.offset);
	}

	ngAfterViewInit() {
	}

	ngOnInit(){
		this.transactionlist = [];
		this.columns = [
			{ name: 'Transation ID', prop: 'id', width: '200', cellTemplate: this.transactionId },
			{ name: 'Tx Type', prop: 'trsName' },
			{ name: 'Height', prop: 'height' },
			{ name: 'Block ID', prop: 'blockId', width: '200', cellTemplate: this.blockId },
			{ name: 'Sender ID', prop: 'senderId', width: '240', cellTemplate: this.senderId },
			{ name: 'Recipient ID', prop: 'recipientId', width: '240', cellTemplate: this.recipientId },
			{ name: 'Time', prop: 'timestamp', cellTemplate: this.timestamp },
			{ name: 'Amount', prop: 'amount', cellTemplate: this.amount },
			{ name: 'Tx Fee', prop: 'fee', cellTemplate: this.fee }
		];
		this.setPage({ offset: 0 });
	}
}



