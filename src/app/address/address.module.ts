import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from './address.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

declare var jquery: any;
declare var $: any;

const routes: Routes = [{
	path: '',
	data: {
		title: 'Address',
		urls: [{ title: 'Home', url: '/dashboard' }, { title: 'Address' }]
	},
	component: AddressComponent
}];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		RouterModule.forChild(routes),
		DataTablesModule,
		NgbModule
	],
	declarations: [AddressComponent]
})
export class AddressModule { }