import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CustomerModule} from './dashboard/customer/customer.module';
import {AccountsModule} from './dashboard/accounts/accounts.module';
@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CustomerModule,
    AccountsModule,
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
