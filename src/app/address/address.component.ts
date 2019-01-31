import { Component, AfterViewInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

declare var jquery: any;
declare var $: any;

@Component({
	templateUrl: './address.component.html',
	styleUrls: ['./address.css']
})
/**
 * Initializes component
 * @class
 * @classdesc Main Component logic.
 * @author Hotam Singh
 */
export class AddressComponent implements AfterViewInit {
	dtOptions: DataTables.Settings = {};
	constructor() { }
	show = false;

	/**
	 * @function toggle between tabs
	 * @param  
	 */
	showComments($event) {
		if ($event.activeId == "tab-selectbyid1") {
			this.show = true;
			this.loadCommenents();
		} else {
			this.show = false;
		}
	}
	/**
	 * @implements ngAfterViewInit
	 * @description load address component
	 */
	ngAfterViewInit() {
		this.dtOptions = {
			pagingType: 'full_numbers'
		};
	}
   
	/**
	 * @function loadCommenents
	 * @description load comments
	 */
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



