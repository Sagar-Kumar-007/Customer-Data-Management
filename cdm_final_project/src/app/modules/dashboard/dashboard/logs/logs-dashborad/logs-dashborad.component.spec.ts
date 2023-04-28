import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsDashboradComponent } from './logs-dashborad.component';

describe('LogsDashboradComponent', () => {
  let component: LogsDashboradComponent;
  let fixture: ComponentFixture<LogsDashboradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsDashboradComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsDashboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
