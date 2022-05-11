import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experiencia } from 'src/app/data/experiencia';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { DatosPorfolioService } from 'src/app/servicios/datos-porfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experienciaList: Experiencia[] = [];
  isUserLogged: Boolean = false;
  experienciaForm: FormGroup;

  constructor(
    private datosPorfolioService: DatosPorfolioService,
    private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder) {
      this.experienciaForm = this.formBuilder.group({
        id: [''],
        area: ['', [Validators.required]],
        empresa: ['', [Validators.required]],
        tiempo: ['', [Validators.required]],
        lugarTrabajo: ['', [Validators.required]],
      });
     }

  ngOnInit(): void {
    this.isUserLogged = this.autenticacionService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.datosPorfolioService.obtenerDatosExperiencia().subscribe(
      (data) => {
        this.experienciaList = data;
      }
    );
  }

  private clearForm() {
    this.experienciaForm.setValue({
      id: '',
      area: '',
      empresa: '',
      tiempo: '',
      lugarTrabajo: ''
    })
  }

  private loadForm(experiencia: Experiencia) {
    this.experienciaForm.setValue({
      id: experiencia.id,
      area: experiencia.area,
      empresa: experiencia.empresa,
      tiempo: experiencia.tiempo,
      lugarTrabajo: experiencia.lugarTrabajo
    })
  }

  onSubmit() {
    let experiencia: Experiencia = this.experienciaForm.value;
    if (this.experienciaForm.get('id')?.value == '') {
      this.datosPorfolioService.guardarNuevaExperiencia(experiencia).subscribe(
        (newExperiencia: Experiencia) => {
          this.experienciaList.push(newExperiencia);
        }
      );
    } else {
      this.datosPorfolioService.modificarExperiencia(experiencia).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewExperiencia() {
    this.clearForm();
  }

  onEditExperiencia(index: number) {
    let experiencia: Experiencia = this.experienciaList[index];
    this.loadForm(experiencia);
  }

  onDeleteExperiencia(index: number) {
    let experiencia: Experiencia = this.experienciaList[index];
    if (confirm("¿Está seguro que desea borrar la experiencia seleccionada?")) {
      this.datosPorfolioService.borrarExperiencia(experiencia.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}
