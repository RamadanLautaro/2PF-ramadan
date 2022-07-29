import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Alumno } from '../../../../models/alumno.model';
import { AlumnoService } from 'src/app/services/alumno.service';


@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit, OnDestroy {
  
  error: boolean = false;
  mensajeError: string = '';
  subscription: Subscription = new Subscription();
  listaAlumnos: Alumno[] = [];
  dataSource = this.listaAlumnos;
  displayedColumns: string[] = ['legajo', 'nombre-apellido', 'edad', 'email', 'aprobado', 'acciones'];


  constructor(private alumnoService: AlumnoService) {}

  ngOnInit(): void {
    this.obtenerAlumnos();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  //FORMULARIO ALUMNO: AGREGAR
  formularioAgregarAlumno = new FormGroup({
    legajo: new FormControl(null, [Validators.required]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    edad: new FormControl(null, [Validators.required, Validators.max(110)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    aprobado: new FormControl(false),
  })

   //FORMULARIO ALUMNO: EDITAR
   formularioEditarAlumno = new FormGroup({
    index: new FormControl(0, [Validators.required]),
    legajo: new FormControl(0, [Validators.required]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    edad: new FormControl(0, [Validators.required, Validators.max(110)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    aprobado: new FormControl(false),
  })

  //EDITAR ALUMNO: CARGAR FORMULARIO
  cargarFormularioEditarAlumno(index: any, alumno: Alumno){
    this.formularioEditarAlumno.controls.index.setValue(index);
    this.formularioEditarAlumno.controls.legajo.setValue(alumno.legajo);
    this.formularioEditarAlumno.controls.nombre.setValue(alumno.nombre);
    this.formularioEditarAlumno.controls.apellido.setValue(alumno.apellido);
    this.formularioEditarAlumno.controls.edad.setValue(alumno.edad);
    this.formularioEditarAlumno.controls.email.setValue(alumno.email);
    this.formularioEditarAlumno.controls.aprobado.setValue(alumno.aprobado);
  }
  

  //OBTENER ALUMNOS
  obtenerAlumnos() {
    this.alumnoService.obtenerAlumnos()
    .then((alumnos) => {
      this.dataSource = alumnos;
      this.error = false;
    })
    .catch((mensajeError) => {
      this.mensajeError = mensajeError;
      this.error = true;
    })
  }

  //AGREGAR ALUMNO
  agregarAlumno() {
    this.subscription.add(
      this.alumnoService.agregarAlumno(this.formularioAgregarAlumno.value).subscribe(
        {
          next: (alumnos) => {
            this.dataSource = this.dataSource.filter(x => alumnos.includes(x));
            this.error = false;
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          }
        }
      )
    )
  }

  //ELIMINAR ALUMNO
  eliminarAlumno(index: any) {
    this.subscription.add(
      this.alumnoService.eliminarAlumno(index).subscribe(
        {
          next: (alumnoEliminado) => {
            this.dataSource = this.dataSource.filter(x => !alumnoEliminado.includes(x));;
            this.error = false;
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          }
        }
      )
    )
  }

  //EDITAR ALUMNO
  editarAlumno(index: any) {
    this.subscription.add(
      this.alumnoService.editarAlumno(index, this.formularioEditarAlumno.value).subscribe(
        {
          next: (alumnos) => {
            console.log(alumnos)
            this.dataSource = this.dataSource.filter(x => alumnos.includes(x));
            this.error = false;
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          }
        }
      )
    )
  }

  //FILTRAR ALUMNOS
  filtrarAlumnos(aprobados: boolean) {
    this.subscription.add(
      this.alumnoService.filtrarAlumnos(aprobados).subscribe(
        {
          next: (alumnos) => {
            this.dataSource = alumnos;
            this.error = false;
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          }
        }
      )
    )
  }

}