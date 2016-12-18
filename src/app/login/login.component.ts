import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//import { AlertService, AuthenticationService } from '../_services/index';
import { AuthenticationService } from '../_services/authentication.service';
import { AngularFire } from 'angularfire2';

@Component({
    templateUrl: 'app/login/login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        public af: AngularFire,

        //private alertService: AlertService
        ) { }

    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.params['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password).then((res) => {
            console.log(res);
            if (res.provider === 4) {
                this.authenticationService.showNavBar(true);
                this.router.navigate(["/home"]);
            } else {
                //alert("error");
                this.loading = false;
            }
        }).catch((err) => {
            alert("error");
            this.loading = false;
        });
    }
}
