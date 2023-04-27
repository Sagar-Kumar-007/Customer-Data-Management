import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CustomerModule} from './dashboard/customer/customer.module';
import {AccountsModule} from './dashboard/accounts/accounts.module';
import { HistoryComponent } from './dashboard/history/history.component';
import { RouterModule} from '@angular/router';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HistoryComponent,
  ],
  imports: [
    CommonModule,
    AccountsModule,
    CustomerModule,
    RouterModule,
    MaterialModule,
    
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
