import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TimeAgoPipeFilter } from './pipe/timeAgo-pipes.module'

@NgModule({
    imports: [CommonModule],
    declarations: [TimeAgoPipeFilter],
    exports: [CommonModule,TimeAgoPipeFilter]
})
export class SharedModule {


   
 }