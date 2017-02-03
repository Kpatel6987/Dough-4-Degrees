import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';



@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private af: AngularFire
    ) { }

    canActivate() {
      return this.af.auth.map((auth) =>  {
        if (auth == null) {
          this.router.navigate(['/login']);
          return false;
        } else {
          this.authenticationService.showNavBar(true);
          return true;
        }
      }).first()
    }
}