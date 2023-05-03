import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourOfourComponent } from './four-ofour/four-ofour.component';
import { CustomerComponent } from './modules/dashboard/dashboard/customer/customer/customer.component';
import { AccountsComponent } from './modules/dashboard/dashboard/accounts/accounts/accounts.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { SignupComponent } from './modules/auth/components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

import { LogsComponent } from './modules/dashboard/dashboard/logs/logs/logs.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'account', component:AccountsComponent, canActivate:[AuthGuard]},
  {path:'customer',component:CustomerComponent},
  {path:'logs',component:LogsComponent},
  {path:'customer/getcustomer/:customerEmail',component:AccountsComponent, canActivate:[AuthGuard]},
  {path:'**',component:FourOfourComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
