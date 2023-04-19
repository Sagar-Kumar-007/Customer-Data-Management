import { Component,Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddAccountFormComponent } from '../add-account-form/add-account-form.component';
import { ActivatedRoute } from '@angular/router';
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
  toggleActive:boolean=true;
  @Input() toggleVar:boolean | undefined;
  constructor(private dialog:MatDialog,private _route:ActivatedRoute,private _accountsService:AccountsService){}
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
}
