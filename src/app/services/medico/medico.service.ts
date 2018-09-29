import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarMedicos(desde: number = 0) {
    let url = URL_SERVICIOS + '/medico';

    return this.http.get(url);
  }

  buscarMedicos (termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino;
    // let headers = new HttpHeaders().set('Authorization', this.token);

    return this.http.get(url).map( (resp: any) => {
      return resp.medico;
    });
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    let headers = new HttpHeaders().set('Authorization', this._usuarioService.token);
    return this.http.delete(url, { headers: headers });
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';
    let headers = new HttpHeaders().set('Authorization', this._usuarioService.token);

    if ( medico._id ) {
      return this.http.put(url + '/' + medico._id, medico, { headers: headers }).map((resp: any) => {
        swal('Salio todo bien', 'Medico actualizado', 'success');
        return resp.medico;
      });
    } else {
      return this.http.post(url, medico, { headers: headers }).map((resp: any) => {
        swal('Salio todo bien', 'Medico Creado', 'success');
        return resp.medico;
      });
    }
    
  }

  obtenerMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url).map( (resp: any) => resp.medico);
  }
}
