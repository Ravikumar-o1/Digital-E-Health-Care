import { Component, OnInit } from '@angular/core';
import { PatientAuthService } from '../../patient-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-logout',
  templateUrl: './patient-logout.component.html',
  styleUrls: ['./patient-logout.component.css']
})
export class PatientLogoutComponent implements OnInit {

  constructor(private patientAuthService: PatientAuthService, private router: Router) { }

  ngOnInit() {
    this.patientAuthService.logout();
    this.router.navigate(['/doctor']);
  }


}
