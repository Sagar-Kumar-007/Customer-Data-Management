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
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }