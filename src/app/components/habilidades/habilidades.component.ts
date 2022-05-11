import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Habilidad } from 'src/app/data/habilidad';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { DatosPorfolioService } from 'src/app/servicios/datos-porfolio.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  habilidadList: Habilidad[] = [];
  isUserLogged: Boolean = false;
  habilidadForm: FormGroup;

  constructor(
    private datosPorfolioService: DatosPorfolioService,
    private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder
  ) { 
    this.habilidadForm = this.formBuilder.group({
      id: [''],
      tipo: ['', [Validators.required]],
      anio: ['', [Validators.required]],
      porcentaje: ['', [Validators.required]],      
    });
  }

  ngOnInit(): void {
    this.isUserLogged = this.autenticacionService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.datosPorfolioService.obtenerDatosHabilidad().subscribe(
      (data) => {
        this.habilidadList = data;
      }
    );
  }

  private clearForm() {
    this.habilidadForm.setValue({
      id: '',
      tipo: '',
      anio: '',
      porcentaje: ''      
    })
  }

  private loadForm(habilidad: Habilidad) {
    this.habilidadForm.setValue({
      id: habilidad.id,
      tipo: habilidad.tipo,
      anio: habilidad.anio,
      porcentaje: habilidad.porcentaje,     
    })
  }

  onSubmit() {
    let habilidad: Habilidad = this.habilidadForm.value;
    if (this.habilidadForm.get('id')?.value == '') {
      this.datosPorfolioService.guardarNuevaHabilidad(habilidad).subscribe(
        (newHabilidad: Habilidad) => {
          this.habilidadList.push(newHabilidad);
        }
      );
    } else {
      this.datosPorfolioService.modificarHabilidad(habilidad).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewHabilidad() {
    this.clearForm();
  }

  onEditHabilidad(index: number) {
    let habilidad: Habilidad = this.habilidadList[index];
    this.loadForm(habilidad);
  }

  onDeleteHabilidad(index: number) {
    let habilidad: Habilidad = this.habilidadList[index];
    if (confirm("¿Está seguro que desea borrar la habilidad seleccionada?")) {
      this.datosPorfolioService.borrarHabilidad(habilidad.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}
