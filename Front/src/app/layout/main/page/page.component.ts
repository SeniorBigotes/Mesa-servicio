import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/servicios.service';
import { LoginService } from '../../login/login.service';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { MainService } from '../main.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  // variable para el inicio de sesion
  userLogin: boolean = false;
  tokenLocalStorage: string | null = this.loginService.getToken();

  main!: boolean;

  constructor(private serviciosService: ServiciosService,
              private loginService: LoginService,
              private mainService: MainService,
              private router: Router) {}
  
  ngOnInit(): void {    
    // verifica el inicio de sesion
    this.loginService.isLoggedIn () ? 
      this.userLogin = true : this.serviciosService.route.navigate(['/login']);
    
    // Cerrar sesion una vez expire el token
    /* Para el futuro
        Preguntar si quiere extender la sesión (almacenar nuevo token sin volver a iniciar sesión)
        Expirar la sesion sin extemder  (dar una alerta de que la sesion expiro)*/
    try {
      if(this.tokenLocalStorage !== null) {
        const token = this.tokenLocalStorage;
        const tokenDecoded = this.decodeToken(token);
        const currentTIime = Date.now() / 1000;
        if(tokenDecoded.exp < currentTIime) this.loginService.logOut()
      }
    } catch (err) {
      if(this.loginService.logOut()) {
        this.serviciosService.error = "Error en el iniciar sesion";
        this.serviciosService.activarError = true;
        this.serviciosService.route.navigate(['/login']);
      }
    }

    // mostrar home o no
    this.mainService.homePage$.subscribe(resp => this.main = resp);
  } // end ngOnInit

  // Decodificar token
  private decodeToken(token: string) {
    const partes = token.split('.');
    if(partes.length === 3) {
      const decoded = atob(partes[1]);
      return JSON.parse(decoded);
    }
    return null;
  }
}
