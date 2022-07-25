import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from './components/abm-alumnos/abm-alumnos.component';
import { NavbarComponent } from './components/_navegation/navbar/navbar.component';
import { FontSize20Directive } from './shared/directives/font-size-20.directive';
import { NombreApellidoPipe } from './shared/pipes/nombre-apellido.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListaAlumnosComponent,
    AbmAlumnosComponent,
    NavbarComponent,
    FontSize20Directive,
    NombreApellidoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
