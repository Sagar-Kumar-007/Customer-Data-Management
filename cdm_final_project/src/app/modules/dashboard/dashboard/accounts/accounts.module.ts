import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsDashboardComponent } from './accounts-dashboard/accounts-dashboard.component';
import { AccountsNavigationPaneComponent } from './accounts-navigation-pane/accounts-navigation-pane.component';
import {HttpClientModule} from '@angular/common/http'
import { AccountsService } from 'src/app/services/accounts.service';
import {MatDialogModule} from '@angular/material/dialog';
import { AddAccountFormComponent } from './add-account-form/add-account-form.component'
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MaterialModule } from 'src/app/modules/material/material.module';



@NgModule({
  declarations: [
    AccountsDashboardComponent,
    AccountsNavigationPaneComponent,
    AddAccountFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports:[
    AccountsDashboardComponent,
    AccountsNavigationPaneComponent
  ],
  providers:[
    AccountsService
  ]
})
export class AccountsModule { }
