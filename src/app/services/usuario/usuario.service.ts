import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router, public _subirArchivo: SubirArchivoService) {
    this.cargarStorage();
   }

  register( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
                    .map( (resp: any) => {
                      swal('Usuario creado', 'Loguearse con ' + usuario.email, 'success');
                      return resp.usuario;
                    });
  }
  estaLogueado() {
    return (this.token.length > 5 ? true : false );
  }
  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.token = token;
    this.usuario = usuario;
  }
  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false ) {
    let url = URL_SERVICIOS + '/login';

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post( url, usuario )
                    .map( (resp: any) => {
                      this.guardarStorage(resp.usuario._id, resp.token, resp.usuario);
                      // localStorage.setItem('id', resp.usuario._id);
                      // localStorage.setItem('token', resp.token);
                      // localStorage.setItem('usuario', JSON.stringify(resp.usuario));
                      // this.token = resp.token;
                      // this.usuario = resp.usuario;
                      swal('Usuario creado', 'Loguearse con ' + usuario.email, 'success');
                      return true;
                    });
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    let headers = new HttpHeaders().set('Authorization', this.token);
    return this.http.put(url, usuario, { headers: headers })
                    .map( (resp: any) => {
                      this.guardarStorage(resp.usuario._id, this.token, resp.usuario);

                      swal('Usuario actualizado', 'Se actualizaron los datos correctamente', 'success');
                      return true;
                    });
  }
  cambiarImagen( file: File, id: string ) {
    this._subirArchivo.subirArchivo(file, 'usuarios', id ).then( (resp: any) => {
      swal('Usuario actualizado', 'Se actualizo la imagen correctamente', 'success');
      this.usuario.img = resp.usuario.img;
      this.guardarStorage( id, this.token, this.usuario);
    }).catch( resp => {
      swal('Error al subir', 'Se produjo un error al cargar la imagen', 'error');
    });
  }
}
