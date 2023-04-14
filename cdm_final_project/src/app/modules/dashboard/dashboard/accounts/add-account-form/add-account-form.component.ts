import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-account-form',
  templateUrl: './add-account-form.component.html',
  styleUrls: ['./add-account-form.component.css']
})
export class AddAccountFormComponent {

  addProductMessage:string|undefined;
    addCustomer(){
      // this.customer.addCustomer(this.customerAddForm.value).subscribe((result)=>{
      //   console.log(result);
      //   if(result){
      //     this.addProductMessage="Product is successfully added";
      //     setTimeout(()=>{this.addProductMessage = undefined},3000);
      //     this.customerAddForm.reset();
      //   }
      // });
    }

    customerAddForm = new FormGroup({
      cname:new FormControl('',[Validators.required]),
      logo:new FormControl('',[]),
      typeOfCompany:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required, Validators.email]),
      gstin:new FormControl('',[Validators.required,Validators.minLength(15)]),
      headquarter:new FormControl('',[Validators.required]),
      phoneNo:new FormControl('',[Validators.required,Validators.minLength(10)]),
      website:new FormControl('',[]),
      countryCode:new FormControl('',[Validators.required])
    });
   
    get email(){
      return this.customerAddForm.get('email');
    }
    get cname(){
      return this.customerAddForm.get('cname');
    }

    get gstin(){
      return this.customerAddForm.get('gstin');
    }

    get headquarter(){
      return this.customerAddForm.get('headquarter');
    }
    get countryCode(){
      return this.customerAddForm.get('countryCode');
    }
    get description(){
      return this.customerAddForm.get('description');
    }
    get phoneNo(){
      return this.customerAddForm.get('phoneNo');
    }



}
