import { Injectable } from '@angular/core';
import { catchError, filter, of, from, Observable, map } from 'rxjs';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  //LISTADO DE ALUMNOS
  listaAlumnos: Alumno[] = [
    {id: 1, legajo: 25239, nombre: 'Lautaro', apellido: 'Ramadán', edad: 23, email: 'ramadanlautaro@gmail.com'},
    {id: 11, legajo: 20011, nombre: 'Jane', apellido: 'Hopper', edad: 20, email: 'eleven11@gmail.com'},
    {id: 3, legajo: 20022, nombre: 'Max', apellido: 'Mayfield', edad: 19, email: 'max2000@gmail.com'},
    {id: 4, legajo: 20002, nombre: 'Mike', apellido: 'Wheeler', edad: 18, email: 'mikewheeler@gmail.com'},
    {id: 5, legajo: 20001, nombre: 'Dustin', apellido: 'Henderson', edad: 18, email: 'dustinhenderson@gmail.com'},
    {id: 6, legajo: 18111, nombre: 'Steve', apellido: 'Harrington', edad: 23, email: 'steve.movies@gmail.com'},
    {id: 7, legajo: 17222, nombre: 'Eddie', apellido: 'Munson', edad: 25, email: 'masterofthepuppets@gmail.com'},
    {id: 8, legajo: 18333, nombre: 'Nancy', apellido: 'Wheeler', edad: 22, email: 'nancy.periodism@gmail.com'},
    {id: 9, legajo: 18222, nombre: 'Robin', apellido: 'Buckley', edad: 22, email: 'robin.movies@gmail.com'},
    {id: 10, legajo: 20003, nombre: 'Lucas', apellido: 'Sinclair', edad: 18, email: 'lucassinclair@gmail.com'},
    {id: 12, legajo: 20004, nombre: 'Will', apellido: 'Byers', edad: 18, email: 'willbyers@gmail.com'},
  ];


  constructor() { }

  
  //AGREGAR ALUMNO
  agregarAlumno(alumno: any): Observable<Alumno[]> {
    let alumnosOrderIdDesc = Object.values(this.listaAlumnos).sort
    (function (a, b) {if (a.id < b.id) return 1; if (a.id > b.id) return -1; return 0;})

    //obtengo el id mas grande y le sumo 1
    alumno.id = alumnosOrderIdDesc[0].id + 1;
    this.listaAlumnos.unshift(alumno);

    return of(this.listaAlumnos).pipe (
      map((alumnos) => alumnos.filter(x => this.listaAlumnos.includes(x))),
      catchError(() => {throw new Error("No se pudo agregar el alumno...")})
    )
  }

  //ELIMINAR ALUMNO
  eliminarAlumno(id: number): Observable<Alumno[]> {
    return of(this.listaAlumnos).pipe (
      map((alumnos) => alumnos.splice(this.listaAlumnos.findIndex(x => x.id == id), 1)),
      catchError(() => {throw new Error("No se pudo eliminar el alumno...")})
    )
  }

  //EDITAR ALUMNO
  editarAlumno(alumno: any): Observable<Alumno[]> {
    this.listaAlumnos.splice(this.listaAlumnos.findIndex(x => x.id == alumno.id), 1, alumno);
    return of(this.listaAlumnos).pipe (
      map((alumnos) => alumnos.filter(x => this.listaAlumnos.includes(x))),
      catchError(() => {throw new Error("No se pudo editar el alumno...")})
    )
  }

  //OBTENER ALUMNOS
  obtenerAlumnos(): Observable<Alumno[]> {
    return of(this.listaAlumnos).pipe (
      map((alumnos) => alumnos.filter(x => this.listaAlumnos.includes(x))),
      catchError(() => {throw new Error("No se pudo obtener los alumnos...")})
    )
  }
}
