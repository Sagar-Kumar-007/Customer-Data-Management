import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountsService {
  constructor(private _http:HttpClient){}
  accountsList(customerId:string){
    return this._http.get('http://localhost:3000/customer/'+customerId);
  }
}
