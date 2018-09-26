import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
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
                      localStorage.setItem('id', resp.usuario._id);
                      localStorage.setItem('token', resp.token);
                      localStorage.setItem('usuario', JSON.stringify(resp.usuario));
                      this.token = resp.token;
                      this.usuario = resp.usuario;
                      // swal('Usuario creado', 'Loguearse con ' + usuario.email, 'success');
                      return true;
                    });
  }
}
