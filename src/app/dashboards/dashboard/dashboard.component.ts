import { AfterViewInit, Component, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsService } from '../../shared/services/transactions.service';
import { BlockService } from '../../shared/services/block.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { JSONLoaderService } from '../../shared/services/json.loader.service';

@Component({
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})

/**
 * @description Initializes component
 * @implements AfterViewInit
 * @class DashboardComponent
 * @classdesc Main Component logic.
 * @author Hotam Singh
 */
export class DashboardComponent implements AfterViewInit {
	public innerSpinner = true;
	public txLists: any = [];
	public bxLists: any = [];
	public transactionTypes: any = {};

	public blockData = false;
	public transactionData = false;

	/**
	 * @constructor
	 * @param toastr : toast manager
	 * @param vcr : view container reference
	 * @param router : router
	 * @param transactionService : transaction service
	 * @param blockService : block service
	 */
	constructor(
		public toastr: ToastsManager, vcr: ViewContainerRef,
		private router: Router,
		private transactionService: TransactionsService,
		private blockService: BlockService,
		private transactionTypesService: JSONLoaderService
	) { 
		this.toastr.setRootViewContainerRef(vcr);
	}

	/**
	 * @function allTransactionsList
	 * @description get all transactions
	 */
	allTransactionsList() {
		this.transactionService.getAllTransactions(25, 10).subscribe(
			resp => {
				if (resp && resp.success) {
					this.txLists = resp.transactions;
					this.transactionData = true;
					this.innerSpinner = !(this.blockData && this.transactionData);

				}
			},
			error => {
				//this.toastr.error('This is not good!', error);
				console.log(error)
			}
		);
	}

   /**
	* @function allBlockList
	* @description get all blocks
    */
	allBlockList() {
		this.blockService.getAllBlocks(25, 0).subscribe(
			resp => {
				if (resp && resp.success) {
					this.bxLists = resp.blocks;
					this.blockData = true;
					this.innerSpinner = !(this.blockData && this.transactionData);
				}
			},
			error => {
				//this.toastr.error('This is not good!', error);
				console.log(error)
			}
		);
	}
	
	/**
	 * @function getBlockHeight
	 * @description navigate to block-info page
	 * @param height 
	 * @param name 
	 */
	getBlockHeight(height, name) {
		this.router.navigate(['/block-info', name, height]);
	}

	/**
	 * @function getTxId 
	 * @description navigate to transaction-info page
	 * @param id 
	 * @param name 
	 */
	getTxId(id, name) {
		this.router.navigate(['/transaction-info', name, id]);
	}

	/**
	 * @function getGeneratorId
	 * @description navigate to user-info page
	 * @param generatorId 
	 */
	getGeneratorId(generatorId) {
		this.router.navigate(['/user-info', generatorId]);
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
	 * @implements ngAfterViewInit
	 * @description load view for dashboard page
	 */
	ngAfterViewInit() {
		this.transactionTypesService.getJSON().subscribe(transactionTypes => {
			this.transactionTypes = transactionTypes
		});
		this.allTransactionsList();
		this.allBlockList()
	}

}
