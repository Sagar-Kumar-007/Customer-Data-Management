import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ResetPasswordService } from 'src/app/services/reset-password.service';



@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.css']
})
export class ForgotPasswordDialogComponent implements OnInit {
  [x: string]: any;
  forgotPasswordForm!: FormGroup;
  showForm = false;
  resetPasswordEmail:string='';


  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    private formBuilder: FormBuilder,
    private toast:NgToastService,
    private resetService:ResetPasswordService,
    private router:Router
  ) { }


  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submitForm() {
    this.resetPasswordEmail=this.forgotPasswordForm.get('email')!.value;
    console.log('Submitted email:', this.resetPasswordEmail);
    
    this.resetService.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
      next:(res)=>{
        this.toast.success({
          detail:'Success',
          summary:'A security code has been sent to your mail.',
          duration:5000,
        });
        this.resetPasswordEmail = '';
        this.showForm = false;
        this.router.navigate(["/resetPassword"]);
        this.closeForm();
      },
      error:(err)=>{

        this.toast.error({
          detail:'ERROR',
          summary:'Your entered email is not correct, try again!',
          duration:5000,
        });
        this.closeForm();
    
      }
    });
  }


  isFieldInvalid(fieldName: string) {
    const field = this.forgotPasswordForm.get(fieldName);
    return field!.invalid && (field!.touched || field!.dirty);
  }

  closeForm()
  {
    this.dialogRef.close();
  }
}
