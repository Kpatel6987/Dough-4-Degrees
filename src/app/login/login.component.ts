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
        // this.authenticationService.login(this.model.username, this.model.password)
        //     .subscribe(
        //         data => {
        //             this.authenticationService.showNavBar(true);
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
        //this.authenticationService.tempLogin(this.model.username, this.model.password);
        this.authenticationService.login();
        //this.af.auth.login({email: 'user@email.com', password: 'pass1word'});
    }
}
