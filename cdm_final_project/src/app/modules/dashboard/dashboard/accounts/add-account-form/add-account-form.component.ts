import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-account-form',
  templateUrl: './add-account-form.component.html',
  styleUrls: ['./add-account-form.component.css']
})
export class AddAccountFormComponent {

  addProductMessage:string|undefined;
    addAccount(){
      console.log(this.accountAddForm.value);
      // this.account.addaccount(this.accountAddForm.value).subscribe((result)=>{
      //   console.log(result);
      //   if(result){
      //     this.addProductMessage="Product is successfully added";
      //     setTimeout(()=>{this.addProductMessage = undefined},3000);
      //     this.accountAddForm.reset();
      //   }
      // });
    }

    accountAddForm = new FormGroup({
      cname:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required, Validators.email]),
      logo:new FormControl('',[]),
      sector:new FormControl('',[Validators.required]),
      phoneNo:new FormControl('',[Validators.required,Validators.minLength(10)]),
      location:new FormControl('',[Validators.required]),
      countryCode:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
    });
   
    
    get cname(){
      return this.accountAddForm.get('cname');
    }
    get email(){
      return this.accountAddForm.get('email');
    }
    get sector(){
      return this.accountAddForm.get('sector');
    }

    get location(){
      return this.accountAddForm.get('location');
    }
    get countryCode(){
      return this.accountAddForm.get('countryCode');
    }
    get description(){
      return this.accountAddForm.get('description');
    }
    get phoneNo(){
      return this.accountAddForm.get('phoneNo');
    }



}
