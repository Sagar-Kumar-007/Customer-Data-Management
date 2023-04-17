import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/datatypes/customer';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html',
  styleUrls: ['./accounts-dashboard.component.css']
})
export class AccountsDashboardComponent implements OnInit {

  customerId:number=1;
  accountsService:AccountsService|null=null;
  accountsList:ICustomer|undefined;
  constructor(accountsService:AccountsService){
    this.accountsService=accountsService;
  }

  ngOnInit(){
    this.accountsService?.accountsList(this.customerId.toString()).subscribe((result:ICustomer | undefined)=>{
      this.accountsList=result;
    })
  }

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
