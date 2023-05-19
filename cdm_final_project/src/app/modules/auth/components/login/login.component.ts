import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;
  signUpForm!:FormGroup;



  constructor(
              private fb:FormBuilder,
              private auth:AuthService,
              private _router:Router,
              private toast:NgToastService,
              private _authService:AuthService,
              private _userService:UserService
  ){}


  ngOnInit(): void {

    if(this._authService.isLoggedIn()){
      this._router.navigate(['customerDashboard']);
    }
    else{
      this.signUpForm=this.fb.group({
      
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        userName:['',Validators.required],
        email:['',Validators.required],
        password:['',Validators.required],
        confirmPassword:['',Validators.required]
     
         }),
  
      this.loginForm= this.fb.group({
        username:['',Validators.required],
        password:['',Validators.required]
       })
    }
  }

addSignup() {
  let container = document.querySelector(".container-login") as HTMLDivElement;
  container.classList.add("sign-up-mode");
};

removeSignup(){
  let container = document.querySelector(".container-login") as HTMLDivElement;
  container.classList.remove("sign-up-mode");
};

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

OnLogin() {
  if(this.loginForm.valid)
  {
    this.auth.login(this.loginForm.value).subscribe({
       next:(res=>{
        alert(res.message);
        console.log(res.token);
        this.loginForm.reset();
        this.auth.storeToken(res.token);
        this.toast.success({detail:"SUCCESS", summary:res.message,duration:5000});
        this._router.navigate(['customerDashboard']);
        this._userService.user=this.extractJWTToken();


      }),
      error:(err=>{
        alert(err?.error.message)
      })
    })
  }
  else{
    //throw error
  }
 }

 OnSignUp()
  {
      if(this.signUpForm.valid)
      {
        // console.log(this.signUpForm.value);
        this.auth.signUp(this.signUpForm.value).subscribe({
          next:(res=>{
            console.log("a: "+res.message);
            alert(res.message);
            this.signUpForm.reset();
            // this.router.navigate(['login']);
            this.removeSignup();
          }),
          error:(err=>{
            console.log("a: "+err.message);
            alert(err?.error.message)
          })
        })
      }
      else
      {

      }
  }


}