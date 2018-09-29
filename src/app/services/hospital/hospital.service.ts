import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarHospitales(desde: number = 0) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    // let headers = new HttpHeaders().set('Authorization', this.token);

    return this.http.get(url);
  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).map( (resp: any) => resp.hospital);
  }


  buscarHospitales( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;
    // let headers = new HttpHeaders().set('Authorization', this.token);

    return this.http.get(url, ).map( (resp: any) => {
      return resp.hospital;
    });
  }
  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    let headers = new HttpHeaders().set('Authorization', this._usuarioService.token);

    return this.http.put(url, hospital, { headers})
    .map( (resp: any) => {
      swal('Hospital actualizado', 'Se actualizaron los datos correctamente', 'success');
      return true;
    });
  }
  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    let headers = new HttpHeaders().set('Authorization', this._usuarioService.token);
    return this.http.delete(url, { headers: headers });
  }

  crearHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital';
    let headers = new HttpHeaders().set('Authorization', this._usuarioService.token);
    return this.http.post(url, hospital, { headers: headers });
  }
}
