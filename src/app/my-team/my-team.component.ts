import { Component } from '@angular/core';
import { ContactsService } from '../_services/contacts.service';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent  {

  constructor(
    private contactsService: ContactsService,
    private authenticationService: AuthenticationService
  ) { }
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
    this.authenticationService.getKey().then((res) => {
      this.contactsService.addContact(res, this.model.firstName, this.model.lastName, this.model.email, this.model.number, this.model.relationship);
        }).catch((err) => {
            console.log(err);
        });
  }

}
