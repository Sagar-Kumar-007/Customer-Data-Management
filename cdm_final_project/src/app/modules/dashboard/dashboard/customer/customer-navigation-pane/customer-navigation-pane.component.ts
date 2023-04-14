import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { CreateCustomerComponent } from '../create-customer/create-customer.component';

@Component({
  selector: 'app-customer-navigation-pane',
  templateUrl: './customer-navigation-pane.component.html',
  styleUrls: ['./customer-navigation-pane.component.css']
})
export class CustomerNavigationPaneComponent {

  constructor(private dialog: MatDialog){}

  //Toggle
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

  
  animateIcon(icon:HTMLElement,classToBeAdded:string){
    icon.classList.add(classToBeAdded);
    icon.style.color="#2a2185";
  }
  removeAnimation(icon:HTMLElement,classToBeRemoved:string){
    icon.classList.remove(classToBeRemoved);
    icon.style.color="white";
  }

  

  addCustomer(){
    console.log("add customer");
    this.dialog.open(CreateCustomerComponent,{
      
      maxHeight: 'calc(100vh - 120px)',
      backdropClass: "backgroundblur",
     
    });
  }

}
