import { Component, Inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IAccount } from 'src/app/datatypes/account';
import { AccountsDashboardComponent } from '../accounts-dashboard/accounts-dashboard.component';

@Component({
  selector: 'app-add-account-form',
  templateUrl: './add-account-form.component.html',
  styleUrls: ['./add-account-form.component.css']
})
export class AddAccountFormComponent {
  constructor(private _accountsService:AccountsService,private matDialogRef:MatDialogRef<AddAccountFormComponent>,@Inject(MAT_DIALOG_DATA) private data:{
    status: string;
    account: IAccount | null;
    email: string | null | undefined;
}){}
  addProductMessage:string|undefined;
  customerId:number=1;
  ngOnInit(){
    if(this.data.status==='updateAccount'){
      if(this.data.account)this.accountAddForm.patchValue(this.data.account);
    }
  }

    addAccount(){
      console.log(this.accountAddForm.value);
      this._accountsService.addAccount(this.customerId.toString(),this.accountAddForm.value).subscribe((result)=>{
        if(result){
          console.log("Account Added");
        }
      });
    }

    updateAccount(){
      console.log(this.accountAddForm.value);
      this._accountsService.updateAccount(this.accountAddForm.value,this.data.account?.id?.toString()).subscribe(result=>{
        if(result){
          console.log(result);
          console.log("Account Updated");
        }
      });
    }

    accountFormSubmit(){
      if(this.data.status==='addAccount'){
        this.addAccount();
      }
      else if(this.data.status==='updateAccount'){
        this.updateAccount();
      }
    }

    accountAddForm = new FormGroup({
      aname:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required, Validators.email]),
      location:new FormControl('',[Validators.required]),
      estYear:new FormControl('',[Validators.required]),
    });
   
    
    get aname(){
      return this.accountAddForm.get('aname');
    }
    get email(){
      return this.accountAddForm.get('email');
    }
    get location(){
      return this.accountAddForm.get('location');
    }
    get estYear(){
      return this.accountAddForm.get('estYear');
    }

    ngOnDestroy(){
      this.matDialogRef.close();
    }

}
