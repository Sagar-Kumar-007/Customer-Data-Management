import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsDashboradComponent } from './logs-dashborad/logs-dashborad.component';
import { LogsNavigationPaneComponent } from './logs-navigation-pane/logs-navigation-pane.component';
import { LogsComponent } from './logs/logs.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    LogsDashboradComponent,
    LogsNavigationPaneComponent,
    LogsComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    NgxPaginationModule
  ], 
  exports:[
    LogsDashboradComponent,
    LogsNavigationPaneComponent,
  ]
})
export class LogsModule { }
