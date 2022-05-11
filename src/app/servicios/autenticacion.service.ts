import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { config } from '../data/config/Config';
import { DatosLogin } from '../data/datos-login';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {  

constructor(private http: HttpClient) { } 

  public login(credentials:DatosLogin) : Observable<Boolean> {
    return this.http.post<Boolean>(config.baseUrl + "iniciar-sesion", credentials).pipe(
      tap((response: Boolean) => {
        if (response)
          sessionStorage.setItem("user", "famendola");
      })
    );
  }


  public logout() {
    sessionStorage.removeItem("user");
  }

  public isUserLogged():boolean {
    return sessionStorage.getItem("user") !== null;
  }
}

