import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { SubirArchivoService, ModalUploadService } from '../../services/service.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  usuario: Usuario;
  imgSubir: File;
  imgTemp: string;

  constructor(public _subirArchivo: SubirArchivoService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
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

  cargarImagen() {
    this._subirArchivo.subirArchivo(this.imgSubir, this._modalUploadService.tipo, this._modalUploadService.id).then(resp => {
      console.log(resp);
      this._modalUploadService.notificacion.emit(resp);
      this.cerrarModal();
    }).catch(err => {
      console.log(err);
    });
  }

  cerrarModal() {
    this.imgTemp = null;
    this.imgSubir = null;
    this._modalUploadService.ocultarModal();
  }
}
