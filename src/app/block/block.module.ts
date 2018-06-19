import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BlockComponent } from './block.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from './../shared/shared.module'

const routes: Routes = [{
	path: '',
	data: {
        title: 'Block',
        urls: [{title: 'Home',url: '/dashboard'},{title: 'Block'}]
    },
	component: BlockComponent
}];

@NgModule({
	imports: [
    	CommonModule, 
		RouterModule.forChild(routes),
		DataTablesModule,
		SharedModule
		
    ],
	declarations: [BlockComponent]
})
export class BlockModule { }