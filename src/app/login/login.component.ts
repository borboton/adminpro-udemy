import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;

  constructor(public router: Router,
              public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 0) {
      this.recuerdame = true;
    }
  }
  ingresar(form: NgForm) {
    if (form.invalid) {
      return;
    }

    let usuario = new Usuario('', form.value.email, form.value.password);
    this._usuarioService.login(usuario, form.value.recuerdame).subscribe( resp => this.router.navigate(['/dashboard']));
    console.log(form);
  // this.router.navigate(['/dashboard']);
  }
}
