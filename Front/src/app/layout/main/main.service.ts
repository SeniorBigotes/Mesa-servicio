import { Injectable, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService implements OnInit {

  // rol del usuario logeado
  authority!: string | null;
  // ruta actual
  urlActual!: string;

  // Cargar home o outlet (main, navigation)
  private homePage = new BehaviorSubject<boolean>(true);
  homePage$ = this.homePage.asObservable();
  
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    try { this.authority = this.loginService.getUserRol() }
    catch (err) { this.loginService.logOut() }
  }

  // Cargar home o outlet (main, navigation)
  home(main: boolean): void {
    this.homePage.next(main);
  }
}
