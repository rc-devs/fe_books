import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticateService);
  const router = inject(Router);

  if (authService.isLoggedIn()){
    console.log('User cannont access this path if logged in')
    return false;
  } else {
    return true;
  }
};
