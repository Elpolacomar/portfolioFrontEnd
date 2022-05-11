import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/data/proyecto';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { DatosPorfolioService } from 'src/app/servicios/datos-porfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectoList: Proyecto[] = [];
  isUserLogged: Boolean = false;
  proyectoForm: FormGroup;

  constructor(
    private datosPorfolioService: DatosPorfolioService,
    private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder ) {
      this.proyectoForm = this.formBuilder.group({
        id: [''],
        nombre: ['', [Validators.required]],
        descripcion: ['', [Validators.required]]        
      });
     }

  ngOnInit(): void {
    this.isUserLogged = this.autenticacionService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.datosPorfolioService.obtenerDatosProyecto().subscribe(
      (data) => {
        this.proyectoList = data;
      }
    );
  }

  private clearForm() {
    this.proyectoForm.setValue({
      id: '',
      nombre: '',
      descripcion: ''      
    })
  }

  private loadForm(proyecto: Proyecto) {
    this.proyectoForm.setValue({
      id: proyecto.id,
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion      
    })
  }

  onSubmit() {
    let proyecto: Proyecto = this.proyectoForm.value;
    if (this.proyectoForm.get('id')?.value == '') {
      this.datosPorfolioService.guardarNuevoProyecto(proyecto).subscribe(
        (newProyecto: Proyecto) => {
          this.proyectoList.push(newProyecto);
        }
      );
    } else {
      this.datosPorfolioService.modificarProyecto(proyecto).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewProyecto() {
    this.clearForm();
  }

  onEditProyecto(index: number) {
    let proyecto: Proyecto = this.proyectoList[index];
    this.loadForm(proyecto);
  }

  onDeleteProyecto(index: number) {
    let proyecto: Proyecto = this.proyectoList[index];
    if (confirm("¿Está seguro que desea borrar el proyecto seleccionada?")) {
      this.datosPorfolioService.borrarProyecto(proyecto.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}
