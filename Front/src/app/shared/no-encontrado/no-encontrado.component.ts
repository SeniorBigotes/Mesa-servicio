import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-encontrado',
  templateUrl: './no-encontrado.component.html',
  styleUrls: ['./no-encontrado.component.scss']
})
export class NoEncontradoComponent {
  
  constructor(private router: Router) {}

  ir() {
    this.router.navigate(['/main/tickets/nuevo']);
  }
}
