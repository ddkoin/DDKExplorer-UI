import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimeAgoPipeFilter } from './pipe/timeAgo-pipes.module';
import { HoursMinAgoPipeFilter } from './pipe/hourMinAgo-pipes.module';
import { DayHourAgoPipeFilter } from './pipe/dayHourAgo-pipes.module';
import { TimestampPipeFilter } from './pipe/timestamp-pipes.module';
import { ExponentialStrengthPipe } from './pipe/exponentialStrength-pipes.module'

@NgModule({
    imports: [CommonModule],
    declarations: [TimeAgoPipeFilter,DayHourAgoPipeFilter,HoursMinAgoPipeFilter,TimestampPipeFilter,ExponentialStrengthPipe],
    exports: [CommonModule,TimeAgoPipeFilter,DayHourAgoPipeFilter,HoursMinAgoPipeFilter,TimestampPipeFilter,ExponentialStrengthPipe]
})
export class SharedModule {


   
 }
