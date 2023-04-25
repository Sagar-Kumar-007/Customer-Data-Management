import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signUpForm!:FormGroup;
  constructor(private fb:FormBuilder){ }
  ngOnInit(): void {
    this.signUpForm=this.fb.group({
   firstName:['',Validators.required],
   lastName:['',Validators.required],
   userName:['',Validators.required],
   email:['',Validators.required],
   password:['',Validators.required],

    })
  }
  onSignUp()
  {
      if(this.signUpForm.valid)
      {

      }
      else
      {

      }
  }

}
