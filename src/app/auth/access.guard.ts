import {Auth} from './auth';
import {inject} from '@angular/core';
import {Router} from '@angular/router';

export const canActivateAuth = () => {
  const isLoggedIn = inject(Auth).isAuth

  if (isLoggedIn) {
    return true
  }

  return inject(Router).createUrlTree(['/login'])
}
