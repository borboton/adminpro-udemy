import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/Operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.contarTres()
    .subscribe( resp => {
      console.log('Sub: ' + resp);
    },
    err => {
      console.log('Error en Sub:', err);
    },
    () => {
      console.log('Sub finalizado');
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  contarTres(): Observable<any> {
    return new Observable( observer => {
      let contador = 0;
      setInterval(() => {
        contador += 1;
        const salida = {
            valor: contador
          };
        observer.next(salida);
        // if (contador === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }
      }, 1000);
    }).pipe(
      map( (resp: any) => resp.valor),
      filter( (resp, index) => {
        if ( (resp % 2) === 1 ) {
          return true;

        } else {
          return false;

        }
      })
    );
  }

}
