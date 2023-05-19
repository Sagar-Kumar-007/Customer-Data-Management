import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  user:{unique_name:string;role:string;nbf:number;iat:number;exp:number;email:string} | undefined;
  
}
