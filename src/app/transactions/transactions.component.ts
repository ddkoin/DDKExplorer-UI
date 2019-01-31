import { Component, ViewChild, OnInit, AfterViewInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsService } from '../shared/services/transactions.service';
import { BlockService } from '../shared/services/block.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { transition } from '@angular/animations';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SocketService } from '../shared/services/socket.service';


declare var require: any;
declare var jquery: any;
declare var $: any;
const transactionTypes: any = require('../../assets/json/transactionTypes.js');

@Component({
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.css']
})

/**
 * @description Initializes component
 * @implements OnInit, AfterViewInit
 * @class TransactionsComponent
 * @classdesc Main Component logic.
 * @author Hotam Singh
 */
export class TransactionsComponent implements OnInit,  AfterViewInit {
	rows = [];
	columns = [];
	offset: any;
	temp = [];
	public page: any = { totalElements: 0, pageNumber: 0, size: 20, searchValue: "" }
	public timeout: any = 100;
	@ViewChild('transactionId') transactionId: TemplateRef<any>;
	@ViewChild('transactionHeight') transactionHeight: TemplateRef<any>;
	@ViewChild('blockId') blockId: TemplateRef<any>;
	@ViewChild('senderId') senderId: TemplateRef<any>;
	@ViewChild('recipientId') recipientId: TemplateRef<any>;
	@ViewChild('timestamp') timestamp: TemplateRef<any>;
	@ViewChild('amount') amount: TemplateRef<any>;
	@ViewChild('fee') fee: TemplateRef<any>;
	@ViewChild('stakedAmount') stakedAmount: TemplateRef<any>;
	@ViewChild('txName') txName: TemplateRef<any>;
	public transactionlist: any = [];
	public transactionInfo: any = [];
	fixedTimezone = new Date(Date.UTC(2016, 0, 1, 17, 0, 0, 0));
	txFee: any;
	public innerSpinner = true;

	/**
	 * @constructor 
	 * @param toastr : toast manager
	 * @param vcr : view container reference
	 * @param router : router
	 * @param transactionService : transaction service
	 * @param http : http instance
	 * @param blockService : block service
	 * @param socket : socket service
	 */
	constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, private transactionService: TransactionsService, private http: HttpClient, private blockService: BlockService, private socket: SocketService) { 
	 this.toastr.setRootViewContainerRef(vcr);
	}
	
	/**
	 * @function filterData
	 * @description search transactions based on different parameters
	 * @param event 
	 */
	filterData(event) {
		if (event) {
			clearTimeout(this.timeout);
			const that = this;
			this.timeout = setTimeout(function() {
				var searchValue = event.target.value;
				if(searchValue !== '') {
					if (!isNaN(searchValue)) {
						that.transactionService.getTransactionsById(searchValue).subscribe(
							resp => {
								if(parseInt(resp.count) !== 0) {
									if (resp && resp.success) {
										that.transactionlist = resp.transactions;
										that.page.totalElements = resp.count;
									}
								} else {
									that.transactionService.getTransactionsByHeight(searchValue).subscribe(
										resp => {
											if(resp && resp.success) {
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
							that.transactionService.getTransactionsBySender(searchValue).subscribe(
								resp => {
									if(resp && resp.success) {
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
								that.transactionService.getTransactionsByType(transactionTypes[searchValue.toUpperCase()]).subscribe(
									resp => {
										if(resp && resp.success) {
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

	/**
	 * @function allTransactionsList
	 * @description get all transactions based on params
	 * @param limit 
	 * @param offset 
	 */
	allTransactionsList(limit, offset) {
		let trsType = window.location.href.split('/')[4];
		if(trsType === 'transactions') {
			this.transactionService.getAllTransactions(limit, offset).subscribe(
				resp => {
					if (resp && resp.success) {
						this.transactionlist = resp.transactions;
						this.page.totalElements = resp.count;
						this.innerSpinner = false;
					}
				},
				error => {
					//this.toastr.error('This is not good!', error);
					console.log(error)
				}
			);
		} else {
			this.transactionService.getUnconfirmedTransactions(limit, offset).subscribe(
				resp => {
					if (resp && resp.success) {
						this.transactionlist = resp.transactions;
						this.page.totalElements = resp.count;
						this.innerSpinner = false;
					}
				},
				error => {
					//this.toastr.error('This is not good!', error);
					console.log(error)
				}
			);
		}
		
	}

	/**
	 * @function getTransactionId
	 * @description navigate to transaction-info page
	 * @param id 
	 */
	getTransactionId(id) {
		localStorage.setItem('transactionId', id);
		this.router.navigate(['/transaction-info', id]);
	}

	/**
	 * @function getTxId
	 * @description navigate to transaction-info page
	 * @param id 
	 * @param name 
	 */
	getTxId(id,name) {
		this.router.navigate(['/transaction-info', name, id]);
	}

	
	/**
	 * @function getBlockHeight
	 * @description navigate to block-info page
	 * @param height 
	 * @param name 
	 */
	getBlockHeight(height,name) {
		this.router.navigate(['/block-info',name, height]);
	}

	/**
	 * @function getBlockId
	 * @description navigate to block-info page
	 * @param id 
	 * @param name 
	 */
	getBlockId(id,name) {
		this.router.navigate(['/block-info', name, id]);
	}

	/**
	 * @function getSenderId
	 * @description navigate to user-info page
	 * @param senderId 
	 */
	getSenderId(senderId) {
		this.router.navigate(['/user-info', senderId]);
	}

	/**
	 * @function setPage
	 * @description set page offset and load transactions accordingly
	 * @param event 
	 */
	setPage(event) {
		this.page.offset = this.page.size * event.offset;
		this.allTransactionsList(this.page.size, this.page.offset);
	}

	/**
	 * @implements ngAfterViewInit
	 * @description load view for transactions page
	 */
	ngAfterViewInit() {
	}

	/**
	 * @implements ngOnInit
	 * @description subscribe to socket's transaction/change event, setup columns and set page size, limit etc for a table
	 */
	ngOnInit(){
		this.socket
		.getTransactions()
		.subscribe((transaction: string) => {
			this.transactionlist.splice(0, 0, transaction);
			this.page.totalElements = parseInt(this.page.totalElements) + 1; 
		});
		this.transactionlist = [];
		this.columns = [
			{ name: 'Transation ID', prop: 'id', width: '200', cellTemplate: this.transactionId },
			{ name: 'Tx Type', prop: 'trsName', cellTemplate: this.txName },
			{ name: 'Height', prop: 'height', cellTemplate: this.transactionHeight},
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



