import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { DoctorService } from '../../services/doctor.service';
import { from } from 'rxjs';
// import { Profile } from '../../Model/profile.model';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  doctor: any;
  constructor(private authService: AuthService, private doctorService: DoctorService) { }

  ngOnInit() {
      if(this.authService.loggedIn){
        this.doctorService.getProfile().subscribe((doctor: any)=>{
            this.doctor = doctor ;
            // console.log(this.doctor.name);
            // console.log(this.doctor.age);
        });
      }
  }

}
