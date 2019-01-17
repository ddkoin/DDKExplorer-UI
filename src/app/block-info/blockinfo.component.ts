import { Component, OnInit, AfterViewInit, ViewContainerRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BlockDetailsService } from '../shared/services/blockDetails.service';
import { BlockHeightDetailsService } from '../shared/services/blockHeightDetails.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	templateUrl: './blockinfo.component.html',
	styleUrls: ['./blockinfo.css']
})
export class BlockInfoComponent implements OnInit, AfterViewInit {
	public blockInfo: any = [];
	public bxHeight: any = [];
	public blockId: any;
	public bxsHight: any;
	public typeId: any;
	closeResult: string;
	public traxList: any;
	public traxlength: any;
	public innerSpinner = true;

	constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, private activatedRoute: ActivatedRoute, private BlockDetails: BlockDetailsService, private allBxHeight: BlockHeightDetailsService, private modalService: NgbModal) {
		this.toastr.setRootViewContainerRef(vcr);
		this.activatedRoute.params.subscribe((params: Params) => {
			this.typeId = params.name;
			if (this.typeId == 'blockId') {
				this.blockId = params.id;
			} else {
				this.bxsHight = params.id;
			}
		});
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
		let flag: any = true
		window.localStorage.setItem('flag', flag);
	}

	numOfTrxs(content) {
		this.modalService.open(content, { windowClass: "myCustomModalClass", size: 'lg', backdrop: 'static' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	};

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	/* For Block Detail */
	blockDetail(blockId) {
		this.blockInfo = [];
		this.BlockDetails.getBlockDetail(blockId).subscribe(
			resp => {
				if (resp && resp.success) {
					this.blockInfo = resp.block;
					this.innerSpinner = false;
				}
			},
			error => {
				console.log(error)
			}
		);
	}

	/* For Block Height */
	blockHeight() {
		this.blockInfo = [];
		this.allBxHeight.getBlockHeightDetail(parseInt(this.bxsHight)).subscribe(
			resp => {
				if (resp && resp.success) {
					this.blockInfo = resp.blocks[0];
					this.innerSpinner = false;
				}else {
					console.log('error : ', resp);
				}
			},
			error => {
				//this.toastr.error('This is not good!', error);
				console.log(error)
			}
		);
	}

	/* For BlockId */
	getBlockId(id, name) {
		this.router.navigate(['/block-info', name, id]);
		this.blockDetail(id);
	}

	/* Show Block */
	showBlock(block) {
		//show transactions here for a particular block
		this.BlockDetails.getTransactions(block.id).subscribe(
			resp => {
				if (resp && resp.success) {
					this.traxList = resp.transactions;
					this.traxlength = resp.transactions.length;
				} else {
					console.log('error : ', resp);
				}
			}
		)
	}


}



