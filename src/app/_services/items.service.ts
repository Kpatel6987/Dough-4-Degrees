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

  addFile(uid: String, file, label) {
    var path = 'items/' + uid + "/" + file.name;
    var storage = this.storageRef.child(path);
    storage.put(file).then(res =>
      storage.getDownloadURL().then(url =>
        this.addFileToDatabase(uid, url, file.name, label)
      )
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

  addFileToDatabase(uid, url, fileName, label) {
    const items = this.af.database.list('items/' + uid);
    items.push({'fileName': fileName, 'label': label, 'date': new Date().toString(), 'url': url});
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

  downloadFile(file) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var blob = xhr.response;
    };
    xhr.open('GET', file.url);
    xhr.send();
    }

}
