import { Component } from '@angular/core';
import { Ilogs } from 'src/app/datatypes/logs';
import { IPaginatedResults } from 'src/app/datatypes/paginatedResults';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LogsService } from 'src/app/services/logs.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-logs-dashborad',
  templateUrl: './logs-dashborad.component.html',
  styleUrls: ['./logs-dashborad.component.css'],
})
export class LogsDashboradComponent {

  p:number =1;
  itemsPerPage:number=10;
  totalItems:number=this.itemsPerPage;
  logsList: Ilogs[] | undefined;
  searchEventSubscription:Subscription | undefined;

    constructor(private _logsService: LogsService,private dashboardService:DashboardService){
      this.searchEventSubscription=dashboardService.getSearchEvent().subscribe((data:HTMLInputElement)=>{
        if(data){
          this.searchVal(data.value);
        }
      });
    }

  ngOnInit(): void {
    this.showLogsList();
  }

  showLogsList() {
    this._logsService
      ?.getAllLogsPaginated((this.p-1)*this.itemsPerPage,this.p,this.itemsPerPage)
      .subscribe((result: IPaginatedResults<Ilogs>) => {
        this.logsList = result.items;
        this.totalItems=result.totalCount;
      });
  }
  //Toggle
  onToggleClick() {
    let navigation = document.querySelector('.navigation') as HTMLDivElement;
    let main = document.querySelector('.main') as HTMLDivElement;
    let toggle = document.querySelector('.fa-bars') as HTMLIFrameElement;
    navigation.classList.toggle('active');
    main.classList.toggle('active');
    toggle.classList.add('fa-flip');
    setTimeout(() => {
      toggle.classList.remove('fa-flip');
    }, 500);
  }

  // Search bar implementation
  searchVal(data: string | undefined) {

    if (!data) {
      this.showLogsList();
    }
    if (data)
      this._logsService.searchLogs(data).subscribe((result) => {
        if (result) this.logsList = result;
      });
    // if(!data.value)console.log(this.customersList);
  }
  onPageChange(event:number){
    // console.log(event);
    this.p=event;
    this.showLogsList();
  }
  
}
