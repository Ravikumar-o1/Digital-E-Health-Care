import { strictEqual } from "assert";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
@Injectable({
  providedIn: 'root'
})
export class PatientAuthService {
  loggedIn = false;
  url = 'http://localhost:8080';
  constructor(private http: HttpClient,private cookieService: CookieService){}
  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      }
    );
    return promise;
  }

  checkLogin() {
    if (this.cookieService.get('patient_uid').length !== 0) {
         return this.login(this.cookieService.get('patient_uid'));
    } else {
        return Observable.create((observer: Observer<any>) => {
            observer.next('false');
        });
      }
  }

  login(uid: string) {
    return this.http.post(`${this.url}/patient/login`,{'uid': uid});
  }

  logout() {
    this.cookieService.delete('patient_uid');
    this.loggedIn = false;
  }
}
