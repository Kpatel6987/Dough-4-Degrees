import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
    selector: 'navbar',
    styles: [],
    templateUrl: './navbar.component.html'
})

export class NavbarComponent {
    showNavBar: boolean = false;

     constructor( private authenticationService: AuthenticationService ) {

        this.authenticationService.showNavBarEmitter.subscribe((mode)=>{
            console.log(this.authenticationService.loggedIn());
            if (mode !== null) {
              this.showNavBar = mode;
            } else {
                if (this.authenticationService.loggedIn()) {
                    this.showNavBar = true;
                }
            }
        });

     }

    logout() {
         this.authenticationService.showNavBar(false);
         this.authenticationService.logout();
    }

}