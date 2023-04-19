import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IAccount } from 'src/app/datatypes/account';
import { AccountsService } from 'src/app/services/accounts.service';
import {MatDialog} from '@angular/material/dialog';
import { AddAccountFormComponent } from '../add-account-form/add-account-form.component';
import { ActivatedRoute } from '@angular/router';
import { ICustomer } from 'src/app/datatypes/customer';

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html',
  styleUrls: ['./accounts-dashboard.component.css']
})
export class AccountsDashboardComponent implements OnInit {

  customerId:string='1';
  accountsList:IAccount[]|undefined;
  @Output() newEventEmitter=new EventEmitter<boolean>();
  constructor(private _accountsService:AccountsService,private dialog:MatDialog,private _route:ActivatedRoute){  }
  showAccountsList(){
    this._accountsService.accountsList(this.customerId).subscribe((result:ICustomer)=>{
        if(result.accounts){
            this.accountsList=result.accounts;
            console.log(this.accountsList);
          }
        })
  }
  ngOnInit(){
    this._route.paramMap.subscribe(params => {
      let id = params.get('customerEmail');
      if(id)this.customerId=(id);
    });
    console.log("Account Customer Email: "+this.customerId);
    let main = document.querySelector(".main") as HTMLDivElement;
    this.checkViewportSize(main.classList.contains("active"));
    this.showAccountsList();
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
    let dialogRef=this.dialog.open(AddAccountFormComponent,{
      maxHeight: 'calc(100vh - 120px)',
      backdropClass: "backgroundblur",
      data:{
        status:'updateAccount',
        account:account,
        email:this.customerId
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.showAccountsList();
    })
  }

  deleteAccount(account:IAccount){
    this._accountsService.deleteAccount(account,account.location?.toString()).subscribe(result=>{
      if(result){
        console.log("Account Deleted");
      }
      this.showAccountsList();
    })
  }
}
