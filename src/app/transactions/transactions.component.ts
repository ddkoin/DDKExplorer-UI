import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Router } from '@angular/router';
import { allTransactionsService } from '../shared/services/allTransactions.service'

@Component({
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.css']
})
export class TransactionsComponent implements OnInit,  AfterViewInit {
	dtOptions: DataTables.Settings = {};
	public transactionlist: any = [];
	public transactionInfo: any = [];
	fixedTimezone = new Date(Date.UTC(2016, 0, 1, 17, 0, 0, 0));

	constructor(private router: Router, private allTransaction: allTransactionsService) { }

	allTransactionsList() {
		this.allTransaction.getAllTransactions().subscribe(
			resp => {
				if (resp.success) {
					this.transactionlist = resp.transactions;
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
		/* this.dtOptions = {
			pagingType: 'full_numbers'
		}; */
		this.allTransactionsList();
		
	}

	ngOnInit(){
		this.transactionlist = [];
	}
}



