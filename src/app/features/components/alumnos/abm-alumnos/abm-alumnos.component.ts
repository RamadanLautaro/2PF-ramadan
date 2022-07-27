import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Alumno } from '../../../../models/alumno.model';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.css']
})
export class AbmAlumnosComponent implements OnInit {

  @Input() listaAlumnos: Alumno[] = [];
  @Input() drawer: any;
  @Output() enviarNuevoAlumno = new EventEmitter<Alumno[]>()

  constructor() {}
  ngOnInit(): void {}

  //FORMULARIO ALUMNO: AGREGAR
  formularioAlumno = new FormGroup({
    legajo: new FormControl(null, [Validators.required]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    edad: new FormControl(null, [Validators.required, Validators.max(110)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  //AGREGAR ALUMNO
  agregarAlumno() {
    let legajo: any = this.formularioAlumno.get('legajo')?.value
    let nombre: any =  this.formularioAlumno.get('nombre')?.value
    let apellido: any =  this.formularioAlumno.get('apellido')?.value
    let edad: any =  this.formularioAlumno.get('edad')?.value
    let email: any =  this.formularioAlumno.get('email')?.value

    let nuevoAlumno : Alumno = { legajo, nombre, apellido, edad, email };

    this.listaAlumnos.unshift(nuevoAlumno);
    this.formularioAlumno.reset();

    this.enviarNuevoAlumno.emit(this.listaAlumnos);
    this.drawer.toggle();
  }
}