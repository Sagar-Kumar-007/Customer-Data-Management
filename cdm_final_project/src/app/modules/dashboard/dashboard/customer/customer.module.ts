import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerNavigationPaneComponent } from './customer-navigation-pane/customer-navigation-pane.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';



@NgModule({
  declarations: [
    CustomerNavigationPaneComponent,
    CustomerDashboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CustomerDashboardComponent,
    CustomerNavigationPaneComponent
  ]
})
export class CustomerModule { }
