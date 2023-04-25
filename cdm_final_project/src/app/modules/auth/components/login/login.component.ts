import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

loginForm!:FormGroup;

constructor(private fb:FormBuilder, private auth:AuthService){}
  ngOnInit(): void {
    this.loginForm= this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
     })
  }

   OnLogin() {
    if(this.loginForm.valid)
    {
      // console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value).subscribe({
        next:(res=>{
          alert(res.message);
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
    }
    else{
      //throw error
    }
   }


}
