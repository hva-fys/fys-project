import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {environment} from '../../environments/environment';
import * as io from 'socket.io-client';
import {share} from 'rxjs/operators';
import * as fys from '../../../../shared/fys-types';
import {Observable} from 'rxjs/Observable';
import { FlightInformation } from 'fys';
import { HttpClient } from '@angular/common/http';

const SOCKET_END_POINT = `${environment.END_POINT_URL}/flight-status`;

interface FlightStatusServiceState {
  plane$: Observable<fys.FlightInformation.IPlane>;
}

@Injectable()
export class FlightStatusService {

  /** The progress of this flight in a range between 0 and 100 */
  public progress$ = new BehaviorSubject<number>(0);

  /** Socket instance */
  private socket: SocketIOClient.Socket;

  public state: FlightStatusServiceState = {
    plane$: new Observable()
  };

  constructor( private http: HttpClient ) {
    this.socket = io(SOCKET_END_POINT).connect();

    setInterval(() => {
      if ( this.progress$.value < 100 ) {
        this.progress$.next( this.progress$.value + 10 );
      } else {
        this.progress$.next(0);
      }
    }, 1000);

    this.state.plane$ = this.on<fys.FlightInformation.IPlane>('status');
  }

  public getCurrentFlight(): Observable<FlightInformation.IFlight> {
    const url = `http://${environment.END_POINT_URL}/api/flight-info`;

    return this.http.get<FlightInformation.IFlight>(url);
  }

  /** Turns a socket.io callback into an rxjs stream */
  private on<T>(event: fys.FlightInformation.TSocketEvent): Observable<T> {

    const observable = new Observable<T>(observer => {
      const listener = (data) => {
        observer.next(data);
      };
      this.socket.on(event, listener);
      return () => this.socket.removeListener(event, listener);
    });

    return observable.pipe(share());
  }
}
