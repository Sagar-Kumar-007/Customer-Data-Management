import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  decodedToken:string='';
  constructor(private _authService:AuthService){}
  ngOnInit(){
    let token:string | null=this._authService.getToken();
    // console.log(token);
    try {
      let decodedToken:string='';
      if(token) decodedToken = jwt_decode(token);
      console.log(decodedToken);
      this.decodedToken=decodedToken;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
    }
  }
}



