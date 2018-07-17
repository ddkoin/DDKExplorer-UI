import { Component, AfterViewInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Router, ActivatedRoute, Params } from '@angular/router';
import{ AddressDetailService } from '../shared/services/addressDetail.service';

import { SenderidDetailService } from '../shared/services/senderidDetail.service'

declare var jquery: any;
declare var $: any;

@Component({
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.css']
})
export class UserInfoComponent implements AfterViewInit {
	dtOptions: DataTables.Settings = {};
	public addressInfo:any = [];
	public typeId:any;
	public senderInfo:any = [];
	public explorerServer = "http://159.65.139.248:7003";

	constructor(private senderidDetail:SenderidDetailService, private activatedRoute: ActivatedRoute, private addressDetail:AddressDetailService) {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.typeId = params.id;
		});
	 }
	show = false;

	showComments($event) {
		if ($event.activeId == "tab-selectbyid1") {
			this.show = true;
			this.loadCommenents(this.addressInfo, this.explorerServer);
		} else {
			this.show = false;
		}
	}

	saveComment() {

	}


	AddressDetail() {
		this.addressDetail.getAddressDetail(this.typeId).subscribe(
			resp => {
				if (resp.success) {
					this.addressInfo = resp.account;
				}
			},
			error => {
				console.log(error)
			}
		);
	}

	senderIdDetail() {
		this.senderidDetail.getSenderidDetail(this.typeId).subscribe(
			resp => {
				if (resp.success) {
					this.senderInfo = resp.transactions;
				}
			},
			error => {
				console.log(error)
			}
		);
	}

	ngAfterViewInit() {
		this.AddressDetail();
		this.senderIdDetail();
		this.dtOptions = {
			pagingType: 'full_numbers'
		};
	}

	loadCommenents(userInfo, explorerServer) {
		$(document).ready(function () {
			$('#comments-container').comments({
				profilePictureURL: 'https://app.viima.com/static/media/user_profiles/user-icon.png',
				getComments: function(success, error) {
					$.ajax({
						type: 'get',
						url: explorerServer + '/api/comments/',
						success: function(commentsArray) {
							success(commentsArray)
						},
						error: error
					});
				},
				getUsers: function(success, error) {
					$.ajax({
						type: 'get',
						url: explorerServer + '/api/users/',
						success: function(userArray) {
							success(userArray)
						},
						error: error
					});
				},
				postComment: function(commentJSON, success, error) {
					commentJSON.fullname = userInfo.address;
					$.ajax({
						type: 'post',
						url: explorerServer + '/api/comments/',
						data: commentJSON,
						success: function(comment) {
							success(comment)
						},
						error: error
					});
				},
				putComment: function(commentJSON, success, error) {
					$.ajax({
						type: 'put',
						url: explorerServer + '/api/comments/' + commentJSON.id,
						data: commentJSON,
						success: function(comment) {
							success(comment)
						},
						error: error
					});
				},
				deleteComment: function(commentJSON, success, error) {
					$.ajax({
						type: 'delete',
						url: explorerServer + '/api/comments/' + commentJSON.id,
						success: success,
						error: error
					});
				},
				upvoteComment: function(commentJSON, success, error) {
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



