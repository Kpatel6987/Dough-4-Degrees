import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseAuth, FirebaseAuthState } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthenticationService {

  private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();

  public isLoggedIn: boolean;

  constructor( 
    private af: AngularFire,
    private router: Router,
    private auth: FirebaseAuth
  ) { }

  login(email: String, password: String) {
    var creds: any = {email: email, password: password};
    var res: Promise<any> = new Promise((resolve, reject) => {
      this.auth.login(creds).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err);
      })
     });
    return(res);
  }

  logout() {
    this.af.auth.logout();
    this.router.navigate(["/login"]);
  }

  loggedIn() {
    return this.auth
      .take(1)
      .map((authState: FirebaseAuthState) => !!authState)
      .do(authenticated => {
        if (!authenticated) this.showNavBar(false);
        else this.showNavBar(true);
      });
  }

  showNavBar(ifShow: boolean) {
      this._showNavBar.next(ifShow);
  }

}
