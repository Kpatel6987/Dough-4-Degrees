import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ItemsService } from '../_services/items.service';
import { AlertService } from '../_services/alert.service';
import { AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.css']
})
export class MyItemsComponent implements OnInit {

  @ViewChild('fileInput')
  fileInputVar: any;

  private items: FirebaseListObservable<any>;
  private uploadFile;
  private uid: String = null;
  constructor(
    private authenticationService: AuthenticationService,
    private itemsService: ItemsService,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    this.loadFiles();  
  }

  loadFiles() {
    this.authenticationService.getKey().then((res) => {
      this.uid = res;
      this.items = this.itemsService.getFiles(res);
    });
  }

  submit() {
    var file = this.fileInputVar.nativeElement.files[0];
    if (file == null) {
      this.alertService.error("Please choose a file", false);
    } else {
      this.itemsService.addFile(this.uid, file);
      this.alertService.success(file.name + " added", false);
      this.fileInputVar.nativeElement.value = "";
    }
  }

  removeItem(item) {
    var path = this.uid + "/" + item.$key;
    this.itemsService.removeItem(path, item, this.uid);
    this.alertService.error(item.fileName + " removed", false);
  }

}
