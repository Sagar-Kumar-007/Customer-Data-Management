import { Component } from '@angular/core';

@Component({
  selector: 'app-logs-dashborad',
  templateUrl: './logs-dashborad.component.html',
  styleUrls: ['./logs-dashborad.component.css']
})
export class LogsDashboradComponent {

  p:number =1;
  //Toggle
  onToggleClick(){
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



  // Table 

  
}
