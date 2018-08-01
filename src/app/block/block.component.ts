import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { allBlockService } from '../shared/services/allBlock.service';
import { AddressDetailService } from '../shared/services/addressDetail.service';




@Component({
	templateUrl: './block.component.html',
	styleUrls: ['./block.css'],
	
})
export class BlockComponent implements OnInit, AfterViewInit {
	rows = [];
	columns = [];
	offset: any;
	temp = [];
	public page: any = { totalElements: 0, pageNumber: 0, size: 10, searchValue: "" };
	public timeout: any = 100;
	@ViewChild('blockId') blockId: TemplateRef<any>;
	@ViewChild('height') height: TemplateRef<any>;
	@ViewChild('generator') generator: TemplateRef<any>;
	@ViewChild('amount') amount: TemplateRef<any>;
	@ViewChild('fee') fee: TemplateRef<any>;
	@ViewChild('timestamp') timestamp: TemplateRef<any>;
	@ViewChild('previousBlock') previousBlock: TemplateRef<any>;
	public blocklist : any = [];
	fixedTimezone = new Date(Date.UTC(2016, 0, 1, 17, 0, 0, 0));

	constructor(private router: Router, private allBlocks :allBlockService, private userService: AddressDetailService) { }

	allBlockList(limit, offset) {
		this.allBlocks.getAllBlocks(limit, offset).subscribe(
			resp => {
				if (resp.success) {
					this.blocklist = resp.blocks;
					this.page.totalElements = resp.count;
				}
			},
			error => {
				console.log(error)
			}
		);
	}

	filterData(event) {
		if (event) {
			clearTimeout(this.timeout);
			const that = this;
			this.timeout = setTimeout(function() {
				var searchValue = event.target.value;
				if(searchValue !== '') {
					if (!isNaN(searchValue)) {
						that.allBlocks.getBlocksBasedOnHeight(searchValue).subscribe(
							resp => {
								if(parseInt(resp.count) !== 0) {
									if(resp.success) {
										that.blocklist = resp.blocks;
										that.page.totalElements = resp.count;
									}
								} else {
									that.allBlocks.getBlocksBasedOnblockId(searchValue).subscribe(
										resp => {
											if(resp.success) {
												that.blocklist = [];
												that.blocklist.push(resp.block);
												that.page.totalElements = 1;
											}else {
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
								if (resp.success) {
									that.allBlocks.getBlocksBasedOnpublicKey(resp.account.publicKey).subscribe(
										resp => {
											if(resp.success) {
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

	/* For Block ID By Height */
	getBlockId(id,name) {
		this.router.navigate(['/block-info', name, id]);
		 this.blocklist= [];
	}
	/* For Block Detail By Height */
	getBlockHeight(height,name) {
		this.router.navigate(['/block-info',name, height]);
	}

	getSenderId(senderId) {
		this.router.navigate(['/user-info', senderId]);
	}

	setPage(event) {
		this.page.offset = this.page.size * event.offset;
		this.allBlockList(this.page.size, this.page.offset);
	}
	
	ngAfterViewInit() {
		//this.allBlockList();
	}
	ngOnInit() {
		this.columns = [
			{ name: 'Block ID', prop: 'id', width: '220', cellTemplate: this.blockId },
			{ name: 'Height', prop: 'height', cellTemplate: this.height },
			{ name: 'Generator', prop: 'generatorId', width: '240', cellTemplate: this.generator },
			{ name: 'Number Of Tx', prop: 'numberOfTransactions' },
			{ name: 'Confirmations', prop: 'confirmations' },
			{ name: 'Total Amount', prop: 'totalAmount', cellTemplate: this.amount },
			{ name: 'Total Fee', prop: 'totalFee', cellTemplate: this.fee },
			{ name: "Time", prop: 'timestamp', cellTemplate: this.timestamp },
			{ name: 'Previous Block', prop: 'previousBlock', width: '220', cellTemplate: this.previousBlock }
		];
		this.setPage({ offset: 0 });
	}
}
