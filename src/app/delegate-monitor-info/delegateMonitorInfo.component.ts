import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BlockDetailsService } from '../shared/services/blockDetails.service';
import { BlockHeightDetailsService } from '../shared/services/blockHeightDetails.service';
import { DelegatesService } from '../shared/services/delegates.service';
import {Observable} from 'rxjs/Rx'
import { forkJoin } from "rxjs/observable/forkJoin";

@Component({
	templateUrl: './delegateMonitorInfo.component.html',
	styleUrls: ['./delegateMonitorInfo.css']
})
export class DelegateMonitorInfoComponent implements OnInit, AfterViewInit {
	dtOptions: DataTables.Settings = {};
	public blockInfo: any = [];
	public bxHeight: any = [];
	public blockId: any;
	public bxsHight: any;
	public typeId: any;
	public currentHeight: any;
	public delegateInfo: any = {};
	public Voters: any;
	public votesCount: any = Number;
	public publicKey: any;
	

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private BlockDetails: BlockDetailsService, private allBxHeight: BlockHeightDetailsService, private delegateService: DelegatesService) {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.typeId = params.name;
			if (this.typeId == 'blockId') {
				this.blockId = params.id;
			} else {
				this.bxsHight = params.id;
			}
		});
	}

	blockDetail() {
		this.blockInfo = [];
		this.BlockDetails.getBlockDetail(this.blockId).subscribe(
			resp => {
				if (resp.success) {
					this.blockInfo = resp.block;
				}
			},
			error => {
				console.log(error)
			}
		);
	}

	blockHeight() {
		this.blockInfo = [];
		this.allBxHeight.getBlockHeightDetail(parseInt(this.bxsHight)).subscribe(
			resp => {
				if (resp.success) {
					this.blockInfo = resp.blocks[0];
				}
			},
			error => {
				console.log(error)
			}
		);
	}
	getLatestHeight() {
		this.delegateService.getNextForgers(10).subscribe(
			resp => {
				if(resp.success) {
					this.currentHeight = resp.currentBlock;
				}
			},
			error => {
				console.log(error);
			}
		);
	}
	getDelegate(publicKey) {
		this.delegateService.getDelegate(publicKey).subscribe(
			resp => {
				if(resp.success) {
					this.delegateInfo = resp.delegate;
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	getVoters(publicKey) {
		this.delegateService.getVoters(publicKey).subscribe(
			resp => {
				if(resp.success) {
					this.Voters = resp.accounts;
					this.votesCount = resp.accounts.length;
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	getAddressInfo(address) {
		this.router.navigate(['/user-info', address]);
	}

	ngOnInit() {
		if (this.typeId == 'blockId') {
			this.blockDetail();
		} else {
			this.blockHeight();
		}
	}

	ngAfterViewInit() {
		this.publicKey = window.location.href.split('/delegate/')[1];
		this.getDelegate(this.publicKey);
		this.getVoters(this.publicKey);
		this.getLatestHeight();
		let flag:any = true
		window.localStorage.setItem('flag',flag)
		this.dtOptions = {
			pagingType: 'full_numbers'
		};
		this.getLatestHeight();
		const that = this;
		Observable.interval(10000).subscribe(x => {
			this.getLatestHeight();
		});
	}
}



