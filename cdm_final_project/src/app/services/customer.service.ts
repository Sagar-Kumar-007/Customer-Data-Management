import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }

  /********************  Add a Customer********************/
  addCustomer(data:any){
    return this.http.post("path", data);
  }


}
