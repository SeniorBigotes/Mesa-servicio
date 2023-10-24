import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private viewPage: boolean = false;

  constructor(public route: Router) { }

  public setViewPage(viewPage: boolean) {
    this.viewPage = viewPage;
  }
  public getViewPage(): boolean {
    return this.viewPage;
  }
}
