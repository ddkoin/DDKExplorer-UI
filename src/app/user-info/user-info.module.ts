import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from './user-info.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
declare var jquery:any;
declare var $ :any;




const routes: Routes = [{
	path: '',
	data: {
        title: 'User Detail',
        urls: [{title: 'Home',url: '/dashboard'},{title: 'User Detail'}]
    },
	component: UserInfoComponent
}];

@NgModule({
	imports: [
    	FormsModule,
    	CommonModule, 
		RouterModule.forChild(routes),
		DataTablesModule,
		NgbModule,
		SharedModule,
		NgxDatatableModule
    ],
	declarations: [UserInfoComponent]
})
export class UserInfoModule { }
