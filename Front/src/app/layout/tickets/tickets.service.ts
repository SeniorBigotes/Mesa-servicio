import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  
  ticketsUrl: string = environment.API_API;

  constructor(private http: HttpClient) { }

  getTickets(): Observable<any> {
    return this.http.get(`${this.ticketsUrl}/tickets`);
  }
}
