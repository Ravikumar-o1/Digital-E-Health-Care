import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { PatientAuthService } from '../patient-auth.service';



@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,private patientAuthService: PatientAuthService, private router: Router) { }

  ngOnInit() {
    this.patientAuthService.logout();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
