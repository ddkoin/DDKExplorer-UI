import { Component, OnInit, AfterViewInit, ViewContainerRef } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TransactionsService } from '../shared/services/transactions.service'
import { BlockService } from '../shared/services/block.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	templateUrl: './transactioninfo.component.html',
	styleUrls: ['./transactioninfo.css']
})

/**
 * @description Initializes component
 * @implements OnInit, AfterViewInit
 * @class TransactionInfoComponent
 * @classdesc Main Component logic.
 * @author Hotam Singh
 */
export class TransactionInfoComponent implements OnInit, AfterViewInit {
	dtOptions: DataTables.Settings = {};
	public transactionInfo: any = [];
	public trxId: any;
	public typeId: any;
	public txsId: any;
	public txsBlockId: any;
	public txsHeight: any;
	public innerSpinner = true;

	/**
	 * @constructor
	 * @param toastr : toast manager
	 * @param vcr : view container reference
	 * @param router : router
	 * @param blockService : block service
	 * @param activatedRoute : activated route
	 * @param transactionService: transaction service 
	 */
	constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, private blockService: BlockService, private activatedRoute: ActivatedRoute, private transactionService: TransactionsService) {
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

	/**
	 * @implements ngOnInit
	 * @description load transactions/block info by transactionId/blockId
	 */
	ngOnInit() {
		if (this.typeId == 'transactionId') {
			this.transactionsDetail()
		} else {
			this.blockDetail()
		}
	}

	/**
	 * @implements ngAfterViewInit
	 * @description load view for transaction info page
	 */
	ngAfterViewInit() {
		this.dtOptions = {
			stateSave: true
		};
	}

	/**
	 * @function transactionsDetail
	 * @description loads transactions by transactionId
	 */
	transactionsDetail() {
		this.transactionService.getTransactionsById(this.txsId).subscribe(
			resp => {
				if (resp && resp.success) {
					this.transactionInfo = resp.transactions[0];
					if (this.transactionInfo.type == 1) {
						this.transactionInfo.trsName = "SECONDPASS";
					}
					this.innerSpinner = false;
					//this.toastr.success('You are awesome!', 'Success!');
				}
			},
			error => {
				//this.toastr.error('This is not good!', error);
				console.log(error)
			}
		);
	}

	/**
	 * @function blockDetail
	 * @description get block details by blockId
	 */
	blockDetail() {
		this.transactionInfo = [];
		this.blockService.getBlockDetailsById(this.txsBlockId).subscribe(
			resp => {
				if (resp && resp.success) {
					this.transactionInfo = resp.block;
				}
			},
			error => {
				//this.toastr.error('This is not good!', error);
				console.log(error)
			}
		);
	}

	/**
	 * @function getBlockId
	 * @description navigate to block-info page
	 * @param id 
	 * @param name 
	 */
	getBlockId(id, name) {
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
}
