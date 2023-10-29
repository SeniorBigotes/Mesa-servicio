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
  tokenLocalStorage: string | null = this.loginService.getToken();
  remainingTokenTime: number = 0;

  constructor(private serviciosService: ServiciosService,
              private loginService: LoginService) {}
  
  ngOnInit(): void {    
    // verifica el inicio de sesion
    if(this.loginService.isLoggedIn ()) {
      this.userLogin = true;
    } else {
      this.serviciosService.route.navigate(['/login']);
    }
    
    // Obtener datos del token
    try {
      if(this.tokenLocalStorage !== null) {
        const token = this.tokenLocalStorage;
        const tokenDecoded = this.decodeToken(token);
        let tokenExp = this.tokenTime(tokenDecoded.exp);
        let tokenIat = this.tokenTime(tokenDecoded.iat);
      }
    } catch (err) {
      if(this.loginService.logOut()) {
        this.serviciosService.error = "Error en el iniciar sesion";
        this.serviciosService.activarError = true;
        this.serviciosService.route.navigate(['/login']);
      }
    }
  } // end ngOnInit

  private decodeToken(token: string) {
    const partes = token.split('.');
    if(partes.length === 3) {
      const decoded = atob(partes[1]);
      return JSON.parse(decoded);
    }
    return null;
  }

  private tokenTime(time: number) {
    const date = new Date(time * 1000);
    return date;
  }
}
