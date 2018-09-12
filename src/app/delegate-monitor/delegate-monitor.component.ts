import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DelegatesService } from '../shared/services/delegates.service';
import { BlockHeightDetailsService } from '../shared/services/blockHeightDetails.service';

import { Observable } from 'rxjs/Rx'

@Component({
	templateUrl: './delegate-monitor.component.html',
	styleUrls: ['./delegate-monitor.css']
})
export class DelegateMonitorComponent implements OnInit, AfterViewInit {
	rows = [];
	columns1 = [];
	columns2 = [];
	columns3 = [];
	columns4 = [];
	offset: any;
	temp = [];
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
	tab1 = true;
	tab2 = false;
	public isActive = true;
	public isAct = false;


	constructor(private router: Router, private activatedRoute: ActivatedRoute, private delegateService: DelegatesService, private BlockDetails: BlockHeightDetailsService) {

	}

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

	getStandbyDelegates(limit, offset) {
		this.delegateService.getStandbyDelegates(limit, this.activeDelegates + offset).subscribe(
			resp => {
				if (resp.success) {
					this.standbyDelegates = resp.delegates;
					this.page4.totalElements = resp.totalCount - this.activeDelegates;
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	getDelegatesDetail(limit, offset) {
		this.delegateService.getDelegatesDetail(limit, offset).subscribe(
			resp => {
				if (resp.success) {
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
				console.log(error);
			}
		);
	}

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

	getNextForgers(limit) {
		this.nextForgersList = [];
		this.delegateService.getNextForgers(limit).subscribe(
			resp => {
				if (resp.success) {
					var self = this;
					this.nextForgers = [];
					this.nextForgers = resp.delegates;
					this.nextForgers.forEach(function (publicKey) {
						self.getdelegateName(publicKey);
					});
					this.currentBlock = resp.currentBlock;
					this.getLastBlock(this.currentBlock);
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	getLastBlock(currentBlockHeight) {
		this.BlockDetails.getBlockHeightDetail(currentBlockHeight).subscribe(
			resp => {
				if (resp.success) {
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
				console.log(error);
			}
		);
	}

	getLatestVotes(limit) {
		this.delegateService.getLatestVotes(limit).subscribe(
			resp => {
				if (resp.success) {
					this.latestVotes = resp.voters;
					this.page1.totalElements = resp.voters.length;
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	getLatestDelegates(limit) {
		this.delegateService.getLatestDelegates(limit).subscribe(
			resp => {
				if (resp.success) {
					this.latestDelegates = resp.delegates;
					this.page2.totalElements = resp.delegates.length;
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	getDelegateInfo(publicKey) {
		this.router.navigate(['/delegate', publicKey]);
	}

	getSenderId(address) {
		this.router.navigate(['/user-info', address]);
	}

	getTxId(id, name) {
		this.router.navigate(['/transaction-info', name, id]);
	}

	getPrice() {
		this.delegateService.getPrice().subscribe(
			resp => {
				if (resp.success) {
					this.DDKPrice = resp;
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	showActiveDelegates() {
		this.tab1 = true;
		this.tab2 = false;
		this.isActive = true;
		this.isAct = false;
	}

	showStandbyDelegates() {
		this.tab1 = false;
		this.tab2 = true;
		this.isAct = true;
		this.isActive = false;
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



