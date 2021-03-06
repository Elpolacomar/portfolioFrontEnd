import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  loginError: Boolean = false;
  form: FormGroup;

  constructor(

    private autenticacionService:AutenticacionService,
    private router: Router,
    private formBuilder:FormBuilder   
    
    ) {
      this.form=this.formBuilder.group(
      {
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]]
        /*deviceInfo:this.formBuilder.group({
          deviceId:["17867868768"],
          deviceType:["DEVICE_TYPE_ANDROID"],
          notificationToken:["67657575eececc34"]
        })*/
      }
    )
   }

  ngOnInit(): void {
  }

  onSubmit(event: Event) {
    event.preventDefault;

    this.autenticacionService.login(this.form.value).subscribe(
      (response: Boolean) => {
        if (response)
          this.router.navigate(['/portfolio']);
        else
          this.loginError = true;
      }
    )
  }

  get Email ()
  {
    return this.form.get('email');
  }

  get Password()
  {
    return this.form.get('password');
  }

  /*onEnviar(event:Event)
  {
    event.preventDefault;
    this.autenticacionService.IniciarSesion(this.form.value).subscribe(data=>{
      console.log("DATA:" + JSON.stringify(data));
      this.ruta.navigate(['/portfolios']);

    })
  }*/

}
