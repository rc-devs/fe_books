import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticateService);
  const router = inject(Router);

  if (authService.isLoggedIn()){
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
