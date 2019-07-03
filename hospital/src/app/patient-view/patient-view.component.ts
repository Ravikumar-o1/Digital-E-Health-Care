import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { PatientAuthService } from '../patient-auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent implements OnInit {

  constructor(private patientAuthService: PatientAuthService,
    private router: Router,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.patientAuthService.checkLogin().subscribe((msg: string) => {
      if (msg !== 'false') {
        // console.log("incorecy");
      this.patientAuthService.loggedIn = true;
      // this.cookieService.delete('doctor_uid');
      this.router.navigate(['/patient']);

    }
    });
  }
  submit(form: NgForm){
    const uid = JSON.stringify(form.value.uid);
    this.patientAuthService.login(uid).subscribe((msg: string) => {
      // console.log(msg);
    if(msg==="true"){
      this.patientAuthService.loggedIn = true;
      this.cookieService.set('patient_uid', uid);
      this.router.navigate(['/patient']);
    }
    else{
      this.router.navigate(['/']);
    }
    });
    // console.log('op' + this.cookieService.get('patient_uid'));

  }


}
