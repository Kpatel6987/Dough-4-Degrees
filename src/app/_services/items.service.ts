import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class ItemsService {

  private storageRef;

  constructor(
    @Inject(FirebaseApp) fireBaseApp: firebase.app.App,
    private af: AngularFire
  ) { 
    this.storageRef = fireBaseApp.storage().ref();
  }

  addFile(uid: String, file) {
    var path = 'items/' + uid + "/" + file.name;
    var storage = this.storageRef.child(path);
    storage.put(file).then(res =>
      //this.getUrl(storage, uid, file)
      storage.getDownloadURL().then(url =>
        this.addFileToDatabase(uid, file.name, url)
      )
    );
  }

  getUrl(storageRef, uid, file) {
    this.storageRef.getDownloadURL().then(url =>
      this.addFileToDatabase(uid, file.name, url)
    );
  }

  addFiles(uid: String, file) {
    var path = 'items/' + uid + "/" + file.name;
    var storage = this.storageRef.child(path);
    storage.put(file).then(function() {
      storage.getDownloadURL().then(url =>
        this.addFileToDatabase(uid, file.name, url)
      );
    });
    
  }

  addFileToDatabase(uid, fileName, url) {
    const items = this.af.database.list('items/' + uid);
    items.push({'fileName': fileName, 'url': url});
  }

  getFiles(uid) {
    return this.af.database.list('items/' + uid);
  }

  removeItem(path, item, uid) {
    path = "/items/" + path;
    var obj = this.af.database.object(path);
    obj.remove();
    var storage = this.storageRef.child('items/' + uid + "/" + item.fileName);
    storage.delete();
  }

}
