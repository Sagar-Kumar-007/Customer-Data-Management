import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IAccount } from 'src/app/datatypes/account';
import { AccountsService } from 'src/app/services/accounts.service';
import {MatDialog} from '@angular/material/dialog';
import { AddAccountFormComponent } from '../add-account-form/add-account-form.component';
import { ActivatedRoute } from '@angular/router';
import { ICustomer } from 'src/app/datatypes/customer';
import {NgConfirmService} from 'ng-confirm-box'

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html',
  styleUrls: ['./accounts-dashboard.component.css']
})
export class AccountsDashboardComponent implements OnInit {

  customerId:string='1';
  accountsList:IAccount[]|undefined;
  totalRevenue:number | string=0;
  totalAccounts:number=0;
  @Output() newEventEmitter=new EventEmitter<boolean>();


  constructor(private confirm:NgConfirmService, private _accountsService:AccountsService,private dialog:MatDialog,private _route:ActivatedRoute){  }
  showAccountsList(){
    this.totalRevenue=0;
    this.totalAccounts=0;
    this._accountsService.accountsList(this.customerId).subscribe((result:ICustomer)=>{
        if(result.accounts){
            this.accountsList=result.accounts;
            this.totalAccounts=this.accountsList.length;
            // console.log(this.accountsList);
            this.accountsList.forEach(element => {
              if(element.acc_revenue && (typeof this.totalRevenue=='number'))this.totalRevenue+=element.acc_revenue;
              else{
                this.totalRevenue="Err";
                return;
              }
            });
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
    this.showAccountsList();
  }
  
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

  deleteAccount(account:IAccount, aname?:string |null){
    this.confirm.showConfirm(`Are you sure want to delete ${aname}?`, async ()=>{
      this._accountsService.deleteAccount(account,account.acc_email?.toString()).subscribe(result=>{
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
