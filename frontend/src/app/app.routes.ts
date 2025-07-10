import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login-page';
import { HomePage } from './pages/home-page/home-page';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: LoginPage
    },

    {
        path: 'home',
        component: HomePage
    }
];
