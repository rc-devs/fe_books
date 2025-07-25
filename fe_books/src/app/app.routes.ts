import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./core/login/login.component').then((c) => c.LoginComponent) 
  },
  {
    path: 'book-list',
    loadComponent: () => import('./features/book-list/book-list.component').then((c) => c.BookListComponent),
    canActivate: [authGuard]
  },
];
