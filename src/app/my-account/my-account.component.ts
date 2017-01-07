import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';
import { AngularFire, FirebaseObjectObservable} from 'angularfire2';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html'
})

export class MyAccountComponent implements OnInit {

  model: any = {};
  user: FirebaseObjectObservable<any>;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
    ) { 
        this.loadAccount();
    }

  ngOnInit() {
    this.loadAccount();
  }

  submit() {
      this.user.update({'firstName':this.model.firstName});
      this.user.update({'lastName':this.model.lastName});
      this.alertService.success("Profile updated", false);
  }

  loadAccount() {
    this.authenticationService.getKey().then((res) => {
        this.user = this.userService.getUser(res);
    });
  }

}