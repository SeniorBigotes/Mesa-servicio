import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

export const mainGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
                                        state: RouterStateSnapshot
): boolean => {
  const loginService: LoginService = inject(LoginService);
  const router: Router = inject(Router);

  if(!loginService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
