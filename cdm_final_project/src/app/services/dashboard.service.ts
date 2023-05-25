import { Injectable } from '@angular/core';
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
  private getCustomerDetailsSubject=new Subject<any>();


  sendSearchEvent(data:HTMLInputElement){
    this.searchSubject.next(data);
  }

  getSearchEvent():Observable<any>{
    return this.searchSubject.asObservable();
  }

  sendAddCustomerEvent(res:ICustomer){
    this.customerSubject.next(res);
  }

  getAddCustomerEvent(){
    return this.customerSubject.asObservable();
  }

  sendAddAccountEvent(res:IAccount){
    this.accountSubject.next(res);
  }
  getAddAccountEvent(){
    return this.accountSubject.asObservable();
  }

  sendGetCustomerDetailsEvent(){
    return this.getCustomerDetailsSubject.next('');
  }
  getGetCustomerDetailsEvent(){
    return this.getCustomerDetailsSubject.asObservable();
  }

  detectDashboard(currentUrl:string) {

    if(currentUrl==='/customerDashboard'){
        this.dashboard='Customers';
    }
    else if(currentUrl.includes('accountDashboard')){
      let temp=[currentUrl.split('?'),currentUrl.split('?')[1].split('=')];
      
      if(temp[0][0]==='/accountDashboard' && temp[1][0]==='customer' && temp[1][1].length>0){
        this.dashboard='Accounts';        
      }
      else{
        this.dashboard='fourOFour';
      }
    }
    else if(currentUrl==='/logs'){
      this.dashboard='Logs';
    }
    else if(currentUrl==='/login'){
      this.dashboard='Login';
    }
    else{
      this.dashboard='fourOFour';
    }
  }
}
