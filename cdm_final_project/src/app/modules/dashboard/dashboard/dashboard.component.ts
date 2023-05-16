import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  
  view:string="history";
  item:boolean | undefined;
  passedValue(item:boolean){
    this.item=item;
  }
}



