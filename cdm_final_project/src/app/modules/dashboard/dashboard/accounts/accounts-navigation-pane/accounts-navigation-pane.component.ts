import { Component } from '@angular/core';

@Component({
  selector: 'app-accounts-navigation-pane',
  templateUrl: './accounts-navigation-pane.component.html',
  styleUrls: ['./accounts-navigation-pane.component.css']
})
export class AccountsNavigationPaneComponent {
  animateIcon(icon:HTMLElement,classToBeAdded:string){
    icon.classList.add(classToBeAdded);
    icon.style.color="#2a2185";
  }
  removeAnimation(icon:HTMLElement,classToBeRemoved:string){
    icon.classList.remove(classToBeRemoved);
    icon.style.color="white";
  }
}
