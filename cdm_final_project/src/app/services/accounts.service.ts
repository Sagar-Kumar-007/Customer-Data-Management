import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomer } from '../datatypes/customer';

@Injectable()
export class AccountsService {
  constructor(private _http:HttpClient){}
  accountsList(customerId:string){
    return this._http.get<ICustomer>('http://localhost:3000/customer/'+customerId);
  }
  // addAccount()
}
