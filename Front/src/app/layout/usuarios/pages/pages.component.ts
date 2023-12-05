import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  
  userRol: string = this.loginService.getUserRol();
  
  constructor(private router: Router,
              private loginService: LoginService) {}

  ngOnInit(): void {
    if(this.router.url.includes('users') && this.userRol !== 'ADMINISTRADOR') {
      this.router.navigate(['/main/tickets/mis-tickets/']);
    }
  }
}
