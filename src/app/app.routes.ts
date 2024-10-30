import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './initial/login-form/login-form.component';
import { InitialComponent } from './initial/initial.component';

export const routes: Routes = [
    {
        path: "",
        component: InitialComponent,
    },
    {
        path: "home",
        component: HomeComponent,
    }
];
