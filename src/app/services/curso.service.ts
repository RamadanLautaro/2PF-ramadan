import { Injectable } from '@angular/core';
import { catchError, of, Observable, map } from 'rxjs';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  //LISTADO DE CURSOS
  listaCursos: Curso[] = [
    {id: 1, nombre: "Desarrollo Web", profesor: "Darío Lucas Capdevila", fechaInicio: new Date('2022-02-23 00:00'), fechaFin: new Date('2022-04-27 00:00')},
    {id: 2, nombre: "JavaScript", profesor: "Carolina Lemes", fechaInicio: new Date('2022-02-24 00:00'), fechaFin: new Date('2022-04-28 00:00')},
    {id: 3, nombre: "Angular", profesor: "Jorge Palacio Barcinilla", fechaInicio: new Date('2022-05-26 00:00'), fechaFin: new Date('2022-07-26 00:00')},
    {id: 4, nombre: "React", profesor: "Carolina Galassi Borba", fechaInicio: new Date('2022-05-24 00:00'), fechaFin: new Date('2022-07-07 00:00')},
    {id: 5, nombre: "Backend", profesor: "Linda Gutierrez Montoya", fechaInicio: new Date('2022-07-19 00:00'), fechaFin: new Date('2023-01-10 00:00')},
    {id: 6, nombre: "Desarrollo de Aplicaciones", profesor: "Martin Mobile", fechaInicio: new Date('2022-08-24 00:00'), fechaFin: new Date('2022-010-24 00:00')},
    {id: 7, nombre: "SQL", profesor: "Sebastian Villa", fechaInicio: new Date('2022-09-17 00:00'), fechaFin: new Date('2022-12-24 00:00')},
  ];


  constructor() { }

  
  //AGREGAR CURSO
  agregarCurso(curso: any): Observable<Curso[]> {
    let cursosOrderIdDesc = Object.values(this.listaCursos).sort
    (function (a, b) {if (a.id < b.id) return 1; if (a.id > b.id) return -1; return 0;})

    //obtengo el id mas grande y le sumo 1
    curso.id = cursosOrderIdDesc[0].id + 1;
    this.listaCursos.unshift(curso);

    return of(this.listaCursos).pipe (
      map((cursos) => cursos.filter(x => this.listaCursos.includes(x))),
      catchError(() => {throw new Error("No se pudo agregar el curso...")})
    )
  }

  //ELIMINAR CURSO
  eliminarCurso(id: number): Observable<Curso[]> {
    return of(this.listaCursos).pipe (
      map((cursos) => cursos.splice(this.listaCursos.findIndex(x => x.id == id), 1)),
      catchError(() => {throw new Error("No se pudo eliminar el curso...")})
    )
  }

  //EDITAR CURSO
  editarCurso(curso: any): Observable<Curso[]> {
    this.listaCursos.splice(this.listaCursos.findIndex(x => x.id == curso.id), 1, curso);
    return of(this.listaCursos).pipe (
      map((cursos) => cursos.filter(x => this.listaCursos.includes(x))),
      catchError(() => {throw new Error("No se pudo editar el curso...")})
    )
  }

  //OBTENER CURSOS
  obtenerCursos(): Observable<Curso[]> {
    return of(this.listaCursos).pipe (
      map((cursos) => cursos.filter(x => this.listaCursos.includes(x))),
      catchError(() => {throw new Error("No se pudo obtener los cursos...")})
    )
  }
}
