import { Component, OnInit } from '@angular/core';
import { LoginService } from './layout/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ServiceDesk';

  constructor() {}

  ngOnInit(): void {
  }
}
