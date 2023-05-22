import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ConfirmPasswordValidator } from 'src/app/helpers/confirm-password.validator';
import { ResetPassword } from 'src/app/helpers/reset-password.model';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  password: string | undefined;
  confirmPassword: string | undefined;
  passwordMatchError: boolean = false;
  resetPasswordForm!:FormGroup;
  emailToken!:string;
  resetPasswordObj=new ResetPassword();

  constructor(private fb:FormBuilder,
              private resetService:ResetPasswordService,
              private router:Router,
              private toast:NgToastService,
              public resetPassworddialogRef: MatDialogRef<ResetPasswordComponent>,
              public forgetPassdialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
              
              ){ }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      securityCode: [null, Validators.required],
    });
  }

reset(){
 
    this.resetPasswordObj.email=this.resetPasswordForm.value.email;
    this.resetPasswordObj.newPassword=this.resetPasswordForm.value.password;
    this.resetPasswordObj.confirmPassword=this.resetPasswordForm.value.confirmPassword;
    this.resetPasswordObj.emailToken=this.resetPasswordForm.value.securityCode;

    if (this.password !== this.confirmPassword) {
      this.toast.error({
        detail: 'Error',
        summary: "Password doesn't match !",
        duration: 5000,
      });
      this.passwordMatchError = true;
    }
    else{
      this.passwordMatchError=false;
    }
    
  if (this.resetPasswordForm.valid && !this.passwordMatchError) 
  {
    
    this.resetService.resetPassword(this.resetPasswordObj).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Password reset successfully',
          duration: 5000,
        });
        this.resetPassworddialogRef.close();
        this.forgetPassdialogRef.close();
      },
      error: (err) => {
            alert(err?.error.message);
      }
    });
  }
  else{
  
  }
  

}

}
