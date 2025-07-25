import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';
import { noAuthGuard } from '../shared/guards/no-auth.guard';

export const routes: Routes = [
  {
  path: 'navbar',
  loadComponent: () => import('./core/navbar/navbar.component').then((c) => c.NavbarComponent),
  canActivate: [noAuthGuard],
  children: [
      {
    path: 'login',
    loadComponent: () => import('./core/login/login.component').then((c) => c.LoginComponent),
    canActivate: [noAuthGuard] 
      },
      {
    path: 'logout',
    loadComponent: () => import('./core/logout/logout.component').then((c) => c.LogoutComponent),
    canActivate: [authGuard] 
      },
    ]
  },
  {
    path: 'book-list',
    loadComponent: () => import('./features/book-list/book-list.component').then((c) => c.BookListComponent),
    canActivate: [authGuard]
  },
];
