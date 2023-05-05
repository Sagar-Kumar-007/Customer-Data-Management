import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ilogs } from '../datatypes/logs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private _http: HttpClient) { }
  private baseUrl:string='https://localhost:7196/api/Logs'
  getAllLogs(){
    return this._http.get<Ilogs[]>(`${this.baseUrl}`);
   }

   searchLogs(data:string){
    return this._http.get<Ilogs[]>(`${this.baseUrl}$like?search=${data}`);
  }

   postLogs(Logs: Ilogs)
   {
    return this._http.post<Ilogs>(`${this.baseUrl}`, Logs);
   }


}
