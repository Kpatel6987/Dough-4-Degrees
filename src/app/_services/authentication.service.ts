import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable()
export class AuthenticationService {

  private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();

  constructor( 
    public af: AngularFire,
    private router: Router
  ) { }

  login() {
    this.af.auth.login({email: 'user@email.com', password: 'password'});
    console.log("here");
    localStorage.setItem('currentUser', 'temp');
    this.router.navigate(["/home"]);
  }

  logout() {
    this.af.auth.logout();
    localStorage.removeItem('currentUser');
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
