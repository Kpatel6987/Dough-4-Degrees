import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../_services/contacts.service';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';
import { AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit  {

  
  constructor(
    private contactsService: ContactsService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private af: AngularFire
  ) { }

  model: any = { };

  emailPattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  private addNew: boolean = false;
  private uid: String;
  private data: FirebaseListObservable<any>;

  ngOnInit() {
    this.loadTeam();
  }

  displayForm() {
    if (this.addNew) {
      this.hideForm();
    } else {
      this.addNew = true;
    }
  }

  hideForm() {
    this.model = {};
    this.addNew = false;
  }

  onSubmit() {
    this.contactsService.addContact(this.uid, this.model.firstName, this.model.lastName, this.model.email, this.model.number, this.model.relationship);
    this.alertService.success('Contact Added', false);
    this.model = {};
    this.addNew = false;
  }

  removeContact(contact) {
    var path = this.uid + "/" + contact.$key;
    this.contactsService.removeContact(path);
   
  }

  loadTeam() {
    this.authenticationService.getKey().then((res) => {
      this.data = this.contactsService.getContacts(res);
      this.uid = res;
    });
  }
}
