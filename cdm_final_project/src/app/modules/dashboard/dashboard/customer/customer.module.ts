import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import {FormsModule} from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { CustomerService } from 'src/app/services/customer.service';
import {NgConfirmModule} from 'ng-confirm-box';
import { NgToastModule } from 'ng-angular-popup';
import { CustomerComponent } from './customer/customer.component';
import { Router, RouterModule } from '@angular/router';import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination';






@NgModule({
  declarations: [
    CustomerDashboardComponent,
    CreateCustomerComponent,
    CustomerComponent,
    MapComponent
  ],
  imports: [
    MatPaginatorModule,
    NgxPaginationModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    NgConfirmModule,
    NgToastModule,
    RouterModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAzfzsRZ4XEwzxiXnjzTybY6TflZnRTeq4',
      libraries: ['places']
    })
  ],
  exports:[
    CustomerDashboardComponent,
    CreateCustomerComponent
  ],
  providers: [CustomerService]
})
export class CustomerModule { }
