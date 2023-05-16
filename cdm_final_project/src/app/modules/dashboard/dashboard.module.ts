import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CustomerModule} from './dashboard/customer/customer.module';
import {AccountsModule} from './dashboard/accounts/accounts.module';
import { RouterModule} from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { LogsModule } from './dashboard/logs/logs.module';
import { SidebarModule } from "../sidebar/sidebar.module";
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
    declarations: [
        DashboardComponent,
    ],
    exports: [DashboardComponent],
    imports: [
        CommonModule,
        AccountsModule,
        CustomerModule,
        RouterModule,
        MaterialModule,
        LogsModule,
    MatPaginatorModule,
    NgxPaginationModule,
        SidebarModule
    ]
})
export class DashboardModule { }
