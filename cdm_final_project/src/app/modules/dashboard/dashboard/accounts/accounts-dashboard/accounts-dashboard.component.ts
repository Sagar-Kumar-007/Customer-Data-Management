import { Component, OnInit } from '@angular/core';
import { IAccount } from 'src/app/datatypes/account';
import { AccountsService } from 'src/app/services/accounts.service';
import {MatDialog} from '@angular/material/dialog';
import { AddAccountFormComponent } from '../add-account-form/add-account-form.component';

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html',
  styleUrls: ['./accounts-dashboard.component.css']
})
export class AccountsDashboardComponent implements OnInit {

  customerId:number=1;
  accountsList:IAccount[]|undefined;
  constructor(private _accountsService:AccountsService,private dialog:MatDialog){  }

  ngOnInit(){
    this._accountsService.accountsList(this.customerId.toString()).subscribe((result:IAccount[])=>{
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

  updateAccount(account:IAccount){
    this.dialog.open(AddAccountFormComponent,{
      maxHeight: 'calc(100vh - 120px)',
      backdropClass: "backgroundblur",
      data:{
        status:'updateAccount',
        account:account,
        email:account.email
      }
    });
  }

  deleteAccount(account:IAccount){
    this._accountsService.deleteAccount(account,account.id?.toString()).subscribe(result=>{
      if(result){
        console.log("Account Deleted");
      }
    })
  }
}
