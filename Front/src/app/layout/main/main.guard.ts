import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, NavigationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../login/login.service';
import { MainService } from './main.service';

export const mainGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
                                        state: RouterStateSnapshot
): boolean => {
  const loginService: LoginService = inject(LoginService);
  const mainService: MainService = inject(MainService);
  const router: Router = inject(Router);

  // verifiar el inicio de sesion
  if(!loginService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  if(mainService.authority === null || mainService.authority === '') {
    router.navigate(['/login']);
    return false;
  } else {
    loginService.authority = loginService.getUserRol();
  }
  
  // cargar url
  router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        mainService.urlActual = event.url;
      }
  });
  // cargar autoridad o rol
  return true;
};
