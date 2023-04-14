import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CustomerModule} from './dashboard/customer/customer.module';
import {AccountsModule} from './dashboard/accounts/accounts.module';
import { HistoryComponent } from './dashboard/history/history.component';
@NgModule({
  declarations: [
    DashboardComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    CustomerModule,
    AccountsModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
