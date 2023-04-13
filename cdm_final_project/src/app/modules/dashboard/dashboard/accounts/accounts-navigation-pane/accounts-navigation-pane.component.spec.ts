import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsNavigationPaneComponent } from './accounts-navigation-pane.component';

describe('AccountsNavigationPaneComponent', () => {
  let component: AccountsNavigationPaneComponent;
  let fixture: ComponentFixture<AccountsNavigationPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsNavigationPaneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsNavigationPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
