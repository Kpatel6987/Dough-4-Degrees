import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// used to create fake backend
// import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

// import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/auth.guard';
// import { AlertService, AuthenticationService, UserService } from './_services/index';
import { AuthenticationService } from './_services/authentication.service';

 import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from 'app/navbar/navbar.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { HomeComponent } from './home/home.component';

const myFirebaseConfig = {
  apiKey: 'AIzaSyD4iCKc3wiyBgy0x-LCDSDA39Wxg5IX26I',
  authDomain: 'dough-4-degrees.firebaseapp.com',
  databaseURL: 'https://dough-4-degrees.firebaseio.com',
  storageBucket: 'dough-4-degrees.appspot.com',
  messagingSenderId: '1016225529448'
}

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
       routing,
        AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
    ],
    declarations: [
        AppComponent,
        // AlertComponent,
         LoginComponent,
        // RegisterComponent,
        NavbarComponent,
        MyTeamComponent,
        HomeComponent
    ],
    providers: [
         AuthGuard,
        // AlertService,
        AuthenticationService,
        // UserService,

        // providers used to create fake backend
        //fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }