import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourOfourComponent } from './four-ofour/four-ofour.component';
import { CustomerComponent } from './modules/dashboard/dashboard/customer/customer/customer.component';
import { AccountsComponent } from './modules/dashboard/dashboard/accounts/accounts/accounts.component';
import { LogsComponent } from './modules/dashboard/dashboard/logs/logs/logs.component';

const routes: Routes = [
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  { path: 'customer', component: CustomerComponent },
  { path: 'logs', component: LogsComponent },
  {path:'customer/getcustomer/:customerEmail',component:AccountsComponent},
  {path:'**',component:FourOfourComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
