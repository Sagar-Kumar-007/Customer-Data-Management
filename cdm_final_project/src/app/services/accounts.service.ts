import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomer } from '../datatypes/customer';
import { IAccount } from '../datatypes/account';
import { IPaginatedResults } from '../datatypes/paginatedResults';

@Injectable()
export class AccountsService {
  private baseUrl:string='https://localhost:7196/api/Accounts'
  constructor(private _http:HttpClient){}
  accountsList(CustomerEmail:string,StartIndex:number,PageNumber:number,PageSize:number){
    // https://localhost:7196/api/Accounts$fetch?StartIndex=0&PageNumber=1&CustomerEmail=amazon%40amazon.com&PageSize=5
    // return this._http.get<ICustomer>(this.baseUrl+'/'+customerEmail);
    return this._http.get<IPaginatedResults<IAccount>>(`${this.baseUrl}$fetch?StartIndex=${StartIndex}&PageNumber=${PageNumber}&CustomerEmail=${CustomerEmail}&PageSize=${PageSize}`)
  }
  addAccount(account:IAccount){
    // console.log("account to be added:");
    // console.log(account);
    return this._http.post<IAccount>(this.baseUrl,account);
  }
  updateAccount(account:IAccount | undefined,id:string | undefined | null){
    // console.log("urL: "+this.baseUrl+'Accounts/'+id);
    // console.log("account: "+account);
    return this._http.put<IAccount>(this.baseUrl+'/'+id,account);
  }
  deleteAccount(account:IAccount | undefined,id:string | undefined | null){
    return this._http.delete<IAccount>(this.baseUrl+'/'+id);
  }
  searchAccounts(data:string){
    return this._http.get<IAccount[]>(`${this.baseUrl}$like?search=${data}`);
  }
}
