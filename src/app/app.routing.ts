import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
//import { RegisterComponent } from './register/register.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    //{ path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    //{ path: 'register', component: RegisterComponent },
    { path: 'myteam', component: MyTeamComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);