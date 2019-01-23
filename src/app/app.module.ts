import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { allTransactionsService } from './shared/services/allTransactions.service';
import { allBlockService } from './shared/services/allBlock.service';
import { BlockHeightDetailsService } from './shared/services/blockHeightDetails.service';
import { transactionsDetailsService } from './shared/services/transactionsDetails.service';
import { BlockDetailsService } from './shared/services/blockDetails.service';
import { AddressDetailService } from './shared/services/addressDetail.service';
import { SenderidDetailService } from './shared/services/senderidDetail.service';
import { DelegatesService } from './shared/services/delegates.service'
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SocketService } from './shared/services/socket.service';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    NgbModule.forRoot(),
    
    RouterModule.forRoot(Approutes, { useHash: true }),
    PerfectScrollbarModule,
    HttpClientModule
  ],
  providers: [DelegatesService, SenderidDetailService, AddressDetailService, BlockHeightDetailsService, allTransactionsService, allBlockService, transactionsDetailsService, BlockDetailsService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }, {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }, SocketService],
  // exports: [
  //   OrdinalPipe
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
