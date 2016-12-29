import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class ContactsService {

  constructor( private af: AngularFire ) { }

  addContact(uid: String, firstName: String, lastName: String, email: String, number: String, relationship: String) {
    const user = this.af.database.list('contacts/' + uid);
    user.push({'firstName': firstName, 'lastName': lastName, 'email': email, 'number': number, 'relationship': relationship});
  }

  getContacts(uid: String) {
    return this.af.database.list('contacts/' + uid);
  }

}
