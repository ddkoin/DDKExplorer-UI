import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { allTransactionsService } from '../../shared/services/allTransactions.service';
import { allBlockService } from '../../shared/services/allBlock.service'

@Component({
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
	public txLists : any = [];
	public bxLists : any = [];	

	constructor(private router: Router, private allTx:allTransactionsService, private allBx:allBlockService) {}

	allTransactionsList() {
		this.allTx.getAllTransactions().subscribe(
			resp => {
				if (resp.success) {
					this.txLists = resp.transactions;
				}
			},
			error => {
				console.log(error)
			}
		);
	}

	allBlockList() {
		this.allBx.getAllBlocks().subscribe(
			resp => {
				if (resp.success) {
					this.bxLists = resp.blocks;
				}
			},
			error => {
				console.log(error)
			}
		);
	}

	getBlockHeight(height,name) {
		this.router.navigate(['/block-info',name, height]);
	}
	
	/* For Transactions Detail By ID */
	getTxId(id,name) {
		this.router.navigate(['/transaction-info', name, id]);
	}

	/* For Amount Detail By Address */
	getGeneratorId(generatorId,name) {
		this.router.navigate(['/user-info',name, generatorId]);
	}

	/* For Amount Detail By Address */
	getSenderId(senderId,name) {
		this.router.navigate(['/user-info',name, senderId]);
	}

	ngAfterViewInit() {
		this.allTransactionsList();
		this.allBlockList()
	}
    
}