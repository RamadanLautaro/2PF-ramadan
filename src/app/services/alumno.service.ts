import { Injectable } from '@angular/core';
import { catchError, filter, of, from, Observable, map } from 'rxjs';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  //LISTADO DE ALUMNOS
  listaAlumnos: Alumno[] = [
    {legajo: 25239, nombre: 'Lautaro', apellido: 'Ramadán', edad: 23, email: 'ramadanlautaro@gmail.com', aprobado: true},
    {legajo: 20011, nombre: 'Jane', apellido: 'Hopper', edad: 20, email: 'eleven11@gmail.com', aprobado: true},
    {legajo: 20022, nombre: 'Max', apellido: 'Mayfield', edad: 19, email: 'max2000@gmail.com', aprobado: false},
    {legajo: 20002, nombre: 'Mike', apellido: 'Wheeler', edad: 18, email: 'mikewheeler@gmail.com', aprobado: true},
    {legajo: 20001, nombre: 'Dustin', apellido: 'Henderson', edad: 18, email: 'dustinhenderson@gmail.com', aprobado: true},
    {legajo: 18111, nombre: 'Steve', apellido: 'Harrington', edad: 23, email: 'steve.movies@gmail.com', aprobado: false},
    {legajo: 17222, nombre: 'Eddie', apellido: 'Munson', edad: 25, email: 'masterofthepuppets@gmail.com', aprobado: false},
    {legajo: 18333, nombre: 'Nancy', apellido: 'Wheeler', edad: 22, email: 'nancy.periodism@gmail.com', aprobado: true},
    {legajo: 18222, nombre: 'Robin', apellido: 'Buckley', edad: 22, email: 'robin.movies@gmail.com', aprobado: false},
    {legajo: 20003, nombre: 'Lucas', apellido: 'Sinclair', edad: 18, email: 'lucassinclair@gmail.com', aprobado: false},
    {legajo: 20004, nombre: 'Will', apellido: 'Byers', edad: 18, email: 'willbyers@gmail.com', aprobado: true},
  ];


  constructor() { }

  
  //OBTENER ALUMNOS
  obtenerAlumnos(): Promise<Alumno[]> {
    return new Promise((resolve, rejects) => {
      resolve(this.listaAlumnos);
      rejects("No se pudieron obtener los alumnos...");
    })
  }

  //AGREGAR ALUMNO
  agregarAlumno(alumno: any): Observable<Alumno[]> {
    this.listaAlumnos.unshift(alumno)
    return of(this.listaAlumnos).pipe (
      map((alumnos) => alumnos.filter(x => this.listaAlumnos.includes(x))),
      catchError(() => {throw new Error("No se pudo agregar el alumno...")})
    )
  }

  //ELIMINAR ALUMNO
  eliminarAlumno(index?: number): Observable<Alumno[]> {
    return of(this.listaAlumnos).pipe (
      map((alumnos) => alumnos.splice(index!, 1)),
      catchError(() => {throw new Error("No se pudo eliminar el alumno...")})
    )
  }

  //EDITAR ALUMNO
  editarAlumno(index?: number, alumno?: any): Observable<Alumno[]> {
    this.listaAlumnos.splice(index!, 1, alumno)
    return of(this.listaAlumnos).pipe (
      map((alumnos) => alumnos.filter(x => this.listaAlumnos.includes(x))),
      catchError(() => {throw new Error("No se pudo editar el alumno...")})
    )
  }

  //FILTRAR ALUMNOS
  filtrarAlumnos(aprobados: boolean): Observable<Alumno[]> {
    return of(this.listaAlumnos).pipe(
      map((alumnos) => alumnos.filter((alumno) => alumno.aprobado == aprobados)),
      catchError(() => {throw new Error("No se pudieron filtrar los alumnos...")})
    )
  }
}
