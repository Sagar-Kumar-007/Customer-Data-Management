import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsDashboardComponent } from './accounts-dashboard/accounts-dashboard.component';
import { AccountsNavigationPaneComponent } from './accounts-navigation-pane/accounts-navigation-pane.component';



@NgModule({
  declarations: [
    AccountsDashboardComponent,
    AccountsNavigationPaneComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AccountsDashboardComponent,
    AccountsNavigationPaneComponent
  ]
})
export class AccountsModule { }
