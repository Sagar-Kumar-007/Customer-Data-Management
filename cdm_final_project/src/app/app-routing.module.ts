import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsDashboardComponent } from './modules/dashboard/dashboard/accounts/accounts-dashboard/accounts-dashboard.component';
import { CreateCustomerComponent } from './modules/dashboard/dashboard/customer/create-customer/create-customer.component';
import { CustomerDashboardComponent } from './modules/dashboard/dashboard/customer/customer-dashboard/customer-dashboard.component';

const routes: Routes = [
  { path: 'account', component: AccountsDashboardComponent },
  {path:'register', component:CreateCustomerComponent},
  {path:'customer', component: CustomerDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
