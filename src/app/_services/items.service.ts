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
    console.log(uid);
    console.log(file);
    this.storageRef = this.storageRef.child('items/uid');
    console.log(this.storageRef);
    this.storageRef.put(file);
  }

  getFiles(uid: String) {}

}
