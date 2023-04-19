import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomer } from '../datatypes/customer';

@Injectable()
export class CustomerService {

  constructor(private _http: HttpClient) { }
  private baseUrl:string='https://localhost:7196/api/Customers'

   /********************  Get all Customers********************/

   getAllCustomers(){
    return this._http.get<ICustomer[]>(`${this.baseUrl}`);
   }

   /********************  Get a Customer by Id ********************/

   getCustomer(customerId: string){
    return this._http.get<ICustomer>(`${this.baseUrl}/${customerId}`);
   }

  /********************  Add a Customer********************/
  addCustomer(customer:ICustomer){
    return this._http.post<ICustomer>(`${this.baseUrl}`, customer);
  }

  /********************  Update a Customer********************/
  updateCustomer(customer: ICustomer, customerId: string)
  {
    return this._http.put<ICustomer>(`${this.baseUrl}/${customerId}`, customer);
  }

  /********************  Delete a Customer********************/

  deleteCustomer(customerId: string)
  {
    return this._http.delete<ICustomer>(`${this.baseUrl}/${customerId}`);
  }
}
