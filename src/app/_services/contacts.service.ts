import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
import { AuthenticationService } from './authentication.service';
=======
>>>>>>> 7044b3d14dfa75c7c6c69a5e719d7af0eade1dc6

@Injectable()
export class ContactsService {
 constructor(
    private af: AngularFire,
    private router: Router,
    private auth: FirebaseAuth
  ) { }

  addContact(uid: String, firstName: String, lastName: String, email: String, number: String, relationship: String) {
    const user = this.af.database.object('contacts/' + uid);
    user.update({'firstName': firstName});
    user.update({'lastName': lastName});
    user.update({'email': email});
    user.update({'number': number});
    user.update({'relationship': relationship});
  }

}