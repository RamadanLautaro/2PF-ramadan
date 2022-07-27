import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LandingComponent } from '../landing/landing.component';

const AlumnosModule = () => import('../alumnos/alumnos.module').then(x => x.AlumnosModule);
const ClasesModule = () => import('../clases/clases.module').then(x => x.ClasesModule);
const CursosModule = () => import('../cursos/cursos.module').then(x => x.CursosModule);

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: '', component: LandingComponent },
    { path: 'alumnos', loadChildren: AlumnosModule },
    { path: 'clases', loadChildren: ClasesModule },
    { path: 'cursos', loadChildren: CursosModule }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
