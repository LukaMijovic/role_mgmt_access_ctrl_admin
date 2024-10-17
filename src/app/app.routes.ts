import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './initial/login-form/login-form.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginFormComponent,
    },
    {
        path: "home",
        component: HomeComponent,
    }
];
