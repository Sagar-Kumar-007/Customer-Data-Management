import { Component } from '@angular/core';

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html',
  styleUrls: ['./accounts-dashboard.component.css']
})
export class AccountsDashboardComponent {
  onToggleClick(){
    console.log("Yes");
    let navigation = document.querySelector(".navigation") as HTMLDivElement;
    let main = document.querySelector(".main") as HTMLDivElement;
    let toggle=document.querySelector(".fa-bars") as HTMLIFrameElement;
    navigation.classList.toggle("active");
    main.classList.toggle("active");
    toggle.classList.add("fa-flip");
    setTimeout(()=>{
      toggle.classList.remove("fa-flip");
    },500);
  }
}
