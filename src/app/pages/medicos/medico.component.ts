import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, MedicoService, ModalUploadService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public _hospitalService: HospitalService,
              public _medicoService: MedicoService,
              public _mus: ModalUploadService,
              public router: Router,
              public activatedRoute: ActivatedRoute) {
                activatedRoute.params.subscribe( params => {
                  let id = params['id'];
                  if ( id !== 'nuevo') {
                    this.cargarMedico(id);
                  }
                });
               }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe( (resp: any) => {
      this.hospitales = resp.hospitales;
    });
    this._mus.notificacion.subscribe(resp => {
      this.medico.img = resp.medico.img;
    });
  }
  cargarMedico(id: string) {
    this._medicoService.obtenerMedico(id).subscribe(medico => {
      this.medico = medico;
      this.cambioHospital(medico.hospital);
    });
  }
  guardarMedico(f: NgForm) {
    console.log(f);
    this._medicoService.guardarMedico(this.medico).subscribe((medico: Medico) => {
      this.router.navigate(['/medico', medico._id]);
    });
    // f.valid
    // f.value
  }
  cambioHospital(id: string) {
    if (!id || id.length === 0 ) {
      this.hospital = null;
    }
    this._hospitalService.obtenerHospital(id).subscribe( hospital => this.hospital = hospital );
  }
  cambiarFoto() {
    this._mus.mostrarModal('medicos', this.medico._id);
  }
}
