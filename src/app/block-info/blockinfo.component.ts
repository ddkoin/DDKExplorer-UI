import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BlockDetailsService } from '../shared/services/blockDetails.service';
import { BlockHeightDetailsService } from '../shared/services/blockHeightDetails.service';

@Component({
	templateUrl: './blockinfo.component.html',
	styleUrls: ['./blockinfo.css']
})
export class BlockInfoComponent implements OnInit, AfterViewInit {
	dtOptions: DataTables.Settings = {};
	public blockInfo: any = [];
	public bxHeight: any = [];
	public blockId: any;
	public bxsHight: any;
	public typeId: any;
	

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private BlockDetails: BlockDetailsService, private allBxHeight: BlockHeightDetailsService) {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.typeId = params.name;
			if (this.typeId == 'blockId') {
				this.blockId = params.id;
			} else {
				this.bxsHight = params.id;
			}
		});
	}

	blockDetail(blockId) {
		this.blockInfo = [];
		this.BlockDetails.getBlockDetail(blockId).subscribe(
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

	getBlockId(id, name) {
		this.router.navigate(['/block-info', name, id]);
		this.blockDetail(id);
	}

	showBlock(block) {
		//show transactions here for a particular block
		this.BlockDetails.getTransactions(block.id).subscribe(
			resp => {
				if(resp.success) {
					console.log('transactions in a block : ', resp.transactions);
				}
				else {
					console.log('error : ', resp);
				}
			}
		)
	}

	ngOnInit() {
		if (this.typeId == 'blockId') {
			var blockId = window.location.href.split('/blockId/')[1]
			this.blockDetail(blockId);
		} else {
			this.blockHeight();
		}


	}

	ngAfterViewInit() {
		let flag:any = true
		window.localStorage.setItem('flag',flag)
		this.dtOptions = {
			pagingType: 'full_numbers'
		};
	}
}



