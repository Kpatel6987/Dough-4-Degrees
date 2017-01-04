import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseAuth, FirebaseAuthState } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable()
export class AuthenticationService {

  private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();

  private authState;
  private uid;

  constructor( 
    private af: AngularFire,
    private router: Router,
    private auth: FirebaseAuth
  ) { 
      auth.subscribe((state: FirebaseAuthState) => {
          this.authState = state;
      }); 
  }

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
    this.router.navigate(["/login"]);
    this.af.auth.logout();
  }

  loggedIn() {
    return this.authState !== null;
  }

  showNavBar(ifShow: boolean) {
      this._showNavBar.next(ifShow);
  }

  getKey() {
    var res: Promise<any> = new Promise((resolve, reject) => {
      this.auth.subscribe((state: FirebaseAuthState) => {
        if (state !== null) {
          resolve(state.uid);
        }
      })
    });
    return(res);
  }

}
