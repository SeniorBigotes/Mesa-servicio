import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/servicios.service';
import { LoginService } from '../../login/login.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  // variable para el inicio de sesion
  userLogin: boolean = false;

  constructor(private serviciosService: ServiciosService,
              private loginService: LoginService) {}
  
  ngOnInit(): void {
    // verifica el inicio de sesion
    if(this.loginService.getToken()) {
      this.userLogin = true;
    }
    
    if(!this.userLogin) {
    this.serviciosService.route.navigate(['/login']);
    }
  }
}
