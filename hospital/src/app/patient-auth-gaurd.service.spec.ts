import { TestBed } from '@angular/core/testing';

import { PatientAuthGaurdService } from './patient-auth-gaurd.service';

describe('PatientAuthGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientAuthGaurdService = TestBed.get(PatientAuthGaurdService);
    expect(service).toBeTruthy();
  });
});
