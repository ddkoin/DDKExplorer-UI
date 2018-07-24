import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsComponent } from './transactions.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from './../shared/shared.module'

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Routes = [{
	path: '',
	data: {
        title: 'Transactions',
        urls: [{title: 'Home',url: '/dashboard'},{title: 'Transactions'}]
    },
	component: TransactionsComponent
}];

@NgModule({
	imports: [
    	FormsModule,
    	CommonModule, 
		RouterModule.forChild(routes),
		DataTablesModule,
		SharedModule,
		NgxDatatableModule
    ],
	declarations: [TransactionsComponent]
})
export class TransactionsModule { }
