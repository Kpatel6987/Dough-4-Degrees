import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ContactsService {
 constructor(
    private af: AngularFire,
    private router: Router,
    private auth: FirebaseAuth
  ) { }

  addContact(uid: String, firstName: String, lastName: String, email: String, number: String, relationship: String) {
    const user = this.af.database.list('contacts/' + uid);
    user.push({'firstName': firstName, 'lastName': lastName, 'email': email, 'number': number, 'relationship': relationship});
  }

}