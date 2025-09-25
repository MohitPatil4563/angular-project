import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoasterAddEditComponent } from './roaster-add-edit.component';

describe('RoasterAddEditComponent', () => {
  let component: RoasterAddEditComponent;
  let fixture: ComponentFixture<RoasterAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoasterAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoasterAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
