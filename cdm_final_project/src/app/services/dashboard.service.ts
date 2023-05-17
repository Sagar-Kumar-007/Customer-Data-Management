import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from './customer.service';
import { ICustomer } from '../datatypes/customer';
import {Observable,Subject} from 'rxjs';
import { IAccount } from '../datatypes/account';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dashboard:string='';
  private searchSubject=new Subject<any>();
  private customerSubject=new Subject<any>();
  private accountSubject=new Subject<any>();


  sendSearchEvent(data:HTMLInputElement){
    this.searchSubject.next(data);
  }

  getSearchEvent():Observable<any>{
    return this.searchSubject.asObservable();
  }

  sendAddCustomerEvent(res:ICustomer){
    console.log('send')
    this.customerSubject.next(res);
  }
  getAddCustomerEvent(){
    console.log("subscribe");
    return this.customerSubject.asObservable();
  }

  sendAddAccountEvent(res:IAccount){
    console.log('send')
    this.accountSubject.next(res);
  }
  getAddAccountEvent(){
    console.log("subscribe");
    return this.accountSubject.asObservable();
  }

  detectDashboard(currentUrl:string) {

    if(currentUrl.includes('customerDashboard')){
        this.dashboard='Customers';
    }
    else if(currentUrl.includes('accountDashboard')){
      this.dashboard='Accounts';
    }
    else if(currentUrl.includes('logs')){
      this.dashboard='Logs';
    }
  }
}
