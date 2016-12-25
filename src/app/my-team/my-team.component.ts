import { Component } from '@angular/core';
import { ContactsService } from '../_services/contacts.service';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';
import { AngularFire, FirebaseListObservable} from 'angularfire2';

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
    private alertService: AlertService,
    private af: AngularFire
  ) { }

  model: any = { };

  private addNew: boolean = false;
  private uid: String = null;
  private data: FirebaseListObservable<any[]>;
  private hey: String = "yo";

  ngOnInit() {
    this.loadTeam();
  }

  displayForm() {
    this.addNew = true;
  }

  hideForm() {
    this.addNew = false;
  }

  onSubmit() {
    this.contactsService.addContact(this.uid, this.model.firstName, this.model.lastName, this.model.email, this.model.number, this.model.relationship);
    this.alertService.success('Contact Added', true);
    this.model = {};
    this.addNew = false;
  }

  loadTeam() {
    this.authenticationService.getKey().then((res) => {
      console.log(res);
      this.data = this.af.database.list('contacts/'+ res + '/');

      console.log(this.data);
    }).catch((err) => {
      this.alertService.error(err);
    });
  }
}
