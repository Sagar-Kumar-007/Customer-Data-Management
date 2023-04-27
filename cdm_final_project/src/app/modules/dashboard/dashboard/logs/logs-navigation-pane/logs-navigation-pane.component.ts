import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-logs-navigation-pane',
  templateUrl: './logs-navigation-pane.component.html',
  styleUrls: ['./logs-navigation-pane.component.css']
})
export class LogsNavigationPaneComponent {

  

  //Toggle
  onToggleClick() {
    console.log('Yes');
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

  animateIcon(icon: HTMLElement, classToBeAdded: string) {
    icon.classList.add(classToBeAdded);
    icon.style.color = '#003b69';
  }
  removeAnimation(icon: HTMLElement, classToBeRemoved: string) {
    icon.classList.remove(classToBeRemoved);
    icon.style.color = 'white';
  }

  
}
