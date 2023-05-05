import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

loginForm!:FormGroup;

constructor(
            private fb:FormBuilder,
            private auth:AuthService,
            private router:Router,
            private toast:NgToastService
){}

  ngOnInit(): void {
    this.loginForm= this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
     })
  }

   OnLogin() {
    if(this.loginForm.valid)
    {
      this.auth.login(this.loginForm.value).subscribe({
         next:(res=>{
          alert(res.message);
          console.log(res.token);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          this.toast.success({detail:"SUCCESS", summary:res.message,duration:5000});
          this.router.navigate(['customer']);

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




addSignup() {
  let container = document.querySelector(".container") as HTMLDivElement;
  container.classList.add("sign-up-mode");
};

removeSignup(){
  let container = document.querySelector(".container") as HTMLDivElement;
  container.classList.remove("sign-up-mode");
};

}
