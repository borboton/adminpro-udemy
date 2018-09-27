import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../services/service.index';
declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
usuarios: Usuario[] = [];
desde: number = 0;
total: number = 0;
cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(resp => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.total = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
      // console.log(resp);
    });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if ( desde >= this.total ){
      return;
    }
    if(desde < 0){
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if ( !termino || termino.length === 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino).subscribe( (usuarios: Usuario[]) => {
      this.cargando = false;
      // console.log(usuarios);
      this.total = usuarios.length;
      this.usuarios = usuarios;
      this.desde = 0;
    });
  }

  borrarUsuario( usuario: Usuario) {
    console.log(usuario);
    swal({
      title: 'Esta seguro?',
      text: 'desea borrar a ' + usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {


        this._usuarioService.borrarUsuario(usuario._id).subscribe( (resp: any) => {
          this.cargarUsuarios();
          swal("Usuario eliminado correctamente!", {
            icon: "success",
          });
        });
      } else {
        // swal("Your imaginary file is safe!");
      }
    });
  }

  guardarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario(usuario).subscribe( (resp: any) => {
      // this.cargarUsuarios();
    } );
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }
}
