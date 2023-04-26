import { Component,Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddAccountFormComponent } from '../add-account-form/add-account-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from 'src/app/datatypes/customer';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-accounts-navigation-pane',
  templateUrl: './accounts-navigation-pane.component.html',
  styleUrls: ['./accounts-navigation-pane.component.css']
})
export class AccountsNavigationPaneComponent {
  customerId?:string | null;
  customer?:ICustomer;
  ngOnInit(){
    this._route.paramMap.subscribe(params => {
      let id = params.get('customerEmail');
      if(id)this.customerId=(id);
    });
    this.customerId && this._accountsService.accountsList(this.customerId).subscribe((result:ICustomer)=>{
      if(result.accounts){
        this.customer=result;
      }
    })
  }
  constructor(private dialog:MatDialog,private _route:ActivatedRoute,private _accountsService:AccountsService,private _router:Router){}
  animateIcon(icon:HTMLElement,classToBeAdded:string){
    icon.classList.add(classToBeAdded);
    icon.style.color="#2a2185";
  }
  removeAnimation(icon:HTMLElement,classToBeRemoved:string){
    icon.classList.remove(classToBeRemoved);
    icon.style.color="white";
  }
  addAccount(){
    let dialogRef=this.dialog.open(AddAccountFormComponent,{
      maxHeight: 'calc(100vh - 120px)',
      backdropClass: "backgroundblur",
      data:{
        status:'addAccount',
        account:null,
        email:this.customerId
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      window.location.reload();
    })
  }

  showCustomerCard(flag:boolean){
    return flag;
  }

  validateViewportSize() {
    let width = window.innerWidth;
    let main = document.querySelector(".main") as HTMLDivElement;
    let flag=main.classList.contains("active");
    let res:boolean=false;
    if (width >=991) {
      if(flag){
        res=this.showCustomerCard(true);
      }
      else{
        res=this.showCustomerCard(false);
      }
    }
    else {
      if(flag){
        res=this.showCustomerCard(false);
      }
      else{
        res=this.showCustomerCard(true);
      }
    }
    return res;
  }


}
