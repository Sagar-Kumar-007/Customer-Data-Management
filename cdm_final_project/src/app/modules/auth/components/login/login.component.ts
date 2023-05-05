import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

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
              private router:Router,
              private toast:NgToastService
  ){}


  ngOnInit(): void {

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

addSignup() {
  let container = document.querySelector(".container") as HTMLDivElement;
  container.classList.add("sign-up-mode");
};

removeSignup(){
  let container = document.querySelector(".container") as HTMLDivElement;
  container.classList.remove("sign-up-mode");
};

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
        this.router.navigate(['customer']);

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
        console.log(this.signUpForm.value);
        this.auth.signUp(this.signUpForm.value).subscribe({
          next:(res=>{
            console.log("a: "+res.message);
            alert(res.message);
            this.signUpForm.reset();
            this.router.navigate(['login']);
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
