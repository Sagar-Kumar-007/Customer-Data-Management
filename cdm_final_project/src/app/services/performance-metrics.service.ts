import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerformanceMetricsService {

  constructor(private _http:HttpClient) { }
  private url="http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=5";
  fetchData(){
    return this._http.get(this.url);
  }
}
