import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';



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
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    public forgotPasswordDialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    private formBuilder: FormBuilder,
    private _toastService:NgToastService,
    private _resetService:ResetPasswordService,
    private dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  openResetPasswordDialog() {
    this.submitForm();
  }

  submitForm() {
    this.resetPasswordEmail=this.forgotPasswordForm.get('email')!.value;
    console.log('Submitted email:', this.resetPasswordEmail);
    
    this._resetService.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
      next:(res)=>{

        this.dialogRef = this.dialog.open(ResetPasswordComponent);
        this.dialogRef.afterClosed().subscribe(result => {
          console.log('Dialog closed:', result);
        });

        this._toastService.success({
          detail:'Success',
          summary:'A security code has been sent to your mail.',
          duration:5000,
        });
        this.resetPasswordEmail = '';
        this.showForm = false;
        // this.router.navigate(["/resetPassword"]);
       
      },
      error:(err)=>{

        this._toastService.error({
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
  closeForm(){
    this.forgotPasswordDialogRef.close();
  }


}
