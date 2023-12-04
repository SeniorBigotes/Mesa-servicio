import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sin-tickets',
  templateUrl: './sin-tickets.component.html',
  styleUrls: ['./sin-tickets.component.scss']
})
export class SinTicketsComponent {

  constructor(private router: Router) {}
  ir() {
    this.router.navigate(['/main/tickets/nuevo'])
  }
}
