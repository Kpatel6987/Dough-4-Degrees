import { Component } from '@angular/core';
import { ContactsService } from '../_services/contacts.service'


@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent  {

  constructor(
    private contactsService: ContactsService
  ) { }
  model: any = { };

  public addNew: boolean = false;

  displayForm() {
    this.addNew = true;
  }

  hideForm() {
    this.addNew = false;
  }

  onSubmit() {
    this.contactsService.addContact(this.model.firstName, this.model.lastName, this.model.email, this.model.number, this.model.relationship);
  }

}
