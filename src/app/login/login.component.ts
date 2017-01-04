import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { AngularFire } from 'angularfire2';

@Component({
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./login.component.css'],
    templateUrl: 'app/login/login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;    

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private af: AngularFire,
        private alertService: AlertService
        ) { }

    ngOnInit() {
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password).then((res) => {
            if (res.provider === 4) {
                this.router.navigate(["/home"]);
                this.authenticationService.showNavBar(true);
            }
        }).catch((err) => {
            this.alertService.error("Sorry. Incorrect email or password");
            this.loading = false;
        });
    }
}
