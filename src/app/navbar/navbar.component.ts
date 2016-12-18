import {Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'navbar',
    styles: [],
    templateUrl: 'app/navbar/navbar.component.html'
})

export class NavbarComponent {
    // showNavBar: boolean = false;

    // constructor(
    //     private authenticationService: AuthenticationService,
    //     private router: Router
    //     ) {
    //     this.authenticationService.showNavBarEmitter.subscribe((mode)=>{
    //         if (mode !== null) {
    //           this.showNavBar = mode;
    //         } else {
    //             if (this.authenticationService.loggedIn()) {
    //                 this.showNavBar = true;
    //             }
    //         }
    //     });

    // }

    // logout() {
    //     this.authenticationService.showNavBar(false);
    //     this.authenticationService.logout();
    // }

}