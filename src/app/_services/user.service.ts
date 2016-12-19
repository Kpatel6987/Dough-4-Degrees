import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class UserService {

  constructor(
    private af: AngularFire,
    private router: Router,
    private auth: FirebaseAuth
  ) { }

  register(firstName: String, lastName: String, email: String, password: String) {
    var creds: any = {email: email, password: password};
    var res: Promise<any> = new Promise((resolve, reject) => {
      this.auth.createUser(creds).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err);
      })
    });
    return res;
  }

}
