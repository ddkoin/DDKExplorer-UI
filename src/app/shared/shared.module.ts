import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TimeAgoPipeFilter } from './pipe/timeAgo-pipes.module';
import { TimestampPipeFilter } from './pipe/timestamp-pipes.module'


@NgModule({
    imports: [CommonModule],
    declarations: [TimeAgoPipeFilter,TimestampPipeFilter],
    exports: [CommonModule,TimeAgoPipeFilter,TimestampPipeFilter]
})
export class SharedModule {


   
 }
