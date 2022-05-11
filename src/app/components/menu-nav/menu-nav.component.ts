import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuNav } from 'src/app/data/menu-nav';
import { DatosPorfolioService } from 'src/app/servicios/datos-porfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {

  menuList: MenuNav[] = [];
  isUserLogged: Boolean = false;
  menuForm: FormGroup;

  constructor(
    private datosPorfolioService: DatosPorfolioService,
    private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder
  ) { 
    this.menuForm = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]], 
      ruta_image: ['', [Validators.required]],     
    });
  }

  ngOnInit(): void {
    this.isUserLogged = this.autenticacionService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.datosPorfolioService.obtenerDatosMenuNav().subscribe(
      (data) => {
        this.menuList = data;
      }
    );
  }

  private loadForm(menu: MenuNav) {
    this.menuForm.setValue({
      id: menu.id,
      nombre: menu.nombre,
      apellido: menu.apellido, 
      ubicacion: menu.ubicacion,      
      descripcion: menu.descripcion, 
      ruta_image: menu.ruta_image    
    })
  }

  onSubmit() {
    let menu: MenuNav = this.menuForm.value;
    if (this.menuForm.get('id')?.value == '') {
      this.datosPorfolioService.guardarNuevaMenuNav(menu).subscribe(
        (newMenuNav: MenuNav) => {
          this.menuList.push(newMenuNav);
        }
      );
    } else {
      this.datosPorfolioService.modificarMenuNav(menu).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onEditMenuNav(index: number) {
    let menu: MenuNav = this.menuList[index];
    this.loadForm(menu);
  }
  
  onLogOut():void{
    this.autenticacionService.logout() ;   
      window.location.reload();    
  };

}
