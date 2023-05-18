import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  dashboard:string="Customers";
  currentUrl!: string;
  constructor(private router:Router,private dashboardService:DashboardService){}
  
  ngOnInit(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        // this.detectDashboard();
        this.dashboardService.detectDashboard(this.currentUrl);
        this.dashboard=this.dashboardService.dashboard;
      }
    });
  }


  onToggleClick() {
    let navigation = document.querySelector('.navigation') as HTMLDivElement;
    let mainNav = document.querySelector('.main-nav') as HTMLDivElement;
    let main = document.querySelector('.main') as HTMLDivElement;
    let toggle = document.querySelector('.fa-bars') as HTMLIFrameElement;
    navigation.classList.toggle('active');
    mainNav.classList.toggle('active');
    main.classList.toggle('active');
    toggle.classList.add('fa-flip');
    setTimeout(() => {
      toggle.classList.remove('fa-flip');
    }, 500);
  }
  searchVal(data:HTMLInputElement){
    this.dashboardService.sendSearchEvent(data);
  }
  resetPassword(){

  }
  logout(){
    
  }
}
