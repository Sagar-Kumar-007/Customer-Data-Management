import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  dashboard:string="Customers";
  currentUrl!: string;
  user:{unique_name:string;role:string;nbf:number;iat:number;exp:number;email:string} | undefined;
  
  constructor(private router:Router,private dashboardService:DashboardService,private _userService:UserService,private _authService:AuthService){}
  extractJWTToken(){
    let token:string | null=this._authService.getToken();
    try {
      type jwtToken={unique_name:string;role:string;nbf:number;iat:number;exp:number;email:string};
      let decodedToken:{unique_name:string;role:string;nbf:number;iat:number;exp:number;email:string} | undefined;
      if(token) decodedToken = jwt_decode<{unique_name:string;role:string;nbf:number;iat:number;exp:number;email:string}>(token);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return undefined;
    }
  }
  ngOnInit(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        // this.detectDashboard();
        this.dashboardService.detectDashboard(this.currentUrl);
        this.dashboard=this.dashboardService.dashboard;
      }
      this._userService.user=this.extractJWTToken();
      this.user=this._userService.user;
      
    });
  }

  generateInitials(){
    let initials:string="";
    let firstName:string | undefined=this.user?.unique_name.split(' ')[0][0];
    let lastName:string | undefined=this.user?.unique_name.split(' ')[1][0];
    if(firstName && lastName)initials=firstName+lastName;
    return initials;
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
