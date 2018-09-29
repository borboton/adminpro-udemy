import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';
declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  cargando: boolean = false;
  desde: number = 0;
  medicos: Medico[] = [];
  total: number = 0;
  constructor(private _medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarMedicos( termino: string) {
    if ( !termino || termino.length === 0 ) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedicos(termino).subscribe((medicos: any) => this.medicos = medicos);
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos(this.desde).subscribe( (resp: any) => {
      this.medicos = resp.medicos;
      this.total = resp.total;
    });
  }

  borrarMedico( medico: Medico) {
    console.log(medico);
    swal({
      title: 'Esta seguro?',
      text: 'desea borrar a ' + medico.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {


        this._medicoService.borrarMedico(medico._id).subscribe( (resp: any) => {
          this.cargarMedicos();
          swal("Medico eliminado correctamente!", {
            icon: "success",
          });
        });
      } else {
        // swal("Your imaginary file is safe!");
      }
    });
  }
}
