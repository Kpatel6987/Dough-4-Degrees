import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
    selector: 'navbar',
    styleUrls: ['./navbar.component.css'],
    templateUrl: './navbar.component.html'
})

export class NavbarComponent {
    showNavBar: boolean = false;

     constructor( private authenticationService: AuthenticationService,
     private router: Router, ) {

        this.authenticationService.showNavBarEmitter.subscribe((mode)=>{
            if (mode !== null) {
              this.showNavBar = mode;
            } else {
                if (this.authenticationService.loggedIn()) {
                    this.showNavBar = true;
                } else {
                    this.showNavBar = false;
                }
            }
        });

     }

    logout() {
         this.authenticationService.logout();
         this.authenticationService.showNavBar(false);
    }

}