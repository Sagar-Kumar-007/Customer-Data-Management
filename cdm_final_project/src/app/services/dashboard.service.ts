import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from './customer.service';
import { ICustomer } from '../datatypes/customer';
import {Observable,Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dashboard:string='';
  private subject=new Subject<any>();

  sendSearchEvent(data:HTMLInputElement){
    this.subject.next(data);
  }

  getSearchEvent():Observable<any>{
    return this.subject.asObservable();
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
