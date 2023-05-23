import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCustomerComponent } from '../../dashboard/dashboard/customer/create-customer/create-customer.component';
import { NavigationEnd, Router,ActivatedRoute } from '@angular/router';
import { AddAccountFormComponent } from '../../dashboard/dashboard/accounts/add-account-form/add-account-form.component';
import { ICustomer } from 'src/app/datatypes/customer';
import { AccountsService } from 'src/app/services/accounts.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  currentUrl!: string;
  customerId?:string | null;
  customer?:ICustomer;
  dashboard:string='';
  
  constructor(private dialog: MatDialog,
     private router: Router,
     private route: ActivatedRoute,
     private _accountsService:AccountsService,
     private _customerService:CustomerService,
     private dashboardService:DashboardService,
     private auth:AuthService
     ) {}
  ngOnInit(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.dashboardService.detectDashboard(this.currentUrl);
        this.dashboard=this.dashboardService.dashboard;
        console.log("dash: "+this.dashboard);
        this.fetchAccountsWithCustomerEmail();
      }
    });
  }
  fetchAccountsWithCustomerEmail() {
    if(this.dashboard==='Accounts'){
        this.route.queryParams.subscribe(params=>{
          let id = params['customer'];
          if (id){
            this.customerId=(id);
            this.customerId && this._customerService.getCustomerDetails(this.customerId).subscribe((result:ICustomer)=>{
              if(result){
                this.customer=result;
              }
            });
          }
        });
      }
    }


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
  removeActiveClassNavigation(){
    let width = window.innerWidth;
    
    if(width<=991){
      let mainNav = document.querySelector('.main-nav') as HTMLDivElement;
      mainNav.classList.remove('active');
      let sidebar = document.querySelector('.navigation') as HTMLDivElement;
      sidebar.classList.remove('active');
      let main = document.querySelector('.main') as HTMLDivElement;
      main.classList.remove('active');
    }
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
      disableClose:true,
      maxHeight: 'calc(100vh - 60px)',
      width: '70%',
      backdropClass: 'backgroundblur',
    });
    dialogRef.afterClosed().subscribe((result)=>{
      // window.location.reload();
    })
  }
  showCustomerCard(flag:boolean){
    return flag;
  }
  validateViewportSize() {
    let width = window.innerWidth;
    let main = document.querySelector(".main") as HTMLDivElement;
    let flag;
    if(main)flag=main.classList.contains("active");
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
  addAccount(){
    let dialogRef=this.dialog.open(AddAccountFormComponent,{
      disableClose:true,
      maxHeight: 'calc(100vh - 120px)',
      backdropClass: "backgroundblur",
      data:{
        status:'addAccount',
        account:null,
        email:this.customerId,
        customerName: this.customer?.cname
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      // window.location.reload();
    })
  }
  addOperation(){
    if(this.dashboard==='Customers'){
      this.addCustomer();
    }
    else if(this.dashboard==='Accounts'){
      this.addAccount();
    }
  }
  signout(){
    this.auth.signOut();
   }

}
