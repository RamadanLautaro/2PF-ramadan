import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Alumno } from '../../models/alumno.model';

const listaAlumnos: Alumno[] = [
  {legajo: 25239, nombre: 'Lautaro', apellido: 'Ramadán', edad: 23, email: 'ramadanlautaro@gmail.com'},
  {legajo: 20011, nombre: 'Jane', apellido: 'Hopper', edad: 20, email: 'eleven11@gmail.com'},
  {legajo: 20022, nombre: 'Max', apellido: 'Mayfield', edad: 19, email: 'max2000@gmail.com'},
  {legajo: 20002, nombre: 'Mike', apellido: 'Wheeler', edad: 18, email: 'mikewheeler@gmail.com'},
  {legajo: 20001, nombre: 'Dustin', apellido: 'Henderson', edad: 18, email: 'dustinhenderson@gmail.com'},
  {legajo: 18111, nombre: 'Steve', apellido: 'Harrington', edad: 23, email: 'steve.movies@gmail.com'},
  {legajo: 17222, nombre: 'Eddie', apellido: 'Munson', edad: 25, email: 'masterofthepuppets@gmail.com'},
  {legajo: 18333, nombre: 'Nancy', apellido: 'Wheeler', edad: 22, email: 'nancy.periodism@gmail.com'},
  {legajo: 18222, nombre: 'Robin', apellido: 'Buckley', edad: 22, email: 'robin.movies@gmail.com'},
  {legajo: 20003, nombre: 'Lucas', apellido: 'Sinclair', edad: 18, email: 'lucassinclair@gmail.com'},
  {legajo: 20004, nombre: 'Will', apellido: 'Byers', edad: 18, email: 'willbyers@gmail.com'},
];

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit {

  constructor() {}
  ngOnInit(): void {}

  displayedColumns: string[] = ['legajo', 'nombre-apellido', 'edad', 'email', 'acciones'];
  dataSource = listaAlumnos;

  @Input() listaAlumnos = this.dataSource;
  showFiller = false;

  index: any = 0;
  legajo: any = null;
  nombre: any = '';
  apellido: any = '';
  edad: any = '';
  email: any = '';

  //FORMULARIO ALUMNO: EDITAR
  formularioAlumno = new FormGroup({
    index: new FormControl(this.legajo, [Validators.required]),
    legajo: new FormControl(this.legajo, [Validators.required]),
    nombre: new FormControl(this.nombre, [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl(this.apellido, [Validators.required, Validators.minLength(3)]),
    edad: new FormControl(this.edad, [Validators.required, Validators.max(110)]),
    email: new FormControl(this.email, [Validators.required, Validators.email]),
  })

  //AGREGAR ALUMNO A LA LISTA
  agregarAlumno(listaAlumnos: Alumno[]) {
    this.dataSource = this.dataSource.filter(x => listaAlumnos.includes(x));
  }

  //CARGAR FORMULARIO DE EDICION
  cargarFormulario(index: any, alumno: Alumno){
    this.formularioAlumno.controls.index.setValue(index);
    this.formularioAlumno.controls.legajo.setValue(alumno.legajo);
    this.formularioAlumno.controls.nombre.setValue(alumno.nombre);
    this.formularioAlumno.controls.apellido.setValue(alumno.apellido);
    this.formularioAlumno.controls.edad.setValue(alumno.edad);
    this.formularioAlumno.controls.email.setValue(alumno.email);
    console.log(this.formularioAlumno.value);
  }

  //EDITAR ALUMNO
  editarAlumno(index: any){

    let legajo: any = this.formularioAlumno.get('legajo')?.value
    let nombre: any =  this.formularioAlumno.get('nombre')?.value
    let apellido: any =  this.formularioAlumno.get('apellido')?.value
    let edad: any =  this.formularioAlumno.get('edad')?.value
    let email: any =  this.formularioAlumno.get('email')?.value

    let alumnoEditado : Alumno = { legajo, nombre, apellido, edad, email };

    this.dataSource.splice(index, 1, alumnoEditado);
    this.dataSource = this.dataSource.filter(x => this.dataSource.includes(x));
  }

  //ELIMINAR ALUMNO DE LA LISTA
  eliminarAlumno(index: any) {
    var alumnoEliminado = this.dataSource.splice(index, 1);
    this.dataSource = this.dataSource.filter(x => !alumnoEliminado.includes(x));
  }
}