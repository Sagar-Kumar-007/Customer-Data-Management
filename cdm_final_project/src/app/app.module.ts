import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './modules/material/material.module'
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgToastModule } from 'ng-angular-popup';
import { FourOfourComponent } from './four-ofour/four-ofour.component';
import { AuthModule } from './modules/auth/auth.module';

import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
// import { msalConfig, protectedResources } from './auth-config';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FourOfourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgToastModule,
    AuthModule,
    ReactiveFormsModule,
    HttpClientModule,
    // MsalModule.forRoot(new PublicClientApplication(msalConfig),
    // {
    //   // The routing guard configuration. 
    //   interactionType: InteractionType.Redirect,
    //   authRequest: {
    //     scopes: protectedResources.todoListApi.scopes
    //   }
    // },
    // {
    //   // MSAL interceptor configuration.
    //   // The protected resource mapping maps your web API with the corresponding app scopes. If your code needs to call another web API, add the URI mapping here.
    //   interactionType: InteractionType.Redirect,
    //   protectedResourceMap: new Map([
    //     [protectedResources.todoListApi.endpoint, protectedResources.todoListApi.scopes]
    //   ])
    // })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }