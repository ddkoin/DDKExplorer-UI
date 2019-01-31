import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { BlockService } from '../shared/services/block.service';
import { UserService } from '../shared/services/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SocketService } from '../shared/services/socket.service';


@Component({
	templateUrl: './block.component.html',
	styleUrls: ['./block.css'],

})

/**
 * @description Initializes component
 * @implements OnInit
 * @class BlockComponent
 * @classdesc Main Component logic.
 * @author Hotam Singh
 */
export class BlockComponent implements OnInit {
	rows = [];
	columns = [];
	offset: any;
	temp = [];

	public page: any = { totalElements: 0, pageNumber: 0, size: 20, searchValue: "" };
	public timeout: any = 100;
	@ViewChild('blockId') blockId: TemplateRef<any>;
	@ViewChild('height') height: TemplateRef<any>;blockIdblockId
	@ViewChild('generator') generator: TemplateRef<any>;
	@ViewChild('amount') amount: TemplateRef<any>;
	@ViewChild('fee') fee: TemplateRef<any>;
	@ViewChild('timestamp') timestamp: TemplateRef<any>;
	@ViewChild('previousBlock') previousBlock: TemplateRef<any>;
	public blocklist: any = [];
	fixedTimezone = new Date(Date.UTC(2016, 0, 1, 17, 0, 0, 0));

	public innerSpinner = true;

	/**
	 * @constructor
	 * @param toastr : toast manager
	 * @param vcr : view container reference
	 * @param router : router
	 * @param blockService : block service
	 * @param userService : user service
	 * @param socket : socketIO service
	 */
	constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, private blockService: BlockService, private userService: UserService, private socket: SocketService) {
		this.toastr.setRootViewContainerRef(vcr);
	 }

	/**
	 * @function allBlockList
	 * @description get all blocks
	 * @param limit : { Number }
	 * @param offset : { Number }
	 */
	allBlockList(limit, offset) {
		this.blockService.getAllBlocks(limit, offset).subscribe(
			resp => {
				if (resp && resp.success) {
					this.blocklist = resp.blocks;
					this.page.totalElements = resp.count;
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
	 * @function filterData
	 * @description search block details with different parameters
	 * @param event 
	 */
	filterData(event) {
		if (event) {
			clearTimeout(this.timeout);
			const that = this;
			this.timeout = setTimeout(function () {
				var searchValue = event.target.value;
				if (searchValue !== '') {
					if (!isNaN(searchValue)) {
						that.blockService.getBlockDetailsByHeight(searchValue).subscribe(
							resp => {
								if (parseInt(resp.count) !== 0) {
									if (resp && resp.success) {
										that.blocklist = resp.blocks;
										that.page.totalElements = resp.count;
									}
								} else {
									that.blockService.getBlockDetailsById(searchValue).subscribe(
										resp => {
											if (resp && resp.success) {
												that.blocklist = [];
												that.blocklist.push(resp.block);
												that.page.totalElements = 1;
											} else {
												that.blocklist = [];
												that.page.totalElements = 0;
											}
										}
									);
								}
							}
						);
					} else {
						that.userService.getAddressDetail(searchValue).subscribe(
							resp => {
								if (resp && resp.success) {
									that.blockService.getBlocksBasedOnpublicKey(resp.account.publicKey).subscribe(
										resp => {
											if (resp.success) {
												that.blocklist = resp.blocks;
												that.page.totalElements = resp.count;
											} else {
												that.blocklist = [];
												that.page.totalElements = 0;
											}
										}
									);

								} else {
									that.blocklist = [];
									that.page.totalElements = 0;
								}
							}
						);
					}
				} else {
					that.allBlockList(that.page.size, that.page.offset);
				}
			}, 1000);
		}
	}

	/**
	 * @function getBlockId
	 * @description navigate to block-info page
	 * @param id 
	 * @param name 
	 */
	getBlockId(id, name) {
		this.router.navigate(['/block-info', name, id]);
		this.blocklist = [];
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
	 * @function getSenderId
	 * @description navigate to user-info page
	 * @param senderId 
	 */
	getSenderId(senderId) {
		this.router.navigate(['/user-info', senderId]);
	}

	/**
	 * @function setPage
	 * @description set page offset and load blocks accordingly
	 * @param event 
	 */
	setPage(event) {
		this.page.offset = this.page.size * event.offset;
		this.allBlockList(this.page.size, this.page.offset);
	}

	/**
	 * @implements ngOnInit
	 * @description subscribe to socket's block/change event and set page size, limit and columns for tables
	 */
	ngOnInit() {
		this.socket
			.getBlocks()
			.subscribe((block: string) => {
				this.blocklist.splice(0, 0, block);
				this.page.totalElements = parseInt(this.page.totalElements) + 1; 
			});
		this.columns = [
			{ name: 'Block ID', prop: 'id', width: '220', cellTemplate: this.blockId },
			{ name: 'Height', prop: 'height', cellTemplate: this.height },
			{ name: 'Generator', prop: 'generatorId', width: '240', cellTemplate: this.generator },
			{ name: 'Number Of Tx', prop: 'numberOfTransactions' },
			{ name: 'Total Amount', prop: 'totalAmount', cellTemplate: this.amount },
			{ name: 'Total Fee', prop: 'totalFee', cellTemplate: this.fee },
			{ name: "Time", prop: 'timestamp', cellTemplate: this.timestamp },
			{ name: 'Previous Block', prop: 'previousBlock', width: '220', cellTemplate: this.previousBlock }
		];
		this.setPage({ offset: 0 });
	}
}
