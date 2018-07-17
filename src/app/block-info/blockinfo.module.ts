import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BlockInfoComponent } from './blockinfo.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../shared/shared.module'

const routes: Routes = [{
	path: ':name/:id',
	data: {
        title: 'Block',
        urls: [{title: 'Home',url: '/dashboard'},{title: 'Block Information'}]
    },
	component: BlockInfoComponent
}];

@NgModule({
	imports: [
    	CommonModule, 
		RouterModule.forChild(routes),
		DataTablesModule,
		NgbModule,
		SharedModule
    ],
	declarations: [BlockInfoComponent]
})
export class BlockInfoModule { }