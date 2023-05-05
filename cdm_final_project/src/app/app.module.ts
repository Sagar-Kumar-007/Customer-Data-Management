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
import {NgConfirmModule} from 'ng-confirm-box';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AuthModule } from './modules/auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './modules/auth/components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    FourOfourComponent,
    
  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgToastModule,
    NgConfirmModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAzfzsRZ4XEwzxiXnjzTybY6TflZnRTeq4',
      libraries: ['places']
    })
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true  
    },
  DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }