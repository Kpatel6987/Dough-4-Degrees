import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class ContactsService {

  constructor( private af: AngularFire ) { }

  addContact(uid: String, firstName: String, lastName: String, email: String, number: String, relationship: String) {
    const contacts = this.af.database.list('contacts/' + uid);
    contacts.push({'firstName': firstName, 'lastName': lastName, 'email': email, 'number': number, 'relationship': relationship});
  }

  getContacts(uid: String) {
    return this.af.database.list('contacts/' + uid);
  }

  removeContact(path) {
    path = "/contacts/" + path;
    var contact = this.af.database.object(path);
    contact.remove();
  }

}
