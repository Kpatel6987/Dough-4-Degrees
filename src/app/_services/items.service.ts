import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class ContactsService {

  items: FirebaseListObservable<any>;
  constructor(
    private af: AngularFire,
    private auth: FirebaseAuth
  ) { }

  addFile(uid: String) {}

  getFiles(uid: String) {}

}
