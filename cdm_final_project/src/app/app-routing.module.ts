import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourOfourComponent } from './four-ofour/four-ofour.component';
import { CustomerComponent } from './modules/dashboard/dashboard/customer/customer/customer.component';
import { AccountsComponent } from './modules/dashboard/dashboard/accounts/accounts/accounts.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { SignupComponent } from './modules/auth/components/signup/signup.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  { path: 'customer', component: CustomerComponent },
  {path:'customer/getcustomer/:customerEmail',component:AccountsComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'**',component:FourOfourComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
