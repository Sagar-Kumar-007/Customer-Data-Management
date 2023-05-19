import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ConfirmPasswordValidator } from 'src/app/helpers/confirm-password.validator';
import { ResetPassword } from 'src/app/helpers/reset-password.model';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm!:FormGroup;
  emailToken!:string;
  resetPasswordObj=new ResetPassword();

  constructor(private fb:FormBuilder,
              private resetService:ResetPasswordService,
              private router:Router,
              private toast:NgToastService){ }

  ngOnInit():void{
    this.resetPasswordForm=this.fb.group({
      email:[null,Validators.required],
      password:[null,Validators.required],
      confirmPassword:[null,Validators.required],
      securityCode:[null,Validators.required],
    } );
  }

reset(){
 
    this.resetPasswordObj.email=this.resetPasswordForm.value.email;
    this.resetPasswordObj.newPassword=this.resetPasswordForm.value.password;
    this.resetPasswordObj.confirmPassword=this.resetPasswordForm.value.confirmPassword;
    this.resetPasswordObj.emailToken=this.resetPasswordForm.value.securityCode;
    
  if (this.resetPasswordForm.valid) 
  {
    
    this.resetService.resetPassword(this.resetPasswordObj).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Password reset successfully',
          duration: 5000,
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toast.success({
          detail: 'Error',
          summary: 'Something went Wrong.',
          duration: 5000,
        });
      }
    });
  }
  else{
    console.log("Hello");
  }
  

}

}




// this.resetPasswordForm=this.fb.group({
//   email:[null,Validators.required],
//   password:[null,Validators.required],
//   confirmPassword:[null,Validators.required],
//   securityCode:[null,Validators.required],
// },{
//   validator: ConfirmPasswordValidator("password", "confirmPassword")
// } );