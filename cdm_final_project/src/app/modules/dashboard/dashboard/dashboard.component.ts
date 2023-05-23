import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private _dashboardService:DashboardService,private _router:Router){
  }
  dashboard:string='';
  ngOnInit(){
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let currentUrl = event.url;
        this._dashboardService.detectDashboard(currentUrl);
        this.dashboard=this._dashboardService.dashboard;
        this._dashboardService.sendGetCustomerDetailsEvent();
      }
    });
  }
}



