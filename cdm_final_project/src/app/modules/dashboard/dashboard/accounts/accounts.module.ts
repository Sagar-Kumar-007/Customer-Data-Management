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
import { AccountsComponent } from './accounts/accounts.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { NgToastModule } from 'ng-angular-popup';



@NgModule({
  declarations: [
    AccountsDashboardComponent,
    AccountsNavigationPaneComponent,
    AddAccountFormComponent,
    AccountsComponent,
    GoogleMapComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgToastModule,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAzfzsRZ4XEwzxiXnjzTybY6TflZnRTeq4',
      libraries: ['places']
    }),
    RouterModule,
    NgChartsModule
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
