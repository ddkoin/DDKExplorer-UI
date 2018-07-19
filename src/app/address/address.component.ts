import { Component, AfterViewInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

declare var jquery: any;
declare var $: any;



@Component({
	templateUrl: './address.component.html',
	styleUrls: ['./address.css']
})
export class AddressComponent implements AfterViewInit {
	dtOptions: DataTables.Settings = {};
	constructor() { }
	show = false;

	showComments($event) {
		if ($event.activeId == "tab-selectbyid1") {
			this.show = true;
			this.loadCommenents();
		} else {
			this.show = false;
		}
	}
	ngAfterViewInit() {
		this.dtOptions = {
			pagingType: 'full_numbers'
		};
	}

	loadCommenents() {
		$(document).ready(function () {
			$('#comments-container').comments({
				profilePictureURL: 'https://app.viima.com/static/media/user_profiles/user-icon.png',
				getComments: function (success, error) {
					var commentsArray = [
						
					]

					var usersArray = [
						
					]
					success(commentsArray);
				}
			});

		});
	}
}



