import { Component, OnInit, AfterViewInit, ViewContainerRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BlockService } from '../shared/services/block.service';
import { TransactionsService } from '../shared/services/transactions.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { JSONLoaderService } from '../shared/services/json.loader.service';

@Component({
	templateUrl: './blockinfo.component.html',
	styleUrls: ['./blockinfo.css']
})

/**
 * @description Initializes component
 * @implements OnInit, AfterViewInit
 * @class BlockInfoComponent
 * @classdesc Main Component logic.
 * @author Hotam Singh
 */
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
	public transactionTypes: any = {};

	/**
	 * @constructor
	 * @param toastr : toast manager
	 * @param vcr : view container reference
	 * @param router : router
	 * @param activatedRoute : activated route
	 * @param blockService : block service
	 * @param transactionService : transaction service
	 * @param modalService : modal service
	 */
	constructor(
		public toastr: ToastsManager, vcr: ViewContainerRef,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private blockService: BlockService,
		private transactionService: TransactionsService,
		private modalService: NgbModal,
		private transactionTypesService: JSONLoaderService
	) {
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

	/**
	 * @implements ngOnInit
	 * @description load block info by blockId OR blockHeight
	 */
	ngOnInit() {
		this.transactionTypesService.getJSON().subscribe(transactionTypes => {
			this.transactionTypes = transactionTypes;
		});
		if (this.typeId == 'blockId') {
			var blockId = window.location.href.split('/blockId/')[1]
			this.blockDetail(blockId);
		} else {
			this.blockHeight();
		}
	}

	/**
	 * @implements ngAfterViewInit
	 * @description load view for block info page
	 */
	ngAfterViewInit() {
		let flag: any = true
		window.localStorage.setItem('flag', flag);
	}

	/**
	 * @function numOfTrxs
	 * @description open modal popup
	 * @param content 
	 */
	numOfTrxs(content) {
		this.modalService.open(content, { windowClass: "myCustomModalClass", size: 'lg', backdrop: 'static' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	};

	/**
	 * @private @function getDismissReason
	 * @description returns a reason
	 * @param reason 
	 */
	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	/**
	 * @function blockDetail 
	 * @description get block details by blockId
	 * @param blockId 
	 */
	blockDetail(blockId) {
		this.blockInfo = [];
		this.blockService.getBlockDetailsById(blockId).subscribe(
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

	/**
	 * @function blockHeight
	 * @description get block details by block height
	 */
	blockHeight() {
		this.blockInfo = [];
		this.blockService.getBlockDetailsByHeight(parseInt(this.bxsHight)).subscribe(
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

	/**
	 * @function getBlockId
	 * @description navigate to block-info page
	 * @param id 
	 * @param name 
	 */
	getBlockId(id, name) {
		this.router.navigate(['/block-info', name, id]);
		this.blockDetail(id);
	}

	/**
	 * @function showBlock
	 * @description get all transactions in a block
	 * @param block : { Object }
	 */
	showBlock(block) {
		this.transactionService.getBlockTransactions(block.id).subscribe(
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



