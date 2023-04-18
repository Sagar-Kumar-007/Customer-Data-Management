import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IAccount } from 'src/app/datatypes/account';
import { AccountsService } from 'src/app/services/accounts.service';
import {MatDialog} from '@angular/material/dialog';
import { AddAccountFormComponent } from '../add-account-form/add-account-form.component';
import {NgConfirmService} from 'ng-confirm-box'

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html',
  styleUrls: ['./accounts-dashboard.component.css']
})
export class AccountsDashboardComponent implements OnInit {

  customerId:number=1;
  accountsList:IAccount[]|undefined;
  @Output() newEventEmitter=new EventEmitter<boolean>();
  constructor(private confirm:NgConfirmService, private _accountsService:AccountsService,private dialog:MatDialog){  }

  ngOnInit(){
    let main = document.querySelector(".main") as HTMLDivElement;
    this.checkViewportSize(main.classList.contains("active"));
    this._accountsService.accountsList(this.customerId.toString()).subscribe((result:IAccount[])=>{
      this.accountsList=result;
    })
  }

  showCustomerCard(flag:boolean){
    this.newEventEmitter.emit(flag);
  }

  checkViewportSize(flag:boolean) {
    let width = window.innerWidth;
  
    if (width >=991) {
      if(flag){
        this.showCustomerCard(true);
      }
      else{
        this.showCustomerCard(false);
      }
    }
    else {
      if(flag){
        this.showCustomerCard(false);
      }
      else{
        this.showCustomerCard(true);
      }
    }
  }

  onToggleClick(){
    let navigation = document.querySelector(".navigation") as HTMLDivElement;
    let main = document.querySelector(".main") as HTMLDivElement;
    let toggle=document.querySelector(".fa-bars") as HTMLIFrameElement;
    navigation.classList.toggle("active");
    main.classList.toggle("active");
    this.checkViewportSize(main.classList.contains("active"));
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

  deleteAccount(account:IAccount, aname?:string |null){
    this.confirm.showConfirm(`Are you sure want to delete ${aname}?`, async ()=>{
      this._accountsService.deleteAccount(account,account.id?.toString()).subscribe(result=>{
        if(result){
          console.log("Account Deleted");
        }
      })
      await new Promise(f=>{
        setTimeout(f, 1000)
      });
      window.location.reload();
    }, ()=>{

    })
  }
}
