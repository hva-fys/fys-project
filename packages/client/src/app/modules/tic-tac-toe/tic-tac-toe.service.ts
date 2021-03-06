import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as fys from 'fys';
import { share, map, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

// environment.
const SOCKET_END_POINT = `${environment.END_POINT_URL}/tic-tac-toe`;

interface TicTacToeServiceState {
  rooms$: Observable<fys.TicTacToe.IRoom[]>;
  gameStatus$: Observable<fys.TicTacToe.IGameState>;
  endGame$: Observable<fys.TicTacToe.IEndGame>;
  restartGame$: Observable<void>;
}

@Injectable()
export class TicTacToeService {

  /** Socket instance */
  private socket: SocketIOClient.Socket;

  public state: TicTacToeServiceState = {
    rooms$: new Observable(),
    gameStatus$: new Observable(),
    endGame$: new Observable(),
    restartGame$: new Observable()
  };

  constructor() {
    this.socket = io(SOCKET_END_POINT).connect();

  }

  public makeMove( moveIndex: number ) {
    this.socket.emit('make-move', moveIndex);
  }

  public joinRoom( roomId: string ): Observable<fys.TicTacToe.TRole> {
    this.socket.emit('join-room', roomId);

    this.state.gameStatus$ = this.on<fys.TicTacToe.IGameState>('game-stat');

    this.state.endGame$ = this.on<fys.TicTacToe.IEndGame>('end-game');

    this.state.restartGame$ = this.on<void>('restart-game');

    const stream$ = this.on<fys.TicTacToe.TRole>('start-game');

    return stream$;
  }

  public leaveRoom( roomId: string ) {
    this.socket.emit('leave-room', roomId);
  }

  public addRoom(roomName: string ) {
    this.socket.emit('add-room', roomName);
  }

  public getRooms() {
    this.socket.emit('get-rooms');

    this.state.rooms$ = this.on<fys.TicTacToe.IRoom[]>('rooms');
  }

  /** Turns a socket.io callback into an rxjs stream */
  private on<T>(event: fys.TicTacToe.TSocketEvent): Observable<T> {

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
