import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ContactsService {

  items: FirebaseListObservable<any>;
  constructor(
    private af: AngularFire,
    private router: Router,
    private auth: FirebaseAuth,
    private authenticationService: AuthenticationService,
  ) { }

  addContact(uid: String, firstName: String, lastName: String, email: String, number: String, relationship: String) {
    const user = this.af.database.list('contacts/' + uid);
    user.push({'firstName': firstName, 'lastName': lastName, 'email': email, 'number': number, 'relationship': relationship});
  }

  getContacts(uid: String) {
    return this.af.database.list('contacts/' + uid);
  }

}
