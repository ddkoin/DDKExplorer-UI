import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TransactionInfoComponent } from './transactioninfo.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../shared/shared.module'

const routes: Routes = [{
	path: '',
	data: {
        title: 'Transaction',
        urls: [{title: 'Home',url: '/dashboard'},{title: 'Transaction Information'}]
    },
	component: TransactionInfoComponent
}];

@NgModule({
	imports: [
    	CommonModule, 
		RouterModule.forChild(routes),
		DataTablesModule,
		NgbModule,
		SharedModule
    ],
	declarations: [TransactionInfoComponent]
})
export class TransactionInfoModule { }