import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imgSubir: File;
  imgTemp: string;
  constructor(public _usuarioService: UsuarioService
              ) {
    this.usuario = _usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar( usuario: Usuario ) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this._usuarioService.actualizarUsuario(this.usuario)
                        .subscribe(resp => {
      console.log(resp);
    });
  }

  seleccionImagen( archivo: File) {
    if ( !archivo ) {
      this.imgSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Formato no valido', 'Solo estan permitidas imagenes', 'error');
      this.imgSubir = null;
      return;
    }
    this.imgSubir = archivo;

    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imgTemp = reader.result;
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imgSubir, this.usuario._id);
  }
}
