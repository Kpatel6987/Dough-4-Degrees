import { Component } from '@angular/core';
import { ContactsService } from '../_services/contacts.service';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent  {

  contacts: FirebaseListObservable<any>;
  constructor(
    private contactsService: ContactsService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.authenticationService.getKey().then((res) => {
      this.uid = res;
      this.contacts = this.contactsService.getContacts(res);
    });
  }

  model: any = { };

  private addNew: boolean = false;
  private uid: String = null;

  displayForm() {
    this.addNew = true;
  }

  hideForm() {
    this.addNew = false;
  }

  onSubmit() {
    // this.authenticationService.getKey().then((res) => {
    //   this.contactsService.addContact(res, this.model.firstName, this.model.lastName, this.model.email, this.model.number, this.model.relationship);
    //   this.alertService.success('Contact Added', true);
    //   this.model = {};
    //   this.addNew = false;
    //     }).catch((err) => {
    //         this.alertService.error(err);
    //     });
    this.contactsService.addContact(this.uid, this.model.firstName, this.model.lastName, this.model.email, this.model.number, this.model.relationship);
    this.alertService.success('Contact Added', true);
    this.model = {};
    this.addNew = false;
  }

}
