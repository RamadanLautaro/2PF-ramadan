import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './clases-routing.module';
import { ListaClasesComponent } from './lista-clases/lista-clases.component';
import { AbmClasesComponent } from './abm-clases/abm-clases.component';


@NgModule({
  declarations: [
    ListaClasesComponent,
    AbmClasesComponent
  ],
  imports: [
    CommonModule,
    ClasesRoutingModule
  ],
  exports: [
    ListaClasesComponent,
    AbmClasesComponent
  ]
})
export class ClasesModule { }
