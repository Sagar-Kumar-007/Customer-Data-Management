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
import { CustomerService } from 'src/app/services/customer.service';
import {NgConfirmModule} from 'ng-confirm-box';
import { NgToastModule } from 'ng-angular-popup';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer/customer.component';






@NgModule({
  declarations: [
    CustomerNavigationPaneComponent,
    CustomerDashboardComponent,
    CreateCustomerComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    NgConfirmModule,
    NgToastModule
    CustomerRoutingModule
  ],
  exports:[
    CustomerDashboardComponent,
    CustomerNavigationPaneComponent,
    CreateCustomerComponent
  ],
  providers: [CustomerService]
})
export class CustomerModule { }
