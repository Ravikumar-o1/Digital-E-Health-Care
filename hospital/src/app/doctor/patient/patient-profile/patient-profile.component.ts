import { Component, OnInit } from '@angular/core';

import { PatientService } from '../../../services/patient.service';
import { from } from 'rxjs';
import { PatientAuthService } from '../../../patient-auth.service';

import { Profile } from '../../../Model/profile.model';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})

export class PatientProfileComponent implements OnInit {
  patient: any;
  constructor(private patientService: PatientService, private patientAuthService: PatientAuthService ) { }

  ngOnInit() {
    // this.patient = this.patientService.getProfile();
    if(this.patientAuthService.loggedIn){
      this.patientService.getProfile().subscribe((patient: any)=>{
        console.log(patient)  ;
        this.patient = patient;
      });
    }
  }


}
