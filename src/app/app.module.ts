import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { routing }        from './app.routing';

import { CalendarModule } from 'angular2-calendar';
import { DatePickerModule } from 'ng2-datepicker';

import { AppComponent }  from './app.component';
import { AlertComponent } from './_directives/alert.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component'
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from 'app/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { MyTimelineComponent } from './my-timeline/my-timeline.component';
import { MyItemsComponent } from './my-items/my-items.component';
import { MyAccountComponent } from './my-account/my-account.component';

import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { AlertService } from './_services/alert.service';
import { UserService } from './_services/user.service';
import { ContactsService } from './_services/contacts.service';
import { ScholarshipService } from './_services/scholarship.service';
import { ItemsService } from './_services/items.service';
import { ScholarshipDetailsComponent } from './scholarship-details/scholarship-details.component';


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
        CalendarModule.forRoot(),
        DatePickerModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        LoginComponent,
        RegisterComponent,
        ResetComponent,
        NavbarComponent,
        HomeComponent,
        MyTeamComponent,
        MyTimelineComponent,
        MyItemsComponent,
        MyAccountComponent,
        ScholarshipDetailsComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        ContactsService,
        ScholarshipService,
        ItemsService,

        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }