import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DelegateMonitorComponent } from './delegate-monitor.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../shared/shared.module'

const routes: Routes = [{
	path: '',
	data: {
        title: 'Delegate Monitor',
        urls: [{title: 'Home',url: '/delegate-monitor'},{title: 'Delegate Monitor'}]
    },
	component: DelegateMonitorComponent
}];

@NgModule({
	imports: [
    	CommonModule, 
		RouterModule.forChild(routes),
		DataTablesModule,
		NgbModule,
		SharedModule
    ],
	declarations: [DelegateMonitorComponent]
})
export class DelegateMonitorModule { }