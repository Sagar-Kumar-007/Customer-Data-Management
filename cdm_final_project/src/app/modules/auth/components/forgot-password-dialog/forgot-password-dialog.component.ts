import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    private resetService:ResetPasswordService
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
          summary:'Please open the link sent to your email to reset your password!',
          duration:5000,
        });
        this.resetPasswordEmail = '';
        this.showForm = false;
        this.closeForm();
      },
      error:(err)=>{

        this.toast.success({
          detail:'Success',
          summary:'Please open the link sent to your email to reset your password!',
          duration:5000,
        });
        this.resetPasswordEmail = '';
        this.showForm = false;
        this.closeForm();
        
        // this.toast.error({
        //   detail:'ERROR',
        //   summary:'Something went wrong!',
        //   duration:5000,
        // });
        // this.closeForm();
    
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
