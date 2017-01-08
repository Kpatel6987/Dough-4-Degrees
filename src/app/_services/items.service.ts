import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class ItemsService {

  private storageRef;
  private storage;

  constructor(
    @Inject(FirebaseApp) fireBaseApp: firebase.app.App,
    private af: AngularFire
  ) { 
    this.storageRef = fireBaseApp.storage().ref();
  }

  addFile(uid: String, file) {
    var path = 'items/' + uid + "/" + file.name;
    this.storageRef = this.storageRef.child(path);
    this.storageRef.put(file);
    this.storageRef.getDownloadURL().then(url =>
      this.addFileToDatabase(uid, file.name, url)
    );
  }

  addFileToDatabase(uid, fileName, url) {
    const items = this.af.database.list('items/' + uid);
    items.push({'fileName': fileName, 'url': url});
  }

  getFiles(uid) {
    return this.af.database.list('items/' + uid);
  }

  removeItem(path) {
    path = "/items/" + path;
    var item = this.af.database.object(path);
    item.remove();
  }

}
