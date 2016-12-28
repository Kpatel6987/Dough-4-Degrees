import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { MyTimelineComponent } from './my-timeline/my-timeline.component';
import { MyItemsComponent } from './my-items/my-items.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'myteam', component: MyTeamComponent, canActivate: [AuthGuard] },
    { path: 'mytimeline', component: MyTimelineComponent, canActivate: [AuthGuard]},
    { path: 'myitems', component: MyItemsComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);