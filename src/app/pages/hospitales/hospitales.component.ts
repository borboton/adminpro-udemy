import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html'
})
export class HospitalesComponent implements OnInit {
  cargando: boolean = false;
  hospitales: Hospital[] = [];
  total: number = 0;
  desde: number = 0;
  constructor(public _hospitalService: HospitalService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(resp => this.cargarHospitales());
  }
  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde).subscribe( (resp: any) => {
      console.log(resp);
      this.cargando = false;
      this.total = resp.total;
      this.hospitales = resp.hospitales;
    });
  }
  buscarHospital(termino: string) {
    if ( !termino || termino.length === 0 ) {
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHospitales(termino).subscribe( resp => this.hospitales = resp );
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }
  guardarHospital( hospital: Hospital ) {
    console.log(hospital);
    this._hospitalService.actualizarHospital(hospital).subscribe( (resp: any) => {
    });
  }
  borrarHospital( hospital: Hospital) {
    // console.log(usuario);
    swal({
      title: 'Esta seguro?',
      text: 'desea borrar a ' + hospital.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {


        this._hospitalService.borrarHospital(hospital._id).subscribe( (resp: any) => {
          this.cargarHospitales();
          swal("Hospital eliminado correctamente!", {
            icon: "success",
          });
        });
      } else {
        // swal("Your imaginary file is safe!");
      }
    });
  }
  crearHospital() {
    console.log('crear');
    swal({
      text: 'Ingrese el nombre del hospital.',
      content: "input",
      button: {
        text: "Crear!",
        closeModal: true,
      },
    })
    .then(nombre => {
      if(!nombre) {
        return;
      }
      let hospital = new Hospital(nombre);
      this._hospitalService.crearHospital(hospital).subscribe( (resp) => {
        this.cargarHospitales();
        swal({
          title: "Hospital creado correctamente!",
          text: nombre,
        });
      });
      
    })
    .catch(err => {
      if (err) {
        swal("Oh noes!", "No se pudo crear el hospital!", "error");
      } else {
        swal.stopLoading();
        swal.close();
      }
    });
  }
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if ( desde >= this.total ) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
  }
}
