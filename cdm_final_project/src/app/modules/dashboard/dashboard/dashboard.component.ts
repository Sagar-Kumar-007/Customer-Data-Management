import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  view:string="";
  item:boolean | undefined;
  passedValue(item:boolean){
    this.item=item;
  }
}



