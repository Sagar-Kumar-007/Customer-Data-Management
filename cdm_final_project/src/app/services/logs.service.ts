import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ilogs } from '../datatypes/logs';
import { IPaginatedResults } from '../datatypes/paginatedResults';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private _http: HttpClient) { }
  private baseUrl:string='https://localhost:7196/api/Logs'
  getAllLogs(){
    return this._http.get<Ilogs[]>(`${this.baseUrl}`);
   }
   getAllLogsPaginated(StartIndex:number,PageNumber:number,PageSize:number){
    // https://localhost:7196/api/Logs$fetch?StartIndex=0&PageNumber=1&PageSize=10
    return this._http.get<IPaginatedResults<Ilogs>>(`${this.baseUrl}$fetch?StartIndex=${StartIndex}&PageNumber=${PageNumber}&PageSize=${PageSize}`);
   }

   searchLogs(data:string){
    return this._http.get<Ilogs[]>(`${this.baseUrl}$like?search=${data}`);
  }

   postLogs(Logs: Ilogs)
   {
    return this._http.post<Ilogs>(`${this.baseUrl}`, Logs);
   }


}
