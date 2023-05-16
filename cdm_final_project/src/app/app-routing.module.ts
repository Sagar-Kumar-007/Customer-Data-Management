import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourOfourComponent } from './four-ofour/four-ofour.component';
import { CustomerComponent } from './modules/dashboard/dashboard/customer/customer/customer.component';
import { AccountsComponent } from './modules/dashboard/dashboard/accounts/accounts/accounts.component';
import { LogsComponent } from './modules/dashboard/dashboard/logs/logs/logs.component';
import { LoginComponent } from './modules/auth/components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'customerDashboard', pathMatch: 'full' },
  { path: 'customerDashboard', component: CustomerComponent },
  { path: 'logs', component: LogsComponent },
  {path:'accountDashboard',component:AccountsComponent},
  {path:'**',component:FourOfourComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
