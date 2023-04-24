import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './dashboard/customer/customer/customer.component';

const routes: Routes = [
  // { path: '', redirectTo: 'customer', pathMatch: 'full' },
  // { path: 'customer', component: CustomerComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class DashboardRoutingModule { }
