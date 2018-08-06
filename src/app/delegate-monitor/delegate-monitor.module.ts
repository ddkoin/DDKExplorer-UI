import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DelegateMonitorComponent } from './delegate-monitor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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
		NgbModule,
		SharedModule,
		NgxDatatableModule
    ],
	declarations: [DelegateMonitorComponent]
})
export class DelegateMonitorModule { }
