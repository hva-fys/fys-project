import * as express from 'express';
import * as socketio from 'socket.io';
import * as fys from '../../../shared/fys-types';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import * as Http from 'http';
import { guid } from '../utils';

export class TicTacToe {

    private socket: SocketIO.Namespace;

    /** Represents the rooms stream */
    private rooms$ = new BehaviorSubject<fys.TicTacToe.IRoom[]>([
        { name: 'room 1', created_on: new Date().toISOString(), id: guid() }
    ]);

    constructor() {
        this.setupSocket();
    }

    public setupSocket(): void {
        const app = express();
        
        const http = new Http.Server(app);
        
        this.socket = socketio(http).of('/tic-tac-toe');
        
        http.listen(3000, '0.0.0.0', () => console.log('listening on *:3000'));

        this.socket.on('connect', socket => {
            this.on<string>(socket, 'add-room')
                .do( room => console.log('client adding a room', room))
                .subscribe( room => this.addRoom(room));

            
            this.on<void>(socket, 'get-rooms')
                .do( val => console.log('client requested the rooms', val))
                .subscribe(() => this.socket.emit('rooms', this.rooms$.value) );
            
            this.rooms$.subscribe( rooms => this.socket.emit('rooms', rooms));
        });
    }

    /** Adds a room to our stream */
    private addRoom(roomName: string) {
        const room: fys.TicTacToe.IRoom = {
            name: roomName, 
            created_on: new Date().toISOString(),
            id: guid() 
        }

        const rooms = [...this.rooms$.value, room];

        this.rooms$.next(rooms);
    }

    /** Turns a socket.io callback into an rxjs stream */
    private on<T>(socket: SocketIO.Socket, event: fys.TicTacToe.TSocketEvent): Observable<T> {

        const observable = new Observable<T>(observer => {
            socket.on(event, (data: T) => {
                observer.next(data);
            });
        });

        return observable;
    }

}