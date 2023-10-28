import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

export const mainGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
                                        state: RouterStateSnapshot
): boolean | UrlTree => {
  const loginService: LoginService = inject(LoginService);
  if(loginService.isLoggedIn() && loginService.getUserRol() === "SUPERADMIN") {
    return true;
  }
  localStorage.removeItem('token');
  return false;
};
