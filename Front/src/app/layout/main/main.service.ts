import { Injectable, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class MainService implements OnInit {

  // rol del usuario logeado
  authority: string = this.loginService.getUserRol();
  // ruta actual
  urlActual!: string;
  
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
  }
}
