import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService: LoginService = inject(LoginService);
  if(loginService.logOut()) {
    return true;
  }
  return false;
};
