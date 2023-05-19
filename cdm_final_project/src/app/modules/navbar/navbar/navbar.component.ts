import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { ForgotPasswordDialogComponent } from '../../auth/components/forgot-password-dialog/forgot-password-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  dashboard:string="Customers";
  currentUrl!: string;
  user:{unique_name:string;role:string;nbf:number;iat:number;exp:number;email:string} | undefined;
  
  constructor(
    private router:Router,
    private dashboardService:DashboardService,
    private _userService:UserService,
    private auth:AuthService,
    private dialog: MatDialog
    ){}
  

  dialogRef: MatDialogRef<ForgotPasswordDialogComponent> | undefined;

  openForgotPasswordDialog() {
    this.dialogRef = this.dialog.open(ForgotPasswordDialogComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed:', result);
    });
  }
  extractJWTToken(){
    let token:string | null=this.auth.getToken();
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
  signout(){
    this.auth.signOut();
   }
}
