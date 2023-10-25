import { Component } from '@angular/core';
import { ServiciosService } from 'src/app/servicios.service';
import { LoginService } from '../../login/login.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {

  constructor(private serviciosService: ServiciosService,
              private loginService: LoginService) {}

  viewPage(): boolean {
    return this.serviciosService.getViewPage();
  }
}
