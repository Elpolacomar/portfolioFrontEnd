import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../data/education';
import { Experiencia } from '../data/experiencia';
import { Proyecto } from '../data/proyecto';
import { Habilidad } from '../data/habilidad';
import { MenuNav } from '../data/menu-nav';
import { config } from '../data/config/Config';

@Injectable({
  providedIn: 'root'
})
export class DatosPorfolioService {

  constructor(private http: HttpClient) { }

/*Datos Educación*/
  obtenerDatosEducacion(): Observable<Education[]> {
    return this.http.get<any>(config.baseUrl + "educacion");
  }

  guardarNuevaEducacion(educacion:Education): Observable<Education> {
    return this.http.post<any>(config.baseUrl + "educacion/create", educacion);
  }

  modificarEducacion(educacion: Education): Observable<any> {
    return this.http.put<any>(config.baseUrl + "educacion/update", educacion);
  }

  borrarEducacion(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "educacion/" + id);
  }
/*Datos Experiencia*/
  obtenerDatosExperiencia(): Observable<Experiencia[]> {
    return this.http.get<any>(config.baseUrl + "experiencia");
  }

  guardarNuevaExperiencia(experiencia:Experiencia): Observable<Experiencia> {
    return this.http.post<any>(config.baseUrl + "experiencia/create", experiencia);
  }

  modificarExperiencia(experiencia: Experiencia): Observable<any> {
    return this.http.put<any>(config.baseUrl + "experiencia/update", experiencia);
  }

  borrarExperiencia(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "experiencia/" + id);
  }
/*Datos Proyecto*/
  obtenerDatosProyecto(): Observable<Proyecto[]> {
    return this.http.get<any>(config.baseUrl + "proyecto");
  }

  guardarNuevoProyecto(proyecto:Proyecto): Observable<Proyecto> {
    return this.http.post<any>(config.baseUrl + "proyecto/create", proyecto);
  }

  modificarProyecto(proyecto: Proyecto): Observable<any> {
    return this.http.put<any>(config.baseUrl + "proyecto/update", proyecto);
  }

  borrarProyecto(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "proyecto/" + id);
  }

/*Datos Habilidad*/
obtenerDatosHabilidad(): Observable<Habilidad[]> {
  return this.http.get<any>(config.baseUrl + "habilidad");
}

guardarNuevaHabilidad(habilidad:Habilidad): Observable<Habilidad> {
  return this.http.post<any>(config.baseUrl + "habilidad/create", habilidad);
}

modificarHabilidad(habilidad: Habilidad): Observable<any> {
  return this.http.put<any>(config.baseUrl + "habilidad/update", habilidad);
}

borrarHabilidad(id: number): Observable<any> {
  return this.http.delete<any>(config.baseUrl + "habilidad/" + id);
}

/*Datos MenuNav*/
obtenerDatosMenuNav(): Observable<MenuNav[]> {
  return this.http.get<any>(config.baseUrl + "menu");
}

guardarNuevaMenuNav(menu:MenuNav): Observable<MenuNav> {
  return this.http.post<any>(config.baseUrl + "menu/create", menu);
}

modificarMenuNav(menu: MenuNav): Observable<any> {
  return this.http.put<any>(config.baseUrl + "menu/update", menu);
}

borrarMenuNav(id: number): Observable<any> {
  return this.http.delete<any>(config.baseUrl + "menu/" + id);
}

}
