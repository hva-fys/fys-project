import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FlightStatusService {

  /** The progress of this flight in a range between 0 and 100 */
  public progress$ = new BehaviorSubject<number>(0);

  constructor() {
    setInterval(() => {
      if ( this.progress$.value < 100 ) {
        this.progress$.next( this.progress$.value + 10 );
      } else {
        this.progress$.next(0);
      }
    }, 1000);
  }

}
