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
	public trxId: any;
	public typeId: any;
	public txsId: any;
	public txsBlockId: any;
	public txsHeight: any;

	constructor(private router: Router, private BlockDetails: BlockDetailsService, private activatedRoute: ActivatedRoute, private transactionsDetails: transactionsDetailsService) {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.typeId = params.name;
			if (this.typeId == 'transactionId') {
				this.txsId = params.id;
			} else {
				this.txsBlockId = params.id;
			}
		});
	}

	ngOnInit() {
		if (this.typeId == 'transactionId') {
			this.transactionsDetail()
		} else {
			this.blockDetail()
		}
	}

	ngAfterViewInit() {
		this.dtOptions = {
			stateSave: true
		};
	}

	transactionsDetail() {
		this.transactionsDetails.getTransactionsDetail(this.txsId).subscribe(
			resp => {
				if (resp.success) {
					this.transactionInfo = resp.transaction;
					/* console.log("this.transactionInfo : ",this.transactionInfo); */
					if(this.transactionInfo.type == 1){
						this.transactionInfo.trsName = "SECONDPASS";
					}
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

	/* For Block ID By Height */
	getBlockId(id, name) {
		this.router.navigate(['/block-info', name, id]);
	}
	getSenderId(senderId) {
		this.router.navigate(['/user-info', senderId]);
	}
}
