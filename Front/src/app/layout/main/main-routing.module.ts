import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';

// arreglar el outlet y main
const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {path: 'tickets', loadChildren: () => import('../tickets/tickets.module').then(m => m.TicketsModule)}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }