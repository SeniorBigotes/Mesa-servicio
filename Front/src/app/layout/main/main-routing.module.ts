import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { mainGuard } from './main.guard';
import { ModificarComponent } from '../tickets/components/modificar/modificar.component';

// arreglar el outlet y main
const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    canActivate: [mainGuard],
    children: [
      {path: 'tickets', loadChildren: () => import('../tickets/tickets.module').then(m => m.TicketsModule)},
      {path: 'users', loadChildren: () => import('../usuarios/usuarios.module').then(m => m.FormRegisterModule)}
    ]
  },
  {path: '**', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
