import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ScholarshipService {

  items: FirebaseListObservable<any>;
  constructor(
    private af: AngularFire,
    private router: Router,
    private auth: FirebaseAuth,
    private authenticationService: AuthenticationService,
  ) { }

  addScholarship(uid: String, date: string, name: string, information: string) {
    //date + name so that scholarship id is unique, but easily identifiable
    //unlike push, which assigns a random id.
    console.log("hey");
    console.log(uid);
    console.log(date);
    console.log(name);
    console.log(information);
    const user = this.af.database.list('scholarships/' + uid);
    console.log('hey');
    user.update(name, {'date':date, 'name':name, 'information':information});
    console.log('hey');
    
  }

  getScholarship(uid: String) {
    return this.af.database.list('scholarships/' + uid);
  }

}