import { Component, AfterViewInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AddressDetailService } from '../shared/services/addressDetail.service';
import { SenderidDetailService } from '../shared/services/senderidDetail.service';



declare var jquery: any;
declare var $: any;

@Component({
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.css']
})
export class UserInfoComponent implements AfterViewInit {
	dtOptions: DataTables.Settings = {};
	public addressInfo: any = [];
	public typeId: any;
	public senderInfo: any = [];

	constructor(private senderidDetail: SenderidDetailService, private activatedRoute: ActivatedRoute, private addressDetail: AddressDetailService) {
		this.activatedRoute.params.subscribe((params: Params) => {
			//console.log('params===', params)
			this.typeId = params.id;
		});
	}
	show = false;

	showComments($event) {
		if ($event.activeId == "tab-selectbyid1") {
			this.show = true;
			this.loadCommenents();
		} else {
			this.show = false;
		}
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
	}

	loadCommenents() {
		$(document).ready(function () {
			$('#comments-container').comments({
				profilePictureURL: 'https://app.viima.com/static/media/user_profiles/user-icon.png',
				getComments: function (success, error) {
					var commentsArray = [
						{
							"id": 1,
							"parent": null,
							"created": "2015-01-01",
							"modified": "2015-01-01",
							"content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu.",
							"pings": [],
							"creator": 6,
							"fullname": "Simon Powell",
							"profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
							"created_by_admin": false,
							"created_by_current_user": false,
							"upvote_count": 3,
							"user_has_upvoted": false,
							"is_new": false
						},
						{
							"id": 2,
							"parent": null,
							"created": "2015-01-02",
							"modified": "2015-01-02",
							"content": "Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu.",
							"pings": [],
							"creator": 5,
							"fullname": "Administrator",
							"profile_picture_url": "https://app.viima.com/static/media/user_profiles/admin-user-icon.png",
							"created_by_admin": true,
							"created_by_current_user": false,
							"upvote_count": 2,
							"user_has_upvoted": false,
							"is_new": false
						},
						{
							"id": 3,
							"parent": null,
							"created": "2015-01-03",
							"modified": "2015-01-03",
							"content": "@Hank Smith sed posuere interdum sem.\nQuisque ligula eros ullamcorper https://www.google.com/ quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget #velit.",
							"pings": [3],
							"creator": 1,
							"fullname": "You",
							"profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
							"created_by_admin": false,
							"created_by_current_user": true,
							"upvote_count": 2,
							"user_has_upvoted": true,
							"is_new": false
						},
						{
							"id": 4,
							"parent": 3,
							"created": "2015-01-04",
							"modified": "2015-01-04",
							"file_url": "http://www.w3schools.com/html/mov_bbb.mp4",
							"file_mime_type": "video/mp4",
							"creator": 4,
							"fullname": "Todd Brown",
							"profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
							"created_by_admin": false,
							"created_by_current_user": false,
							"upvote_count": 0,
							"user_has_upvoted": false,
							"is_new": true
						},
						{
							"id": 5,
							"parent": 4,
							"created": "2015-01-05",
							"modified": "2015-01-05",
							"content": "Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit.",
							"pings": [],
							"creator": 3,
							"fullname": "Hank Smith",
							"profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
							"created_by_admin": false,
							"created_by_current_user": false,
							"upvote_count": 0,
							"user_has_upvoted": false,
							"is_new": true
						},
						{
							"id": 6,
							"parent": 1,
							"created": "2015-01-06",
							"modified": "2015-01-06",
							"content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu.",
							"pings": [],
							"creator": 2,
							"fullname": "Jack Hemsworth",
							"profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
							"created_by_admin": false,
							"created_by_current_user": false,
							"upvote_count": 1,
							"user_has_upvoted": false,
							"is_new": false
						},
						{
							"id": 7,
							"parent": 1,
							"created": "2015-01-07",
							"modified": "2015-01-07",
							"content": "Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit.",
							"pings": [],
							"creator": 5,
							"fullname": "Administrator",
							"profile_picture_url": "https://app.viima.com/static/media/user_profiles/admin-user-icon.png",
							"created_by_admin": true,
							"created_by_current_user": false,
							"upvote_count": 0,
							"user_has_upvoted": false,
							"is_new": false
						},
						{
							"id": 8,
							"parent": 6,
							"created": "2015-01-08",
							"modified": "2015-01-08",
							"content": "Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu.",
							"pings": [],
							"creator": 1,
							"fullname": "You",
							"profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
							"created_by_admin": false,
							"created_by_current_user": true,
							"upvote_count": 0,
							"user_has_upvoted": false,
							"is_new": false
						},
						{
							"id": 9,
							"parent": 8,
							"created": "2015-01-09",
							"modified": "2015-01-10",
							"content": "Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit.",
							"pings": [],
							"creator": 7,
							"fullname": "Bryan Connery",
							"profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
							"created_by_admin": false,
							"created_by_current_user": false,
							"upvote_count": 0,
							"user_has_upvoted": false,
							"is_new": false
						},
						{
							"id": 10,
							"parent": 9,
							"created": "2015-01-10",
							"modified": "2015-01-10",
							"content": "Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit.",
							"pings": [],
							"creator": 1,
							"fullname": "You",
							"profile_picture_url": "https://app.viima.com/static/media/user_profiles/user-icon.png",
							"created_by_admin": false,
							"created_by_current_user": true,
							"upvote_count": 0,
							"user_has_upvoted": false,
							"is_new": false
						}
					]

					var usersArray = [
						{
							id: 1,
							fullname: "Current User",
							email: "current.user@viima.com",
							profile_picture_url: "https://app.viima.com/static/media/user_profiles/user-icon.png"
						},
						{
							id: 2,
							fullname: "Jack Hemsworth",
							email: "jack.hemsworth@viima.com",
							profile_picture_url: "https://app.viima.com/static/media/user_profiles/user-icon.png"
						},
						{
							id: 3,
							fullname: "Hank Smith",
							email: "hank.smith@viima.com",
							profile_picture_url: "https://app.viima.com/static/media/user_profiles/user-icon.png"
						},
						{
							id: 4,
							fullname: "Todd Brown",
							email: "todd.brown@viima.com",
							profile_picture_url: "https://app.viima.com/static/media/user_profiles/user-icon.png"
						},
						{
							id: 5,
							fullname: "Administrator",
							email: "administrator@viima.com",
							profile_picture_url: "https://app.viima.com/static/media/user_profiles/user-icon.png"
						},
						{
							id: 6,
							fullname: "Simon Powell",
							email: "simon.powell@viima.com",
							profile_picture_url: "https://app.viima.com/static/media/user_profiles/user-icon.png"
						},
						{
							id: 7,
							fullname: "Bryan Connery",
							email: "bryan.connery@viima.com",
							profile_picture_url: "https://app.viima.com/static/media/user_profiles/user-icon.png"
						}
					]
					success(commentsArray);
				}
			});

		});
	}
}



