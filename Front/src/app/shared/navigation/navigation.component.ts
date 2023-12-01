import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/layout/login/login.service';
import { MainService } from 'src/app/layout/main/main.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  authority: string = this.loginService.authority;
  
  constructor(private loginService: LoginService,
              private mainService: MainService,
              private router: Router) {}

  ngOnInit(): void {
    // Mostrar al cargar
    this.updateUrl()
  }
  // Actualizar con tiempo controlado al dar click
  click(): void {
    setTimeout(() => this.updateUrl(), 100);
  }
  
  // Actualizar variable depenidendo de la url
  private updateUrl(): void {
    this.router.url === '/main' ?
      this.mainService.home(true) : this.mainService.home(false);
  }
}
