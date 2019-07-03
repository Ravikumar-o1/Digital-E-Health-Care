import { Injectable } from '@angular/core';
// import { Profile } from 'selenium-webdriver/firefox';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  url = 'http://localhost:8080';
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  getProfile(){
    return this.http.post(`${this.url}/doctor/profile`, {'uid':this.cookieService.get('doctor_uid') });
    // return this.profile;
  }

  //other doctors profile
  seeProfile(doctor_uid){
    return this.http.post(`${this.url}/doctor/seeprofile`, {'uid':doctor_uid });
  }
}
