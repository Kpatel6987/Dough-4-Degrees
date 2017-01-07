import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';

@Injectable()
export class ItemsService {

  private storageRef;

  constructor(@Inject(FirebaseApp) fireBaseApp: any) { 
    this.storageRef = fireBaseApp.storage().ref();
    //console.log(storageRef);
  }

  addFile(uid: String, file) {
    var path = 'items/' + uid + "/" + file.name;
    this.storageRef = this.storageRef.child(path);
    let task = this.storageRef.put(file);
  }

  getFiles(uid: String) {}

}
