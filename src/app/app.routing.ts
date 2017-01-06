import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { MyTimelineComponent } from './my-timeline/my-timeline.component';
import { MyItemsComponent } from './my-items/my-items.component';
import { MyAccountComponent } from './my-account/my-account.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'myteam', component: MyTeamComponent, canActivate: [AuthGuard] },
    { path: 'mytimeline', component: MyTimelineComponent, canActivate: [AuthGuard]},
    { path: 'myitems', component: MyItemsComponent, canActivate: [AuthGuard]},
    { path: 'resetpass', component: ResetComponent },
    { path: 'myaccount', component: MyAccountComponent, canActivate: [AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);