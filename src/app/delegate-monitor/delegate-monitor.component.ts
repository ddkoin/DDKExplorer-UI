import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef,ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DelegatesService } from '../shared/services/delegates.service';
import { BlockHeightDetailsService } from '../shared/services/blockHeightDetails.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Rx'

@Component({
	templateUrl: './delegate-monitor.component.html',
	styleUrls: ['./delegate-monitor.css']
})
export class DelegateMonitorComponent implements OnInit, AfterViewInit {
	public rows = [];
	public columns1 = [];
	public columns2 = [];
	public columns3 = [];
	public columns4 = [];
	public offset: any;
	public temp = [];
	public page1: any = { totalElements: 0, pageNumber: 0, size: 20, searchValue: "" }
	public page2: any = { totalElements: 0, pageNumber: 0, size: 20, searchValue: "" }
	public page3: any = { totalElements: 0, pageNumber: 0, size: 20, searchValue: "" }
	public page4: any = { totalElements: 0, pageNumber: 0, size: 20, searchValue: "" }
	public timeout: any = 100;
	@ViewChild('voters') voters: TemplateRef<any>;
	@ViewChild('transactionId') transactionId: TemplateRef<any>;
	@ViewChild('timestamp') timestamp: TemplateRef<any>;
	@ViewChild('name') name: TemplateRef<any>;
	@ViewChild('address') addresss: TemplateRef<any>;
	@ViewChild('producedBlocks') producedBlocks: TemplateRef<any>;
	@ViewChild('missedBlocks') missedBlocks: TemplateRef<any>;
	@ViewChild('rank') rank: TemplateRef<any>;
	@ViewChild('status') status: TemplateRef<any>;
	@ViewChild('productivity') productivity: TemplateRef<any>;
	@ViewChild('missedBlocks') approval: TemplateRef<any>;
	fixedTimezone = new Date(Date.UTC(2016, 0, 1, 17, 0, 0, 0));
	public lastBlock: any = {};
	public bestProductivity: any = {};
	public worstProductivity: any = {};
	public bestForger: any = {};
	public delegatesInfo: any = [];
	public standbyDelegates: any = [];
	public nextForgers: any = [];
	public nextForgersList: any = [];
	public latestVotes: any = [];
	public latestDelegates: any = [];
	public activeDelegates = 3;
	public totalActiveForged = 0;
	public totalMissedBlocks = 0;
	public delegateCount: any;
	public currentBlock: any;
	public DDKPrice: any;
	public tab1 = true;
	public tab2 = false;
	public isActive = true;
	public isAct = false;
	public innerSpinner = true;

	constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, private activatedRoute: ActivatedRoute, private delegateService: DelegatesService, private BlockDetails: BlockHeightDetailsService) {
		this.toastr.setRootViewContainerRef(vcr);
	}
	
	/* For Get Productivity Infomation */
	getProductivityInfo(delegatesList) {
		this.totalMissedBlocks = 0;
		var self = this;
		this.worstProductivity = delegatesList[0];
		this.bestProductivity = delegatesList[0];
		var newCount = delegatesList[0];
		delegatesList.forEach(function (delegate) {
			self.totalMissedBlocks = self.totalMissedBlocks + delegate.missedblocks
			if (delegate.productivity > self.bestProductivity.productivity) {
				self.bestProductivity = delegate;
			}
			if (delegate.productivity < self.worstProductivity.productivity) {
				self.worstProductivity = delegate;
			}
			if (delegate.producedblocks >= newCount.producedblocks) {
				newCount.producedblocks = delegate.producedblocks;
				self.bestForger = delegate;
			}
		})
	}

	/* For StandBy Delegates */
	getStandbyDelegates(limit, offset) {
		this.delegateService.getStandbyDelegates(limit, this.activeDelegates + offset).subscribe(
			resp => {
				if (resp && resp.success) {
					this.standbyDelegates = resp.delegates;
					this.page4.totalElements = resp.totalCount - this.activeDelegates;
				}
			},
			error => {
				//this.toastr.error('This is not good!', error);
				console.log(error);
			}
		);
	}

	/*For Delegates Detail */
	getDelegatesDetail(limit, offset) {
		this.delegateService.getDelegatesDetail(limit, offset).subscribe(
			resp => {
				if (resp && resp.success) {
					this.delegatesInfo = [];
					this.delegatesInfo = resp.delegates;
					this.page3.totalElements = this.activeDelegates;
					this.delegateCount = resp.totalCount;
					this.totalActiveForged = this.delegatesInfo.length;
					this.getProductivityInfo(this.delegatesInfo);
					this.getStandbyDelegates(this.page4.size, this.page4.offset);
				}
			},
			error => {
				//this.toastr.error('This is not good!', error);
				console.log(error);
			}
		);
	}

    /* For Delegate Name */
	getdelegateName(publicKey) {
		var self = this;
		this.delegatesInfo.forEach(function (delegate) {
			if (publicKey == delegate.publicKey) {
				self.nextForgersList.push({
					username: delegate.username,
					publicKey: delegate.publicKey
				});
			}
		});
	}
   
	/*For Next Forgers */
	getNextForgers(limit) {
		this.nextForgersList = [];
		this.delegateService.getNextForgers(limit).subscribe(
			resp => {
				if (resp && resp.success) {
					var self = this;
					this.nextForgers = [];
					this.nextForgers = resp.delegates;
					this.nextForgers.forEach(function (publicKey) {
						self.getdelegateName(publicKey);
					});
					this.currentBlock = resp.currentBlock;
					this.getLastBlock(this.currentBlock);
					this.innerSpinner = false;
				}
			},
			error => {
				//this.toastr.error('This is not good!', error);
				console.log(error);
			}
		);
	}

	/* For Last Block */
	getLastBlock(currentBlockHeight) {
		this.BlockDetails.getBlockHeightDetail(currentBlockHeight).subscribe(
			resp => {
				if (resp && resp.success) {
					let self = this;
					this.lastBlock = resp.blocks[0];
					this.delegatesInfo.forEach(function (delegate) {
						if (self.lastBlock.generatorPublicKey == delegate.publicKey) {
							self.lastBlock.username = delegate.username;
						}
					});
				}
			},
			error => {
				//this.toastr.error('This is not good!', error);
				console.log(error);
			}
		);
	}

	/* For Latest Votes */
	getLatestVotes(limit) {
		this.delegateService.getLatestVotes(limit).subscribe(
			resp => {
				if (resp && resp.success) {
					this.latestVotes = resp.voters;
					this.page1.totalElements = resp.voters.length;
				}
			},
			error => {
				//this.toastr.error('This is not good!', error);
				console.log(error);
			}
		);
	}

	/*For Latest Delegates */
	getLatestDelegates(limit) {
		this.delegateService.getLatestDelegates(limit).subscribe(
			resp => {
				if (resp && resp.success) {
					this.latestDelegates = resp.delegates;
					this.page2.totalElements = resp.delegates.length;
				}
			},
			error => {
				//this.toastr.error('This is not good!', error);
				console.log(error);
			}
		);
	}

	/* For Delegate Information */
	getDelegateInfo(publicKey) {
		this.router.navigate(['/delegate', publicKey]);
	}

	/* For SenderId */
	getSenderId(address) {
		this.router.navigate(['/user-info', address]);
	}

	getTxId(id, name) {
		this.router.navigate(['/transaction-info', name, id]);
	}

	/*For Price*/
	getPrice() {
		this.delegateService.getPrice().subscribe(
			resp => {
				if (resp && resp.success) {
					this.DDKPrice = resp;
				}
			},
			error => {
				//this.toastr.error('This is not good!', error);
				console.log(error);
			}
		);
	}
	
	/*For Show Active Delegates */
	showActiveDelegates() {
		this.tab1 = true;
		this.tab2 = false;
		this.isActive = true;
		this.isAct = false;
	}
	
	/* For Show Stand By Delegates */
	showStandbyDelegates() {
		this.tab1 = false;
		this.tab2 = true;
		this.isActive = false;
		this.isAct = true;

	}

	setPage(event) {
		this.page1.offset = this.page1.size * event.offset;
		this.page2.offset = this.page2.size * event.offset;
		this.page3.offset = this.page3.size * event.offset;
		if (this.page4.size > this.activeDelegates) {
			this.page4.size = this.activeDelegates;
			this.page4.offset = this.page4.size * event.offset;
		} else {
			this.page4.offset = this.page4.size * event.offset;
		}

		if (this.tab1) {
			this.getDelegatesDetail(this.page3.size, this.page3.offset);
		} else {
			this.getStandbyDelegates(this.page4.size, this.page4.offset);
		}
	}

	ngOnInit() {
		this.columns1 = [
			{ name: 'Voter', prop: 'senderId', cellTemplate: this.voters },
			{ name: 'Transaction', prop: 'id', cellTemplate: this.transactionId },
			{ name: 'Time', prop: 'timestamp', cellTemplate: this.timestamp }
		];

		this.columns2 = [
			{ name: 'Delegate', prop: 'username', cellTemplate: this.name },
			{ name: 'Address', prop: 'address', cellTemplate: this.addresss },
			{ name: 'Time', prop: 'timestamp', cellTemplate: this.timestamp }
		]

		this.columns3 = [
			{ name: 'Rank', prop: 'rank', cellTemplate: this.rank },
			{ name: 'Address', prop: 'address', cellTemplate: this.addresss },
			{ name: 'Status', cellTemplate: this.status },
			{ name: 'Productivity', prop: 'productivity', cellTemplate: this.productivity },
			{ name: 'Approval', prop: 'approval', cellTemplate: this.approval }
		]

		this.columns4 = [
			{ name: 'Rank', prop: 'rank', cellTemplate: this.rank },
			{ name: 'Address', prop: 'address', cellTemplate: this.addresss },
			{ name: 'Status', cellTemplate: this.status },
			{ name: 'Productivity', prop: 'productivity', cellTemplate: this.productivity },
			{ name: 'Approval', prop: 'approval', cellTemplate: this.approval }
		]

		this.setPage({ offset: 0 });
	}

	ngAfterViewInit() {
		this.getPrice();
		this.getDelegatesDetail(this.activeDelegates, 0);
		this.getNextForgers(this.page1.size);
		this.getLatestVotes(this.page1.size);
		this.getLatestDelegates(this.page2.size);
		Observable.interval(10000).subscribe(x => {
			this.getNextForgers(this.page1.size);
			this.getLatestVotes(this.page1.size);
			this.getLatestDelegates(this.page2.size);
		});
	}
}



