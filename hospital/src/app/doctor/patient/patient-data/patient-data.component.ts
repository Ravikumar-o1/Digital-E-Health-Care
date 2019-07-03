import { Component, OnInit } from '@angular/core';

import { PatientService } from '../../../services/patient.service';
import { PatientAuthService } from 'src/app/patient-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.css']
})
export class PatientDataComponent implements OnInit {

  search: String= "";
  constructor(private patientService: PatientService,
              private patientAuthService: PatientAuthService,
              private router: Router) { }

  ngOnInit() {
    if(this.patientAuthService.loggedIn){
      this.patientService.getData().subscribe((patientData: any)=>{
          this.patientService.patientData = patientData;
          this.patientService.dataSearch = patientData;
          console.log(patientData);
      });
    }
  }

  showData(patient: any){
    this.patientService.keyword = patient.disease;
    this.router.navigate(['/patient/search']);
  }

  realtimeSearch(){
    this.patientService.patientData = [];
    this.patientService.dataSearch.forEach((pd) => {
      var ptrn = this.search;
      if(pd.disease === ptrn){
        this.patientService.patientData.push(pd);
      }
      });
  }

}
