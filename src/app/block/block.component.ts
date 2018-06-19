import { Component, AfterViewInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Router } from '@angular/router';
import { allBlockService } from '../shared/services/allBlock.service';


@Component({
	templateUrl: './block.component.html',
	styleUrls: ['./block.css'],
	
})
export class BlockComponent implements AfterViewInit {
	dtOptions: DataTables.Settings = {};
	public blocklist : any = [];
	fixedTimezone = new Date(Date.UTC(2016, 0, 1, 17, 0, 0, 0));

	constructor(private router: Router, private allBlocks :allBlockService) { 
		
	}

	allBlockList() {
		this.allBlocks.getAllBlocks().subscribe(
			resp => {
				if (resp.success) {
					this.blocklist = resp.blocks;
				}
			},
			error => {
				console.log(error)
			}
		);
	}

	/* For Block ID By Height */
	getBlockId(id,name) {
		this.router.navigate(['/block-info', name, id]);
	}
	/* For Block Detail By Height */
	getBlockHeight(height,name) {
		this.router.navigate(['/block-info',name, height]);
	}
	
	ngAfterViewInit() {
		this.allBlockList();
	}
}