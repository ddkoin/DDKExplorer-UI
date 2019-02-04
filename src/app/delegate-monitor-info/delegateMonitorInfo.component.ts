import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BlockService } from '../shared/services/block.service';
import { DelegatesService } from '../shared/services/delegates.service';
import { Observable } from 'rxjs/Rx'
import { forkJoin } from "rxjs/observable/forkJoin";

@Component({
	templateUrl: './delegateMonitorInfo.component.html',
	styleUrls: ['./delegateMonitorInfo.css']
})

/**
 * @description Initializes component
 * @implements OnInit, AfterViewInit
 * @class DelegateMonitorInfoComponent
 * @classdesc Main Component logic.
 * @author Hotam Singh
 */
export class DelegateMonitorInfoComponent implements OnInit, AfterViewInit {
	public blockInfo: any = [];
	public blockId: any;
	public bxsHight: any;
	public typeId: any;
	public currentHeight: any;
	public delegateInfo: any = {};
	public Voters: any = [];
	public votesCount: any = Number;
	public publicKey: any;
	public innerSpinner = true;
	public votesCountPerPage = 0;
	public offset = 0;
	public limit = 100;

	/**
	 * @description implements delegate info page
	 * @param router 
	 * @param activatedRoute 
	 * @param blockService 
	 * @param delegateService 
	 */
	constructor(private router: Router, private activatedRoute: ActivatedRoute, private blockService: BlockService, private delegateService: DelegatesService) {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.typeId = params.name;
			if (this.typeId == 'blockId') {
				this.blockId = params.id;
			} else {
				this.bxsHight = params.id;
			}
		});
	}

	/**
	 * @function blockDetail
	 * @description get block details by blockId
	 */
	blockDetail() {
		this.blockInfo = [];
		this.blockService.getBlockDetailsById(this.blockId).subscribe(
			resp => {
				if (resp && resp.success) {
					this.blockInfo = resp.block;
				}
			},
			error => {
				console.log(error)
			}
		);
	}

	/**
	 * @function blockHeight
	 * @description get block details by blockHeight
	 */
	blockHeight() {
		this.blockInfo = [];
		this.blockService.getBlockDetailsByHeight(parseInt(this.bxsHight)).subscribe(
			resp => {
				if (resp && resp.success) {
					this.blockInfo = resp.blocks[0];
				}
			},
			error => {
				console.log(error)
			}
		);
	}
	
	/**
	 * @function getLatestHeight
	 * @description Get details for latest block
	 */
	getLatestHeight() {
		this.blockService.getAllBlocks(1, 0).subscribe(
			resp => {
				if (resp && resp.success) {
					this.currentHeight = resp.count;
				}
			}
		);
	}
	
	/**
	 * @function getDelegate
	 * @description get delegate details by publick key
	 * @param publicKey  
	 */
	getDelegate(publicKey) {
		this.delegateService.getDelegateDetails(publicKey).subscribe(
			resp => {
				if (resp && resp.success) {
					this.delegateInfo = resp.delegate;
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	/**
	 * @function getVoters
	 * @description get voters details for a user by publick key
	 * @param publicKey 
	 */
	getVoters(publicKey) {
		this.delegateService.getVoters(publicKey, this.limit, this.offset).subscribe(
			resp => {
				if (resp && resp.success) {
					this.Voters = this.Voters.concat(resp.voters);
					this.votesCount = resp.count.count;
					this.votesCountPerPage += resp.voters.length;
					this.offset += this.limit;
					this.innerSpinner = false;
				} else {
					this.Voters = [];
					this.votesCount = 0;
					this.innerSpinner = false;
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	/**
	 * @function getAddressInfo
	 * @description navigate to user-info page
	 * @param address 
	 */
	getAddressInfo(address) {
		this.router.navigate(['/user-info', address]);
	}

	/**
	 * @function NextData
	 * @description get next voters list based on publicKey
	 * @param publicKey 
	 */
	NextData(publicKey){
		this.getVoters(publicKey);
	}

	/**
	 * @function ngOnInit
	 * @implements ngOnInit
	 * @description load block info by blockId OR blockHeight
	 */
	ngOnInit() {
		if (this.typeId == 'blockId') {
			this.blockDetail();
		} else {
			this.blockHeight();
		}
	}

	/**
	 * @function ngAfterViewInit
	 * @implements ngAfterViewInit
	 * @description load view for delegate info page
	 */
	ngAfterViewInit() {
		this.publicKey = window.location.href.split('/delegate/')[1];
		this.getDelegate(this.publicKey);
		this.getVoters(this.publicKey);
		this.getLatestHeight();
		let flag: any = true;
		window.localStorage.setItem('flag', flag);
		this.getLatestHeight();
		Observable.interval(10000).subscribe(x => {
			this.getLatestHeight();
		});
	}
}
