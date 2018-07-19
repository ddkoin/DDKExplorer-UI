import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DelegatesService } from '../shared/services/delegates.service';
import { BlockHeightDetailsService } from '../shared/services/blockHeightDetails.service';

import {Observable} from 'rxjs/Rx'

@Component({
	templateUrl: './delegate-monitor.component.html',
	styleUrls: ['./delegate-monitor.css']
})
export class DelegateMonitorComponent implements OnInit, AfterViewInit {
	dtOptions: DataTables.Settings = {};
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
	

	constructor(private activatedRoute: ActivatedRoute, private delegateService: DelegatesService, private BlockDetails: BlockHeightDetailsService) {
		
	}
	getProductivityInfo(delegatesList) {
		this.totalMissedBlocks = 0;
		var self = this;
		this.worstProductivity = delegatesList[0];
		this.bestProductivity = delegatesList[0];
		var newCount = delegatesList[0];
		delegatesList.forEach(function(delegate) {
			self.totalMissedBlocks = self.totalMissedBlocks + delegate.missedblocks
			if(delegate.productivity > self.bestProductivity.productivity) {
				self.bestProductivity = delegate;
			}
			if(delegate.productivity < self.worstProductivity.productivity) {
				self.worstProductivity = delegate;
			}
			if(delegate.producedblocks >= newCount.producedblocks) {
				newCount.producedblocks = delegate.producedblocks;
				self.bestForger = delegate;
			}
		})
	}

	getStandbyDelegates() {
		this.delegateService.getStandbyDelegates(this.activeDelegates).subscribe(
			resp => {
				if(resp.success) {
					this.standbyDelegates = resp.delegates;
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	getDelegatesDetail() {
		this.delegateService.getDelegatesDetail().subscribe(
			resp => {
				if(resp.success) {
					this.delegatesInfo = [];
					this.delegatesInfo = resp.delegates;
					this.delegateCount = resp.totalCount;
					this.totalActiveForged = this.delegatesInfo.length;
					this.getProductivityInfo(this.delegatesInfo);
					this.getStandbyDelegates();
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	getdelegateName(publicKey) {
		var self = this;
		this.delegatesInfo.forEach(function(delegate) {
			if(publicKey == delegate.publicKey) {
				self.nextForgersList.push(delegate.username);
			}
		});
	}

	getNextForgers() {
		this.nextForgersList = [];
		this.delegateService.getNextForgers().subscribe(
			resp => {
				if(resp.success) {
					var self = this;
					this.nextForgers = [];
					this.nextForgers = resp.delegates;
					this.nextForgers.forEach(function(publicKey) {
						self.getdelegateName(publicKey);
					});
					this.currentBlock = resp.currentBlock;
					this.getLastBlock(this.currentBlock - 1);
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
				if(resp.success) {
					this.lastBlock = resp.blocks[0];
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	getLatestVotes() {
		this.delegateService.getLatestVotes().subscribe(
			resp => {
				if(resp.success) {
					this.latestVotes = resp.voters;
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	getLatestDelegates() {
		this.delegateService.getLatestDelegates().subscribe(
			resp => {
				if(resp.success) {
					this.latestDelegates = resp.delegates;
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	/* getPrice() {
		this.delegateService.getPrice().subscribe(
			resp => {
				if(resp.success) {
					this.DDKPrice = resp;
				}
			},
			error => {
				console.log(error);
			}
		);
	} */
	
	

  /* Observable.interval(2000 * 60).subscribe(x => {
    doSomething();
  }); */
	ngOnInit() {

	}

	ngAfterViewInit() {
		//this.getPrice();
		this.getDelegatesDetail();
		this.getNextForgers();
		this.getLatestVotes();
		this.getLatestDelegates();
		Observable.interval(10000).subscribe(x => {
			this.getDelegatesDetail();
			this.getNextForgers();
			this.getLatestVotes();
			this.getLatestDelegates();
		});
	}
}



