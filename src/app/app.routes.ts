import { Routes } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { AdminLogin } from './components/admin-login/admin-login';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { AddJob } from './components/add-job/add-job';
import { ManageJobs } from './components/manage-jobs/manage-jobs';
import { ViewApplications } from './components/view-applications/view-applications';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'navbar', component: Navbar },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'admin-login', component: AdminLogin },
  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    children: [
      { path: 'add-job', component: AddJob },
      { path: 'manage-jobs', component: ManageJobs },
      { path: 'view-applications', component: ViewApplications },
      { path: '', redirectTo: 'add-job', pathMatch: 'full' }
    ]
  }
];
