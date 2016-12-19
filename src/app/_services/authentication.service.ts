import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseAuth } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {

  private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();

  constructor( 
    private af: AngularFire,
    private router: Router,
    private auth: FirebaseAuth
  ) { }

  login(email: String, password: String) {
    var creds: any = {email: email, password: password};
    var res: Promise<any> = new Promise((resolve, reject) => {
      this.auth.login(creds).then(result => {
        localStorage.setItem('currentUser', result.uid);
        resolve(result);
      }).catch(err => {
        reject(err);
      })
     });
    return(res);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.af.auth.logout();
    this.router.navigate(["/login"]);
  }

  loggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  showNavBar(ifShow: boolean) {
      this._showNavBar.next(ifShow);
  }

}
