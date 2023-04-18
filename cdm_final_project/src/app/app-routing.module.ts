import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsDashboardComponent } from './modules/dashboard/dashboard/accounts/accounts-dashboard/accounts-dashboard.component';
import { CreateCustomerComponent } from './modules/dashboard/dashboard/customer/create-customer/create-customer.component';
import { CustomerDashboardComponent } from './modules/dashboard/dashboard/customer/customer-dashboard/customer-dashboard.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { SignupComponent } from './modules/auth/components/signup/signup.component';

const routes: Routes = [
  { path: 'account', component: AccountsDashboardComponent },
  {path:'register', component:CreateCustomerComponent},
  {path:'customer', component: CustomerDashboardComponent },
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
