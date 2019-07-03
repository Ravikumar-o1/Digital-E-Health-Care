import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { PatientAuthService } from './patient-auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientAuthGaurdService implements CanActivate, CanActivateChild {

  isLogin = false;
  constructor(private authService: PatientAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
          	this.isLogin = true;
            return true;
          } else {
            this.router.navigate(['/doctor']);
          }
        }
      );
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

}
