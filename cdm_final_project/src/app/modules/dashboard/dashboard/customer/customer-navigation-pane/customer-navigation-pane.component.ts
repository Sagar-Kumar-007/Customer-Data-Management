import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { Router } from '@angular/router';
import { ICustomer } from 'src/app/datatypes/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customer-navigation-pane',
  templateUrl: './customer-navigation-pane.component.html',
  styleUrls: ['./customer-navigation-pane.component.css'],
})
export class CustomerNavigationPaneComponent {
  viewStatus: boolean = false;
  customersList:ICustomer[]|undefined;
  constructor(private dialog: MatDialog, private auth:AuthService) {}

  //Toggle
  onToggleClick() {
    console.log('Yes');
    let navigation = document.querySelector('.navigation') as HTMLDivElement;
    let main = document.querySelector('.main') as HTMLDivElement;
    let toggle = document.querySelector('.fa-bars') as HTMLIFrameElement;
    navigation.classList.toggle('active');
    main.classList.toggle('active');
    toggle.classList.add('fa-flip');
    setTimeout(() => {
      toggle.classList.remove('fa-flip');
    }, 500);
  }

  animateIcon(icon: HTMLElement, classToBeAdded: string) {
    icon.classList.add(classToBeAdded);
    icon.style.color = '#003b69';
  }
  removeAnimation(icon: HTMLElement, classToBeRemoved: string) {
    icon.classList.remove(classToBeRemoved);
    icon.style.color = 'white';
  }

  addCustomer() {
    let dialogRef=this.dialog.open(CreateCustomerComponent, {
      maxHeight: 'calc(100vh - 60px)',
      width: '70%',
      backdropClass: 'backgroundblur',
    });
    dialogRef.afterClosed().subscribe((result)=>{
      window.location.reload();
    })
  }
  updateView() {
    console.log(true);
    this.viewStatus = true;
  }

  signout(){
   this.auth.signOut();
  }
}
