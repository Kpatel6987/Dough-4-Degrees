import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { AngularFire } from 'angularfire2';
import { UserService } from '../_services/user.service';

@Component({
    templateUrl: 'app/reset/reset.component.html'
})

export class ResetComponent implements OnInit {
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

    }

    reset() {
        this.loading = true;
        console.log(this.model.email);
        this.userService.reset(this.model.email).then((res) => {
            if (res === undefined) {
                this.router.navigate(["/login"]);
                this.alertService.success("Password reset instructions have been sent to your email.");
            }
        }).catch((err) => {
            this.alertService.error("Sorry. Incorrect email or password");
            this.loading = false;
        });
    }
}
