import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { FirebaseAuth, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private auth: FirebaseAuth
    ) { }

    canActivate(): Observable<boolean> {
        return this.auth
        .take(1)
        .map((authState: FirebaseAuthState) => !!authState)
        .do(authenticated => {
            if (!authenticated) {
                this.router.navigate(['/login']);
            } else {
                this.authenticationService.showNavBar(true);
            }
        });
  }

//     canActivate() {
//         console.log(this.authenticationService.loggedIn());
//         if (this.authenticationService.loggedIn()) {
//             return true;
//         }
//         this.router.navigate(['/login']);
//         return false;
//   }
}