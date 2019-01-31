import { Component, ViewChild, OnInit, AfterViewInit, TemplateRef, ContentChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { TransactionsService } from '../shared/services/transactions.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var jquery: any;
declare var $: any;


@Component({
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.css']
})

/**
 * @description Initializes component
 * @implements OnInit, AfterViewInit
 * @class UserInfoComponent
 * @classdesc Main Component logic.
 * @author Hotam Singh
 */
export class UserInfoComponent implements OnInit, AfterViewInit {
	rows = [];
	columns = [];
	offset: any;
	temp = [];
	public page: any = { totalElements: 0, pageNumber: 0, size: 20, searchValue: "" }
	public timeout: any = 100;
	@ViewChild('id') id: TemplateRef<any>;
	@ViewChild('senderId') senderId: TemplateRef<any>;
	@ViewChild('recipientId') recipientId: TemplateRef<any>;
	@ViewChild('timestamp') timestamp: TemplateRef<any>;
	@ViewChild('amount') amount: TemplateRef<any>;
	@ViewChild('stakedAmount') stakedAmount: TemplateRef<any>;
	@ViewChild('fee') fee: TemplateRef<any>;
	@ViewChild('txName') txName: TemplateRef<any>;
	public addressInfo: any = [];
	public typeId: any;
	public senderInfo: any = [];
	public explorerServer = "https://explorer-e.ddkoin.com";
	tab1 = true;
	tab2 = false;
	show = false;
	private toggle: boolean = false;
	public isActive = true;
	public isAct = false;
	public innerSpinner = true;
	public address = 'DDK00000000000000000000';
	public addressReplace = 'DDK12817390500414975490';

	/**
	 * @constructor with given params
	 * @param toastr 
	 * @param vcr 
	 * @param router 
	 * @param activatedRoute 
	 * @param userService 
	 * @param transactionService 
	 */
	constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService, private transactionService: TransactionsService) {
		this.toastr.setRootViewContainerRef(vcr);
		this.activatedRoute.params.subscribe((params: Params) => {
			this.typeId = params.id;
		});
	}

	/**
	 * @implements ngAfterViewInit
	 * @description load view for user info page
	 */
	ngAfterViewInit() {
		this.AddressDetail();
	}
	/**
	 * @implements ngOnInit
	 * @description setup columns and set page size, limit etc for a table
	 */
	ngOnInit() {
		this.columns = [
			{ name: 'Transaction ID', prop: 'id', width: '240', cellTemplate: this.id },
			{ name: 'Sender ID', prop: 'senderId', width: '240', cellTemplate: this.senderId },
			{ name: 'Recipient ID', prop: 'recipientId', width: '240', cellTemplate: this.recipientId },
			{ name: 'Tx Type', prop: 'trsName', cellTemplate: this.txName },
			{ name: 'Time', prop: 'timestamp', cellTemplate: this.timestamp },
			{ name: 'Tx Fee', prop: 'fee', cellTemplate: this.fee },
			{ name: 'Height', prop: 'height' },
			{ name: 'Amount', prop: 'amount', cellTemplate: this.amount }
		];
		this.setPage({ offset: 0 });
	}

	/**
	 * @function navigate to transaction-info page
	 * @param id : transactionId
	 * @param name : name
	 */
	getTxId(id, name) {
		this.router.navigate(['/transaction-info', name, id]);
	}

	/**
	 * @function toggle when clicked an element
	 */
	clickEvent(event) {
		this.toggle != this.toggle;
	}


	/**
	 * @function getSenderId
	 * @description Navigate to user-info page and load user details i.e address info, transaction info etc
	 */
	getSenderId(senderId) {
		this.typeId = senderId;
		this.router.navigate(['/user-info', senderId]);
		this.AddressDetail();
		this.senderIdDetail(this.page.size, this.page.offset);
	}

	/**
	 * @function showTransactions
	 * @description Enables show transactions tab
	 */
	showTransactions() {
		this.tab1 = true;
		this.tab2 = false;
		this.isActive = true;
		this.isAct = false;
	}

	/**
	 * @function showComments
	 * @description Enables show comments tab
	 */
	showComments() {
		this.tab1 = false;
		this.tab2 = true;
		this.loadCommenents(this.addressInfo, this.explorerServer);
		this.isAct = true;
		this.isActive = false;
	}


	/**
	 * @function AddressDetail
	 * @description get address details
	 */
	AddressDetail() {
		this.addressInfo = [];
		if (this.typeId === this.address) {
			this.typeId = this.addressReplace;
		}
		this.userService.getAddressDetail(this.typeId).subscribe(
			resp => {
				if (resp && resp.success) {
					this.addressInfo = resp.account;
					if (resp.account.address === this.addressReplace) {
						this.addressInfo.address = this.address;
						this.addressInfo.publicKey = 'N/A';
					}
				}
			},
			error => {
				//this.toastr.error('This is not good!', error);
				console.log(error)
			}
		);
	}

	/**
	 * @function senderIdDetail
	 * @description load address details and respective transactions details for a address
	 * @param limit 
	 * @param offset 
	 */
	senderIdDetail(limit, offset) {
		this.senderInfo = [];
		this.addressInfo.count = 0;
		this.page.totalElements = 0;
		if (this.typeId === this.address) {
			this.typeId = this.addressReplace;
		}
		this.userService.getAddressDetail(this.typeId).subscribe(
			resp => {
				if (resp && resp.success) {
					let data = {};
					this.transactionService.getSenderTransactionsBySenderId(limit, offset, this.typeId, resp.account.address).subscribe(
						resp => {
							if (resp && resp.success) {
								this.senderInfo = resp.transactions;
								this.page.totalElements = resp.count;
								this.addressInfo.count = this.page.totalElements;
							}
							this.innerSpinner = false;
						},
						error => {
							//this.toastr.error('This is not good!', error);
							this.innerSpinner = false;
							console.log(error)
						}
					);
				}
			},
			error => {
				//this.toastr.error('This is not good!', error);
				console.log(error);
			}
		);
	}

	/**
	 * @function setPage
	 * @description set page offset and load user details
	 * @param event 
	 */
	setPage(event) {
		this.page.offset = this.page.size * event.offset;
		this.senderIdDetail(this.page.size, this.page.offset);
	}

	/**
	 * @function loadCommenents
	 * @description load comments 
	 * @param userInfo: user details 
	 * @param explorerServer: explorer domain link
	 */
	loadCommenents(userInfo, explorerServer) {
		$(document).ready(function () {
			$('#comments-container').comments({
				profilePictureURL: 'https://app.viima.com/static/media/user_profiles/user-icon.png',
				getComments: function (success, error) {
					$.ajax({
						type: 'get',
						url: explorerServer + '/api/comments/',
						success: function (commentsArray) {
							success(commentsArray)
						},
						error: error
					});
				},
				getUsers: function (success, error) {
					$.ajax({
						type: 'get',
						url: explorerServer + '/api/users/',
						success: function (userArray) {
							success(userArray)
						},
						error: error
					});
				},
				postComment: function (commentJSON, success, error) {
					commentJSON.fullname = userInfo.address;
					$.ajax({
						type: 'post',
						url: explorerServer + '/api/comments/',
						data: commentJSON,
						success: function (comment) {
							success(comment)
						},
						error: error
					});
				},
				putComment: function (commentJSON, success, error) {
					$.ajax({
						type: 'put',
						url: explorerServer + '/api/comments/' + commentJSON.id,
						data: commentJSON,
						success: function (comment) {
							success(comment)
						},
						error: error
					});
				},
				deleteComment: function (commentJSON, success, error) {
					$.ajax({
						type: 'delete',
						url: explorerServer + '/api/comments/' + commentJSON.id,
						success: success,
						error: error
					});
				},
				upvoteComment: function (commentJSON, success, error) {
					var commentURL = explorerServer + '/api/comments/' + commentJSON.id;
					var upvotesURL = commentURL + '/upvotes/';
					$.ajax({
						type: 'post',
						url: upvotesURL,
						data: {
							comment: commentJSON.id,
							user_has_upvoted: commentJSON.user_has_upvoted
						},
						success: function () {
							success(commentJSON)
						},
						error: error
					});
				}
			});

		});
	}
}
