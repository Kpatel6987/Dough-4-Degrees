import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ContactsService {
 constructor(
    private af: AngularFire,
    private router: Router,
    private auth: FirebaseAuth,
    private authenticationService: AuthenticationService
  ) { }

  addContact(firstName: String, lastName: String, email: String, number: String, relationship: String) {
    const user = this.af.database.object('contacts/' + this.authenticationService.getKey());
    user.update({'firstName': firstName});
    user.update({'lastName': lastName});
    user.update({'email': email});
    user.update({'number': number});
    user.update({'relationship': relationship});
  }

}