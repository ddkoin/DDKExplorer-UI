import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { transactionsDetailsService } from '../shared/services/transactionsDetails.service'
import { BlockDetailsService } from '../shared/services/blockDetails.service';

@Component({
	templateUrl: './transactioninfo.component.html',
	styleUrls: ['./transactioninfo.css']
})
export class TransactionInfoComponent implements OnInit, AfterViewInit {
	dtOptions: DataTables.Settings = {};
	public transactionInfo: any = [];
	public trxId:any;
	public typeId:any;
	public txsId:any;
	public txsBlockId:any;

	constructor(private BlockDetails: BlockDetailsService, private activatedRoute: ActivatedRoute, private transactionsDetails: transactionsDetailsService) { 
		this.activatedRoute.params.subscribe((params: Params) => {
			console.log('params===', params)
			this.typeId = params.name;
			 if (this.typeId == 'transactionId') {
				this.txsId = params.id;
			} else {
				this.txsBlockId = params.id;
			}
		});
	}

	transactionsDetail() {
		this.transactionsDetails.getTransactionsDetail(this.txsId).subscribe(
			resp => {
				if (resp.success) {
					this.transactionInfo = resp.transaction;					
				}
			},
			error => {
				console.log(error)
			}
		);
	}

	blockDetail() {
		this.transactionInfo = [];
		this.BlockDetails.getBlockDetail(this.txsBlockId).subscribe(
			resp => {
				if (resp.success) {
					this.transactionInfo = resp.block;
				}
			},
			error => {
				console.log(error)
			}
		);
	}

	ngOnInit(){
		if(this.typeId == 'transactionId'){
			this.transactionsDetail()
		}else{
			this.blockDetail()
		}
	}

	ngAfterViewInit() {
		//this.transactionsDetail();
		this.dtOptions = {
			//pagingType: 'full_numbers',
			stateSave: true
		};
	}
}