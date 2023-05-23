import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAccount } from '../datatypes/account';
import { IPaginatedResults } from '../datatypes/paginatedResults';

@Injectable()
export class AccountsService {
  private baseUrl:string='https://datatrackrapi.azurewebsites.net/api/Accounts'
  constructor(private _http:HttpClient){}
  accountsList(CustomerEmail:string,StartIndex:number,PageNumber:number,PageSize:number){
    return this._http.get<IPaginatedResults<IAccount>>(`${this.baseUrl}$fetch?StartIndex=${StartIndex}&PageNumber=${PageNumber}&CustomerEmail=${CustomerEmail}&PageSize=${PageSize}`)
  }
  addAccount(account:IAccount){
    return this._http.post<IAccount>(this.baseUrl,account);
  }
  updateAccount(account:IAccount | undefined,id:string | undefined | null){
    return this._http.put<IAccount>(this.baseUrl+'/'+id,account);
  }
  deleteAccount(account:IAccount | undefined,id:string | undefined | null){
    return this._http.delete<IAccount>(this.baseUrl+'/'+id);
  }
  searchAccounts(data:string,customerEmail:string){
    return this._http.get<IAccount[]>(`${this.baseUrl}$like?search=${data}&CustomerEmail=${customerEmail}`);
  }
}
