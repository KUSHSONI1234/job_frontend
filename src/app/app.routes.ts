import { Routes } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Register } from './components/register/register';
import { Login } from './components/login/login';

export const routes: Routes = [
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
