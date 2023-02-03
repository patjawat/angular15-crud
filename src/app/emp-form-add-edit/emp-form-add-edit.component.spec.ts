import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpFormAddEditComponent } from './emp-form-add-edit.component';

describe('EmpFormAddEditComponent', () => {
  let component: EmpFormAddEditComponent;
  let fixture: ComponentFixture<EmpFormAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpFormAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpFormAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
