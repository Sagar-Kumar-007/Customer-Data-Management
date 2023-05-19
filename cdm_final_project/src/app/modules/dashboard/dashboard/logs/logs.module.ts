import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsDashboradComponent } from './logs-dashborad/logs-dashborad.component';

import { LogsComponent } from './logs/logs.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    LogsDashboradComponent,
    LogsComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    NgxPaginationModule
  ], 
  exports:[
    LogsDashboradComponent,
  ]
})
export class LogsModule { }
