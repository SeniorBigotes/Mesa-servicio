import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './pages/tickets.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { FormularioComponent } from './components/formulario/formulario.component';


@NgModule({
  declarations: [
    TicketsComponent,
    TicketComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule
  ]
})
export class TicketsModule { }
