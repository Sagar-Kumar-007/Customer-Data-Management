import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNavigationPaneComponent } from './customer-navigation-pane.component';

describe('CustomerNavigationPaneComponent', () => {
  let component: CustomerNavigationPaneComponent;
  let fixture: ComponentFixture<CustomerNavigationPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerNavigationPaneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerNavigationPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
