import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
  
export class CounterComponent implements OnInit, OnDestroy {

  seconde: number = 0;
  subscription: Subscription = new Subscription();

  constructor() { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    // Observable - Api rxjs - affectation
    const counter$ = interval(1000);
    const counter2$ = interval(2000);

    // Observable - Api rxjs - abonnement
    this.subscription.add(counter$.subscribe(
      // Ok
      (ok) => { this.seconde = ok },

      // Erreur
      (error) => { console.log('Value : ' + error); },

      // fin
      () => { console.log('Fin'); }
    ));

    this.subscription.add(counter2$.pipe(take(5)).subscribe(
      // Ok
      (ok) => { console.log('Value 2 : ' + ok); },

      // Erreur
      (error) => { console.log('Value 2 : ' + error); },

      // fin
      () => { console.log('Fin - 2'); }
    ));
  }
}
