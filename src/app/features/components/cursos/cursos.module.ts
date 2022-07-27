import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { ListaCursosComponent } from './lista-cursos/lista-cursos.component';
import { AbmCursosComponent } from '../cursos/abm-cursos/abm-cursos.component';


@NgModule({
  declarations: [
    ListaCursosComponent,
    AbmCursosComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule
  ],
  exports: [
    ListaCursosComponent,
    AbmCursosComponent
  ]
})
export class CursosModule { }
