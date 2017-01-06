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
  private uid: String = null;
  user: FirebaseObjectObservable<any>;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
    ) { 
        this.loadAccount();
    }

  ngOnInit() {
    this.loadAccount();  
  }

  submit() {
      console.log(this.model.firstName);
      this.user.update({'firstName':this.model.firstName});
      this.user.update({'lastName':this.model.lastName});
  }

  loadAccount() {
    this.authenticationService.getKey().then((res) => {
        this.user = this.userService.getUser(res);
        console.log(this.user);
        this.uid = res;
    });
  }

}