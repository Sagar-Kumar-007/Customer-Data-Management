import { Component } from '@angular/core';
import { Ilogs } from 'src/app/datatypes/logs';

@Component({
  selector: 'app-logs-dashborad',
  templateUrl: './logs-dashborad.component.html',
  styleUrls: ['./logs-dashborad.component.css'],
})
export class LogsDashboradComponent {
  p: number = 1;
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

  // Table
  logsList: Ilogs[] = [
    {
      userId: 'utkarsh@123',
      timeStamp: '28/02/2023 2:41:15 PM',
      action: 'deleted',
      comment: 'Account has been deleted.',
    },
    {
      userId: 'arsh@123',
      timeStamp: '28/02/2023 2:30:15 PM',
      action: 'created',
      comment: 'Account has been Created.',
    },
    {
      userId: 'utkarsh@123',
      timeStamp: '28/02/2023 2:41:15 PM',
      action: 'deleted',
      comment: 'Account1 has been deleted.',
    },
    {
      userId: 'utkarsh@123',
      timeStamp: '28/02/2023 2:20:15 PM',
      action: 'deleted',
      comment: 'Account has been deleted.',
    },
    {
      userId: 'utka@123',
      timeStamp: '28/02/2023 2:10:15 PM',
      action: 'deleted',
      comment: 'Account3 has been deleted.',
    },
  ];
}
