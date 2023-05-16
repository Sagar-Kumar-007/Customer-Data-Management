import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



addSignup() {
  let container = document.querySelector(".container-login") as HTMLDivElement;
  container.classList.add("sign-up-mode");
};

removeSignup(){
  let container = document.querySelector(".container-login") as HTMLDivElement;
  container.classList.remove("sign-up-mode");
};

}