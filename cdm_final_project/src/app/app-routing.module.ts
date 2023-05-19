import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourOfourComponent } from './four-ofour/four-ofour.component';
import { CustomerComponent } from './modules/dashboard/dashboard/customer/customer/customer.component';
import { AccountsComponent } from './modules/dashboard/dashboard/accounts/accounts/accounts.component';
import { AuthGuard } from './guards/auth.guard';
import { LogsComponent } from './modules/dashboard/dashboard/logs/logs/logs.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { ResetPasswordComponent } from './modules/auth/components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login', component:LoginComponent},
  { path: 'customerDashboard', component: CustomerComponent,canActivate:[AuthGuard] },
  { path: 'logs', component: LogsComponent },
  {path:'accountDashboard',component:AccountsComponent,canActivate:[AuthGuard]},
  {path:'resetPassword',component:ResetPasswordComponent},
  // {path:'account', component:AccountsComponent, canActivate:[AuthGuard]},
  // {path:'customer',component:CustomerComponent},
  {path:'**',component:FourOfourComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
