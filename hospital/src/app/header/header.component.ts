import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

import { from } from 'rxjs';
import { PatientAuthService } from '../patient-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private patientAuthService: PatientAuthService) { }

  ngOnInit() {
      }

}
