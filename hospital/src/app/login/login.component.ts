import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ViewChild('frm') loginForm: NgForm;
  arr: any[]=[];
  constructor(private authService: AuthService,
              private router: Router,
              private cookieService: CookieService ) { }

  ngOnInit() {
    // console.log('op'+this.cookieService.get('doctor_uid'));
    //to check doctor is already logged in or not
    this.authService.checkLogin().subscribe((msg: String) => {
      if (msg !== 'false') {
      this.authService.loggedIn = true;
      // this.cookieService.delete('doctor_uid');
      this.router.navigate(['/doctor']);
      }
    });
    // console.log('op'+this.cookieService.get('doctor_uid'));

  }

  submit(form: NgForm){
    const uid = JSON.stringify(form.value.uid);
    this.authService.login(uid).subscribe((msg: String) => {
      console.log(msg);
        if(msg ==="true"){
          this.authService.loggedIn = true;
          this.cookieService.set('doctor_uid', uid);
          this.router.navigate(['/doctor']);
        }
        else
          this.router.navigate(['/']);
    });
    console.log('op' + this.cookieService.get('doctor_uid'));


  }
}
