import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ItemsService } from '../_services/items.service';
@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.css']
})
export class MyItemsComponent implements OnInit {

  private uid: String = null;
  constructor(
    private authenticationService: AuthenticationService,
    private itemsService: ItemsService
    ) { }

  ngOnInit() {
    this.getId();  
  }

  onChange(event) {
    var file = event.srcElement.files;
    var fd = new FormData(file);
    this.itemsService.addFile(this.uid, fd);
  }

  getId() {
    this.authenticationService.getKey().then((res) => {
      this.uid = res;
    });
  }

}
