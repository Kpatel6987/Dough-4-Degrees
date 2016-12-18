import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})

export class AppComponent {
    constructor(public af: AngularFire) { }

    login() {
        this.af.auth.login({email: 'user@email.com', password: 'password'});
        console.log("here");
    }
}