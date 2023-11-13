import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegisterComponent } from './components/form/form-register.component';
import { PagesComponent } from './pages/pages.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [
  { path: '', component: PagesComponent, children: [
    { path: 'registrar', component: FormRegisterComponent},
    { path: 'usuarios', component: UsuarioComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRegisterRoutingModule { }
