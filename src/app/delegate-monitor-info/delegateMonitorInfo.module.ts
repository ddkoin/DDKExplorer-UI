import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DelegateMonitorInfoComponent } from './delegateMonitorInfo.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../shared/shared.module'

const routes: Routes = [{
	path: '',
	data: {
		title: 'Delegate Monitor Info',
		urls: [{ title: 'Home', url: '/dashboard' }, { title: 'Delegate Monitor Information' }]
	},
	component: DelegateMonitorInfoComponent
}];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		DataTablesModule,
		NgbModule,
		SharedModule
	],
	declarations: [DelegateMonitorInfoComponent]
})
export class DelegateMonitorInfoModule { }