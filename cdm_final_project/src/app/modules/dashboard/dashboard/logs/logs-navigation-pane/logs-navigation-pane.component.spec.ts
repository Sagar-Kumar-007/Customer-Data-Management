import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsNavigationPaneComponent } from './logs-navigation-pane.component';

describe('LogsNavigationPaneComponent', () => {
  let component: LogsNavigationPaneComponent;
  let fixture: ComponentFixture<LogsNavigationPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsNavigationPaneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsNavigationPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
