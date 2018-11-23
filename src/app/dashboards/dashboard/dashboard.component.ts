import { AfterViewInit, Component, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { allTransactionsService } from '../../shared/services/allTransactions.service';
import { allBlockService } from '../../shared/services/allBlock.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
	public innerSpinner = true;
	public txLists: any = [];
	public bxLists: any = [];

	public blockData = false;
	public transactionData = false;

	constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, private allTx: allTransactionsService, private allBx: allBlockService) { 
		this.toastr.setRootViewContainerRef(vcr);
	}

	/* For All Transaction */
	allTransactionsList() {
		this.allTx.getAllTransactions(25, 10).subscribe(
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

   /*For All Block List */
	allBlockList() {
		this.allBx.getAllBlocks(25, 0).subscribe(
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
	
	/*For Block Height */
	getBlockHeight(height, name) {
		this.router.navigate(['/block-info', name, height]);
	}

	/* For Transactions Detail By ID */
	getTxId(id, name) {
		this.router.navigate(['/transaction-info', name, id]);
	}

	/* For Amount Detail By Address */
	getGeneratorId(generatorId) {
		this.router.navigate(['/user-info', generatorId]);
	}

	/* For Amount Detail By Address */
	getSenderId(senderId) {
		this.router.navigate(['/user-info', senderId]);
	}

	ngAfterViewInit() {
		this.allTransactionsList();
		this.allBlockList()
	}

}
