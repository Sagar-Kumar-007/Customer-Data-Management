import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerNavigationPaneComponent } from './customer-navigation-pane/customer-navigation-pane.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import {FormsModule} from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';






@NgModule({
  declarations: [
    CustomerNavigationPaneComponent,
    CustomerDashboardComponent,
    CreateCustomerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule
  ],
  exports:[
    CustomerDashboardComponent,
    CustomerNavigationPaneComponent,
    CreateCustomerComponent
  ]
})
export class CustomerModule { }
