import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './pages/tickets.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { FormularioComponent } from './components/formulario/formulario.component';

const routes: Routes = [
  {path: '', component: TicketsComponent, children: [
    {path: 'activos', component: TicketComponent},
    {path: 'finalizados', component: TicketComponent},
    {path: 'nuevo', component: FormularioComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
