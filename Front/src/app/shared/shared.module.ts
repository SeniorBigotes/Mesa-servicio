import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { SectionRightComponent } from './section-right/section-right.component';
import { RouterModule } from '@angular/router';
import { ModificarComponent } from '../layout/tickets/components/modificar/modificar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavigationComponent,
    SectionRightComponent,
    ModificarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavigationComponent,
    SectionRightComponent
  ]
})
export class SharedModule { }
