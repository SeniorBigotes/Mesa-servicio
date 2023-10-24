import { Component } from '@angular/core';
import { ServiciosService } from 'src/app/servicios.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {

  constructor(private loginAuth: ServiciosService) {}

  viewPage(): boolean {
    // !true = false
    if(!this.loginAuth.getViewPage()) {
      this.loginAuth.route.navigate(['/login']);
      return this.loginAuth.getViewPage();
    }
    // true
    return this.loginAuth.getViewPage();
  }
}
