import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private af: AngularFire,
        private alertService: AlertService,
        private userService: UserService
        ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.params['returnUrl'] || '/';
  }

  register() {
        this.loading = true;
        this.userService.register(this.model.firstName, this.model.lastName, this.model.email, this.model.password).then((res) => {
            if (res.provider === 4) {
                this.authenticationService.showNavBar(true);
                this.router.navigate(["/home"]);
            }
        }).catch((err) => {
            this.alertService.error(err);
            this.loading = false;
        });
    }
}
