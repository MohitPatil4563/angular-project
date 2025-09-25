import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveEmployerRequestComponent } from './leave-employer-request.component';

describe('LeaveEmployerRequestComponent', () => {
  let component: LeaveEmployerRequestComponent;
  let fixture: ComponentFixture<LeaveEmployerRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveEmployerRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveEmployerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
