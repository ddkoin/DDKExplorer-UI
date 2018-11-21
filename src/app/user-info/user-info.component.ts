import { Component, ViewChild, OnInit, AfterViewInit, TemplateRef, ContentChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AddressDetailService } from '../shared/services/addressDetail.service';
import { SenderidDetailService } from '../shared/services/senderidDetail.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var jquery: any;
declare var $: any;


@Component({
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.css']
})
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


	constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, private senderidDetail: SenderidDetailService, private activatedRoute: ActivatedRoute, private addressDetail: AddressDetailService) {
		this.toastr.setRootViewContainerRef(vcr);
		this.activatedRoute.params.subscribe((params: Params) => {
			this.typeId = params.id;
		});
	}
	ngAfterViewInit() {
		this.AddressDetail();
	}
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

	/* For Transactions Detail By ID */
	getTxId(id, name) {
		this.router.navigate(['/transaction-info', name, id]);
	}

	clickEvent(event) {
		//if you just want to toggle the class; change toggle variable.
		this.toggle != this.toggle;
	}


	/* For SenderId */
	getSenderId(senderId) {
		this.typeId = senderId;
		this.router.navigate(['/user-info', senderId]);
		this.AddressDetail();
		this.senderIdDetail(this.page.size, this.page.offset);
	}

	/* For Show Transaction */
	showTransactions() {
		this.tab1 = true;
		this.tab2 = false;
		this.isActive = true;
		this.isAct = false;
	}

	/* For Show Comments */
	showComments() {
		this.tab1 = false;
		this.tab2 = true;
		this.loadCommenents(this.addressInfo, this.explorerServer);
		this.isAct = true;
		this.isActive = false;
	}


	/* For Detail Address */
	AddressDetail() {
		this.addressInfo = [];
		if (this.typeId === this.address) {
			this.typeId = this.addressReplace;
		}
		this.addressDetail.getAddressDetail(this.typeId).subscribe(
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
				this.toastr.error('This is not good!', error);
				console.log(error)
			}
		);
	}

	/* For Sender Detail ID */
	senderIdDetail(limit, offset) {
		this.senderInfo = [];
		this.addressInfo.count = 0;
		this.page.totalElements = 0;
		if (this.typeId === this.address) {
			this.typeId = this.addressReplace;
		}
		this.senderidDetail.getSenderidDetail(this.typeId).subscribe(
			resp => {
				if (resp && resp.success) {
					let data = {};
					let publicKey = resp.account.publicKey;
					this.senderidDetail.getSenderTransactions(limit, offset, this.typeId, publicKey).subscribe(
						resp => {
							if (resp && resp.success) {
								this.senderInfo = resp.transactions;
								this.page.totalElements = resp.count;
								this.addressInfo.count = this.page.totalElements;
								this.innerSpinner = false;
							}
						},
						error => {
							this.toastr.error('This is not good!', error);
							console.log(error)
						}
					);
				}
			},
			error => {
				this.toastr.error('This is not good!', error);
				console.log(error);
			}
		);
	}

	setPage(event) {
		this.page.offset = this.page.size * event.offset;
		this.senderIdDetail(this.page.size, this.page.offset);
	}

	/* For load Commenents */
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