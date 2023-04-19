import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import {NgConfirmService} from 'ng-confirm-box'
import { NgToastService } from 'ng-angular-popup';
import {Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog'
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { ICustomer } from 'src/app/datatypes/customer';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  customersList:ICustomer[]|undefined;
  
  constructor(private dialog: MatDialog, private customer: CustomerService, private router: Router, private confirm:NgConfirmService, private toastService: NgToastService,){}
  ngOnInit(): void {
    this.showCustomerList();
  }

  showCustomerList(){
    this.customer?.getAllCustomers().subscribe((result:ICustomer[] | undefined)=>{
      this.customersList=result;
    })
  }

  
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

  //Edit a customer..
  updateCustomer(email?:string |null){
    let dialogRef=this.dialog.open(CreateCustomerComponent,{
      
      data: {
        status: 'updateCustomer',
        customerId: email,
      },
      maxHeight: 'calc(100vh - 120px)',
      backdropClass: "backgroundblur",
     
    });
    dialogRef.afterClosed().subscribe((result)=>{
      this.showCustomerList();
    })

  }


  // Delete a Customer

  deleteCustomer(id?:string | null){
      
      if(id)this.customer.deleteCustomer(id).subscribe(res=>{
        console.log("res: "+ res);
        if(res)this.toastService.success({detail:'SUCCESS', summary: 'Deleted Successfully', duration: 3000});
        this.showCustomerList();
      })
      
    
  }
}
