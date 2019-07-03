import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-search-record',
  templateUrl: './search-record.component.html',
  styleUrls: ['./search-record.component.css']
})
export class SearchRecordComponent implements OnInit {
  record: any;
  doctor: any;
  isActive = false;
  constructor(private patientService: PatientService,private doctorService: DoctorService) { }

  ngOnInit() {
      this.patientService.patientData.forEach( data => {
              if(this.patientService.keyword === data.disease){
                data.image = data.image.replace(/\n/g,'<br>') ;
                this.record = data;
                
              }
      });
  }
  showProfile(data){
        this.isActive = true;
        this.doctorService.seeProfile(this.record.doctor_uid).subscribe( profile =>{
            this.doctor = profile;
        })
  }
}
