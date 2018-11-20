import { Component, OnInit, AfterViewInit, ViewContainerRef } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { transactionsDetailsService } from '../shared/services/transactionsDetails.service'
import { BlockDetailsService } from '../shared/services/blockDetails.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
	public innerSpinner = true;

	constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, private BlockDetails: BlockDetailsService, private activatedRoute: ActivatedRoute, private transactionsDetails: transactionsDetailsService) {
		this.toastr.setRootViewContainerRef(vcr);
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
				if (resp && resp.success) {
					this.transactionInfo = resp.transaction;
					if (this.transactionInfo.type == 1) {
						this.transactionInfo.trsName = "SECONDPASS";
					}
					this.innerSpinner = false;
					//this.toastr.success('You are awesome!', 'Success!');
				}
			},
			error => {
				this.toastr.error('This is not good!', error);
				console.log(error)
			}
		);
	}

	blockDetail() {
		this.transactionInfo = [];
		this.BlockDetails.getBlockDetail(this.txsBlockId).subscribe(
			resp => {
				if (resp && resp.success) {
					this.transactionInfo = resp.block;
				}
			},
			error => {
				this.toastr.error('This is not good!', error);
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
