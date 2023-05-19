import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;
  signUpForm!:FormGroup;
  showForm = false;

  dialogRef: MatDialogRef<ForgotPasswordDialogComponent> | undefined;


  constructor(
              private fb:FormBuilder,
              private auth:AuthService,
              private router:Router,
              private toast:NgToastService,
              private dialog: MatDialog,
              
  ){}


  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]]
    });

    this.loginForm= this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
     })
  }

addSignup() {
  let container = document.querySelector(".container-login") as HTMLDivElement;
  container.classList.add("sign-up-mode");
};

removeSignup(){
  let container = document.querySelector(".container-login") as HTMLDivElement;
  container.classList.remove("sign-up-mode");
};


openForgotPasswordDialog() {
  this.dialogRef = this.dialog.open(ForgotPasswordDialogComponent);
  this.dialogRef.afterClosed().subscribe(result => {
    // Handle dialog close event here (e.g., perform any necessary actions)
    console.log('Dialog closed:', result);
  });
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
        this.router.navigate(['customerDashboard']);

      }),
      error:(err=>{
        alert(err?.error.message)
      })
    })
  }
  else{
   
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