import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef,ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DelegatesService } from '../shared/services/delegates.service';
import { BlockService } from '../shared/services/block.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { SocketService } from '../shared/services/socket.service';


@Component({
	templateUrl: './delegate-monitor.component.html',
	styleUrls: ['./delegate-monitor.css']
})

/**
 * @description Initializes component
 * @implements OnInit, AfterViewInit
 * @class DelegateMonitorComponent
 * @classdesc Main Component logic.
 * @author Hotam Singh
 */
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
	@ViewChild('voteCount') voteCount: TemplateRef<any>;
	@ViewChild('vote') vote: TemplateRef<any>;
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
	public activeDelegates = 11;
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

	/**
	 * @implements delegate monitor page
	 * @description implements delegate monitor page
	 * @param toastr : toasts manager
	 * @param vcr : view container reference
	 * @param router : router
	 * @param activatedRoute : route handler
	 * @param delegateService : delegate service
	 * @param blockService : block service
	 * @param socket : socket service 
	 */
	constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, private activatedRoute: ActivatedRoute, private delegateService: DelegatesService, private blockService: BlockService, private socket: SocketService) {
		this.toastr.setRootViewContainerRef(vcr);
	}
	
	/**
	 * @function get productivity info based on next forgers
	 * @param delegatesList : list of active delegates
	 */
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

	/**
	 * @function get stand by delegates
	 * @param limit 
	 * @param offset 
	 */
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

	/**
	 * @function get active delegates
	 * @param limit 
	 * @param offset 
	 */
	getDelegatesDetail(limit, offset) {
		this.delegateService.getActiveDelegates(limit, offset).subscribe(
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

	/**
	 * @function get delegate names by individuals pubicKey
	 * @param publicKey 
	 */
	getdelegateName(publicKey) {
		var self = this;
		this.delegatesInfo.forEach(function (delegate) {
			if (publicKey == delegate.publicKey) {
				delegate.status = true;
				self.nextForgersList.push({
					username: delegate.username,
					publicKey: delegate.publicKey
				});
			} else{
				delegate.status = false;
			}
		});
	}
   
	/**
	 * @function get details for last block
	 */
	getLatestBlock() {
		this.blockService.getAllBlocks(1, 0).subscribe(
			resp => {
				if (resp && resp.success) {
					this.currentBlock = resp.count;
					this.getLastBlock(this.currentBlock);
					this.innerSpinner = false;
				}
			}
		);
	}
	
	/**
	 * @function get next forgers list
	 * @param limit 
	 */
	getNextForgers(limit) {
		this.nextForgersList = [];
		this.lastBlock = {};
		this.delegateService.getNextForgers(limit).subscribe(
			resp => {
				if (resp && resp.success) {
					var self = this;
					this.nextForgers = [];
					this.nextForgers = resp.delegates;
					this.nextForgers.forEach(function (publicKey) {
						self.getdelegateName(publicKey);
					});
					this.innerSpinner = false;
				}
			},
			error => {
				//this.toastr.error('This is not good!', error);
				console.log(error);
			}
		);
	}

	/**
	 * @function get block details by height
	 * @param currentBlockHeight 
	 */
	getLastBlock(currentBlockHeight) {
		this.blockService.getBlockDetailsByHeight(currentBlockHeight -1).subscribe(
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

	/**
	 * @function get latest votes transactions
	 * @param limit 
	 */
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

	/**
	 * @function get latest delegates transactions
	 * @param limit 
	 */
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

	/**
	 * @link navigate to delegate info page
	 * @param publicKey 
	 */
	getDelegateInfo(publicKey) {
		this.router.navigate(['/delegate', publicKey]);
	}

	/**
	 * @link navigate to user-info page
	 * @param address 
	 */
	getSenderId(address) {
		this.router.navigate(['/user-info', address]);
	}

	/**
	 * @link navigate to transaction-info page
	 * @param id 
	 * @param name 
	 */
	getTxId(id, name) {
		this.router.navigate(['/transaction-info', name, id]);
	}

	/**
	 * @link navigate to block-info page
	 * @param id 
	 * @param name 
	 */
	getBlockId(id, name) {
		this.router.navigate(['/block-info', name, id]);
	}

	/**
	 * @function get current price of DDK based on different market currencies
	 */
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
	
	/**
	 * @description switch between tabs and highlight active delegates tab
	 */
	showActiveDelegates() {
		this.tab1 = true;
		this.tab2 = false;
		this.isActive = true;
		this.isAct = false;
	}
	
	/**
	 * @description switch between tabs and highlight standby delegates tab
	 */
	showStandbyDelegates() {
		this.tab1 = false;
		this.tab2 = true;
		this.isActive = false;
		this.isAct = true;

	}

	/**
	 * @function set page size, offset for each tables used in this component
	 * @param event : Object
	 */
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

	/**
	 * @implements ngOnInit
	 * @description subscribe to socket events, initializes tables and set page limits/offsets
	 */
	ngOnInit() {
		var self = this;
		this.socket
			.getTransactions()
			.subscribe((transaction: string) => {
				if (transaction['type'] === 60) {
					this.latestVotes.splice(0, 0, transaction);
					this.page1.totalElements = parseInt(this.page1.totalElements) + 1;
				}

				if (transaction['type'] === 30) {
					this.latestDelegates.splice(0, 0, transaction);
					this.page1.totalElements = parseInt(this.page2.totalElements) + 1;
				}
			});
		this.socket
			.getNextForgers()
			.subscribe((nextForgersList: string) => {
				this.nextForgersList = [];
				this.nextForgers = nextForgersList;
				this.nextForgers.forEach(function (publicKey) {
					self.getdelegateName(publicKey);
				});
			});
		this.socket
			.getBlocks()
			.subscribe((block: string) => {
				this.lastBlock = block;
				this.currentBlock = block['height'];
				this.delegatesInfo.forEach(function (delegate) {
					if (self.lastBlock.generatorPublicKey == delegate.publicKey) {
						self.lastBlock.username = delegate.username;
					}
				});
			})
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
			{ name: 'Vote Count', prop: 'voteCount', cellTemplate: this.voteCount },
			{ name: 'Vote Weight', prop: 'vote', cellTemplate: this.vote },
			{ name: 'Name', prop: 'username', cellTemplate: this.name },
			{ name: 'Address', prop: 'address', cellTemplate: this.addresss},
			{ name: 'Status', cellTemplate: this.status },
			{ name: 'Productivity', prop: 'productivity', cellTemplate: this.productivity },
			{ name: 'Approval', prop: 'approval', cellTemplate: this.approval }
		]

		this.columns4 = [
			{ name: 'Rank', prop: 'rank', cellTemplate: this.rank },
			{ name: 'Name', prop: 'username', cellTemplate: this.name },
			{ name: 'Address', prop: 'address', cellTemplate: this.addresss },
			{ name: 'Status', cellTemplate: this.status },
			{ name: 'Productivity', prop: 'productivity', cellTemplate: this.productivity },
			{ name: 'Approval', prop: 'approval', cellTemplate: this.approval }
		]

		this.setPage({ offset: 0 });
	}

	/**
	 * @implements ngAfterViewInit
	 * @description load view for delegate monitor page
	 */
	ngAfterViewInit() {
		this.getPrice();
		this.getDelegatesDetail(this.activeDelegates, 0);
		this.getLatestBlock();
		this.getNextForgers(this.page1.size);
		this.getLatestVotes(this.page1.size);
		this.getLatestDelegates(this.page2.size);
	}
}



