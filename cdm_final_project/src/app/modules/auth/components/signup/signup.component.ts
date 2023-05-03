import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signUpForm!:FormGroup;

  constructor(private fb:FormBuilder, private auth:AuthService, private router: Router){ }

  ngOnInit(): void {

    this.signUpForm=this.fb.group({
      
   firstName:['',Validators.required],
   lastName:['',Validators.required],
   userName:['',Validators.required],
   email:['',Validators.required],
   password:['',Validators.required],

    })
  }
  OnSignUp()
  {
      if(this.signUpForm.valid)
      {
        console.log(this.signUpForm.value);
        this.auth.signUp(this.signUpForm.value).subscribe({
          next:(res=>{
            alert(res.message);
            this.signUpForm.reset();
            this.router.navigate(['login']);
          }),
          error:(err=>{
            alert(err?.error.message)
          })
        })
      }
      else
      {

      }
  }

}
