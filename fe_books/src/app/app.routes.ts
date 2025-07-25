import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./core/login/login.component').then((c) => c.LoginComponent),
    // canActivate: [authGuard]
  }
];
