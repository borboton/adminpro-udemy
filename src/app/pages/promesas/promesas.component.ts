import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then( () => {
      console.log('termino');
    }).catch(err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let contador = 0;
      let interval = setInterval(() => {
        contador += 1;
        if (contador === 3) {
          clearInterval(interval);
          resolve(true);
        }
      }, 1000);
    });
  }

}
