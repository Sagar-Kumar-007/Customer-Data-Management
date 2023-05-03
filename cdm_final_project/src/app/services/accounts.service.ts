import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomer } from '../datatypes/customer';
import { IAccount } from '../datatypes/account';

@Injectable()
export class AccountsService {
  private baseUrl:string='https://localhost:7196/api/'
  constructor(private _http:HttpClient){}
  accountsList(customerEmail:string){
    return this._http.get<ICustomer>(this.baseUrl+'Customers/'+customerEmail);
  }
  addAccount(account:IAccount){
    console.log("account to be added:");
    console.log(account);
    return this._http.post<IAccount>(this.baseUrl+'Accounts',account);
  }
  updateAccount(account:IAccount | undefined,id:string | undefined | null){
    console.log("urL: "+this.baseUrl+'Accounts/'+id);
    console.log("account: "+account);
    return this._http.put<IAccount>(this.baseUrl+'Accounts/'+id,account);
  }
  deleteAccount(account:IAccount | undefined,id:string | undefined | null){
    return this._http.delete<IAccount>(this.baseUrl+'Accounts/'+id);
  }
  searchAccounts(data:string){
    return this._http.get<IAccount[]>(`${this.baseUrl}Accounts$like?search=${data}`);
  }
}
