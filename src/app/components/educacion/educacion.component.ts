import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Education } from 'src/app/data/education';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { DatosPorfolioService } from 'src/app/servicios/datos-porfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  educacionList: Education[] = [];
  isUserLogged: Boolean = false;
  educationForm: FormGroup;

  constructor(
    private datosPorfolioService: DatosPorfolioService,
    private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder) {      
      this.educationForm = this.formBuilder.group({
          id: [''],
          school: ['', [Validators.required]],
          title: ['', [Validators.required]],
          career: ['', [Validators.required]],
          score: ['', [Validators.required]],
          start: ['', [Validators.required]],
          end: ['', [Validators.required]],
          description: ['', [Validators.required]],
        });
   }

   ngOnInit(): void {
    this.isUserLogged = this.autenticacionService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.datosPorfolioService.obtenerDatosEducacion().subscribe(
      (data) => {
        this.educacionList = data;
      }
    );
  }

  private clearForm() {
    this.educationForm.setValue({
      id: '',
      school: '',
      title: '',
      career: 0,
      score: 0,
      start: 0,
      end: '',
      description: ''
    })
  }

  private loadForm(educacion: Education) {
    this.educationForm.setValue({
      id: educacion.id,
      school: educacion.school,
      title: educacion.title,
      career: educacion.career,
      score: educacion.score,
      start: educacion.start,
      end: educacion.end,
      description: educacion.description
    })
  }

  onSubmit() {
    let educacion: Education = this.educationForm.value;
    if (this.educationForm.get('id')?.value == '') {
      this.datosPorfolioService.guardarNuevaEducacion(educacion).subscribe(
        (newEducation: Education) => {
          this.educacionList.push(newEducation);
        }
      );
    } else {
      this.datosPorfolioService.modificarEducacion(educacion).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewEducation() {
    this.clearForm();
  }

  onEditEducation(index: number) {
    let educacion: Education = this.educacionList[index];
    this.loadForm(educacion);
  }

  onDeleteEducation(index: number) {
    let educacion: Education = this.educacionList[index];
    if (confirm("¿Está seguro que desea borrar la educación seleccionada?")) {
      this.datosPorfolioService.borrarEducacion(educacion.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}