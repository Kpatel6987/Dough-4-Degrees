import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { routing }        from './app.routing';

import { AppComponent }  from './app.component';
import { AlertComponent } from './_directives/alert.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from 'app/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { MyTimelineComponent } from './my-timeline/my-timeline.component'

import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { AlertService } from './_services/alert.service';
import { UserService } from './_services/user.service';
import { ContactsService } from './_services/contacts.service';
import { ScholarshipService } from './_services/scholarship.service'

import { CalendarModule } from 'angular2-calendar'

const myFirebaseConfig = {
  apiKey: 'AIzaSyD4iCKc3wiyBgy0x-LCDSDA39Wxg5IX26I',
  authDomain: 'dough-4-degrees.firebaseapp.com',
  databaseURL: 'https://dough-4-degrees.firebaseio.com',
  storageBucket: 'dough-4-degrees.appspot.com'
}

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig),
        CalendarModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        LoginComponent,
        RegisterComponent,
        NavbarComponent,
        HomeComponent,
        MyTeamComponent,
        MyTimelineComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        ContactsService,
        ScholarshipService,

        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }