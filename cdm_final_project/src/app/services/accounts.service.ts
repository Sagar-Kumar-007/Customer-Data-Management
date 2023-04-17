import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomer } from '../datatypes/customer';
import { IAccount } from '../datatypes/account';

@Injectable()
export class AccountsService {
  constructor(private _http:HttpClient){}
  accountsList(customerId:string){
    return this._http.get<IAccount[]>('http://localhost:3000/accounts/');
  }
  addAccount(customerId:string,account:IAccount){
    return this._http.post<IAccount>('http://localhost:3000/accounts/',account);
  }
  updateAccount(account:IAccount | undefined,id:string | undefined | null){
    return this._http.put<IAccount>('http://localhost:3000/accounts/'+id,account);
  }
  deleteAccount(account:IAccount | undefined,id:string | undefined | null){
    return this._http.delete<IAccount>('http://localhost:3000/accounts/'+id);
  }
}
