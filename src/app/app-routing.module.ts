import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

export const Approutes: Routes = [
{
    path: '',
    component: FullComponent,
    children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', loadChildren: './dashboards/dashboard.module#DashboardModule'},
        { path: 'block', loadChildren: './block/block.module#BlockModule' },
        { path: 'block-info', loadChildren: './block-info/blockinfo.module#BlockInfoModule' },           
        { path: 'transactions', loadChildren: './transactions/transactions.module#TransactionsModule' },
        { path: 'transaction-info/:name/:id',  loadChildren: './transaction-info/transactioninfo.module#TransactionInfoModule' },
        { path: 'user-info/:name/:id', loadChildren: './user-info/user-info.module#UserInfoModule' },
        { path: 'address', loadChildren: './address/address.module#AddressModule' },
        { path: 'charts', loadChildren: './charts/charts.module#ChartModule' },
        { path: 'apps', loadChildren: './apps/apps.module#AppsModule' },
        { path: 'delegate-monitor', loadChildren: './delegate-monitor/delegate-monitor.module#DelegateMonitorModule' },
        { path: 'delegate-monitor-info', loadChildren: './delegate-monitor-info/delegateMonitorInfo.module#DelegateMonitorInfoModule' }
        
    ]
},
{
    path: '',
    component: BlankComponent,
    children: [
        {
            path: 'authentication',
            loadChildren: './authentication/authentication.module#AuthenticationModule'
        }
    ]
}, 
{
    path: '**',
    redirectTo: '/authentication/404' 
}];


