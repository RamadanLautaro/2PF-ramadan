import { Injectable } from '@angular/core';
import { catchError, filter, of, from, Observable, map } from 'rxjs';
import { Clase } from '../models/clase.model';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  //LISTADO DE CLASES
  listaClases: Clase[] = [
    {id: 1, curso: "Angular", nombre: "Introducción al curso y a Angular", fecha: new Date('2022-05-26 00:00'), obligatoria: true},
    {id: 2, curso: "Angular", nombre: "Componentes y Elementos de un proyecto", fecha: new Date('2022-05-31 00:00'), obligatoria: true},
    {id: 3, curso: "Angular", nombre: "Typescript", fecha: new Date('2022-06-02 00:00'), obligatoria: false},
    {id: 4, curso: "Angular", nombre: "Interpolación y Directivas", fecha: new Date('2022-06-07 00:00'), obligatoria: true},
    {id: 5, curso: "Angular", nombre: "Comunicación entre componentes", fecha: new Date('2022-06-09 00:00'), obligatoria: false},
    {id: 6, curso: "React", nombre: "JSX & transpiling", fecha: new Date('2022-07-07 00:00'), obligatoria: true},
    {id: 7, curso: "React", nombre: "Promises, asincronía y MAP", fecha: new Date('2022-07-08 00:00'), obligatoria: true},
    {id: 8, curso: "React", nombre: "State, Effect y Context", fecha: new Date('2022-07-17 00:00'), obligatoria: true},
    {id: 9, curso: "Backend", nombre: "NodeJS", fecha: new Date('2022-08-01 00:00'), obligatoria: false},
    {id: 10, curso: "Backend", nombre: "ExpressJS", fecha: new Date('2022-08-02 00:00'), obligatoria: false}
  ];


  constructor() { }

  
  //AGREGAR CLASE
  agregarClase(clase: any): Observable<Clase[]> {
    let clasesOrderIdDesc = Object.values(this.listaClases).sort
    (function (a, b) {if (a.id < b.id) return 1; if (a.id > b.id) return -1; return 0;})

    //obtengo el id mas grande y le sumo 1
    clase.id = clasesOrderIdDesc[0].id + 1;
    this.listaClases.unshift(clase);

    return of(this.listaClases).pipe (
      map((clases) => clases.filter(x => this.listaClases.includes(x))),
      catchError(() => {throw new Error("No se pudo agregar la clase...")})
    )
  }

  //ELIMINAR CLASE
  eliminarClase(id: number): Observable<Clase[]> {
    return of(this.listaClases).pipe (
      map((clases) => clases.splice(this.listaClases.findIndex(x => x.id == id), 1)),
      catchError(() => {throw new Error("No se pudo eliminar la clase...")})
    )
  }

  //EDITAR CLASE
  editarClase(clase: any): Observable<Clase[]> {
    this.listaClases.splice(this.listaClases.findIndex(x => x.id == clase.id), 1, clase);
    return of(this.listaClases).pipe (
      map((clases) => clases.filter(x => this.listaClases.includes(x))),
      catchError(() => {throw new Error("No se pudo editar la clase...")})
    )
  }

  //OBTENER CLASES
  obtenerClases(): Observable<Clase[]> {
    return of(this.listaClases).pipe (
      map((clases) => clases.filter(x => this.listaClases.includes(x))),
      catchError(() => {throw new Error("No se pudo obtener las clases...")})
    )
  }
}
