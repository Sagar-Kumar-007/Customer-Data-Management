import { Component } from '@angular/core';
import { Ilogs } from 'src/app/datatypes/logs';
import { LogsService } from 'src/app/services/logs.service';


@Component({
  selector: 'app-logs-dashborad',
  templateUrl: './logs-dashborad.component.html',
  styleUrls: ['./logs-dashborad.component.css'],
})
export class LogsDashboradComponent {

  logsList: Ilogs[] | undefined;
  constructor(private _logsService: LogsService){}

  ngOnInit(): void {
    this.showLogsList();
  }

  showLogsList() {
    this._logsService
      ?.getAllLogs()
      .subscribe((result: Ilogs[] | undefined) => {
        this.logsList = result;
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
  searchVal(data: HTMLInputElement) {
    // console.log(data.value);

    if (!data.value) {
      this.showLogsList();
    }
    if (data.value)
      this._logsService.searchLogs(data.value).subscribe((result) => {
        if (result) this.logsList = result;
      });
    // if(!data.value)console.log(this.customersList);
  }
  
}
