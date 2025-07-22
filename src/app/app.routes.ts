import { Routes } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Home } from './components/home/home';

export const routes: Routes = [
    {
        path:'home',component:Home
    },
    {
        path:'navbar',component:Navbar
    },
    {
        path:'register',component:Register
    },
    {
        path:'login',component:Login
    }
];
