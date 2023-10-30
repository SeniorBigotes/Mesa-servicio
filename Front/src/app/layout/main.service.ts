import { Injectable, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class MainService implements OnInit {

  authority: string = this.loginService.getUserRol();
  
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
  }
}
