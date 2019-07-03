import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientLogoutComponent } from './patient-logout.component';

describe('PatientLogoutComponent', () => {
  let component: PatientLogoutComponent;
  let fixture: ComponentFixture<PatientLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
