import * as express from 'express';
import * as SocketIO from 'socket.io';
import * as fys from '../../../shared/fys-types';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import * as Http from 'http';
import { guid } from '../utils';
import { isEmpty } from 'lodash';

export class TicTacToe {

    private socket: SocketIO.Namespace;

    /** Represents game state for multiple clients, where key is room id and number array the game state */
    private gameState: Map<string, number[][]> = new Map();

    /** 
     * Represents the state of the sockets room, where the key is the room id and the string array contains client ids
     */
    private roomsState: Map<string, string[]> = new Map();

    private possibleWins: number[][];

    /** Represents the rooms stream */
    private rooms$ = new BehaviorSubject<fys.TicTacToe.IRoom[]>([
        { name: 'room 1', created_on: new Date().toISOString(), id: guid(), joinable: true }
    ]);

    constructor(socket: SocketIO.Server) {

        this.socket = socket.of('/tic-tac-toe');

        this.setupListeners();

        this.possibleWins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    }

    private setupListeners(): void {

        this.socket.on('connect', socket => {
            this.on<string>(socket, 'add-room')
                .do( room => console.log('client adding a room', room))
                .subscribe( room => this.addRoom(room));

            
            this.on<void>(socket, 'get-rooms')
                .do( () => console.log('client requested the rooms') )
                .subscribe(() => this.socket.emit('rooms', this.rooms$.value) );
            
            this.rooms$.subscribe( rooms => this.socket.emit('rooms', rooms));

            socket.on('disconnect', () => {

                console.log('disconnecting', socket.rooms);

                this.removeClientFromRooms(socket.client.id);

                this.updateRoomsJoinability();
            });

            this.on<string>(socket, 'leave-room')
                .do( roomId => console.log('client is leaving room', roomId))
                .subscribe(roomId => { 
                    socket.leave(roomId);

                    this.removeClientFromRoom(roomId, socket.client.id);

                    this.updateRoomsJoinability();
                 });

            this.on<string>(socket, 'join-room')
                .do( roomId => console.log('client is attemping to join room', roomId))
                .filter( roomIdentifier => {
                    const alreadyJoined = Object.keys(socket.rooms).find( roomId => roomId === roomIdentifier);

                    if ( alreadyJoined ) {
                        console.log('client already joined this room', roomIdentifier);
                    }

                    return !alreadyJoined;
                })
                .subscribe( roomId => {
                    socket.join(roomId, (err: any) => {
                        if ( err ) {
                            throw new Error('error joining room' + roomId);
                        }
                        
                        const roomState = this.roomsState.get(roomId) || [];

                        const clientId = socket.client.id;

                        if ( isEmpty(roomState) ) {
                            this.roomsState.set(roomId, [ clientId ]);
                        } else {
                            this.roomsState.set(roomId, [ ...roomState, clientId ]);
                        }

                        this.updateRoomsJoinability();
                    });

                    // const win: fys.TicTacToe.EGameStatus = 0;

                    // socket.emit('game-stat', { status: 0 });
                });
                        
        });
    }

    private determineWin(roomId: string ) {
        /** To determine wins,
       * we want our combinations arrays to always be sorted properly
       * We will do this in a copy to ensure we respect the original objects immutability
       * */
        // let sortedCombinations = { ...this.gameState.get(roomId) };
        let sortedCombinations = { ...[] };

        for (let key in sortedCombinations) {
            sortedCombinations[key].sort();

            const winner = this.possibleWins.some(possibleWin => {
                let correctPositions = sortedCombinations[key]
                    .map( (combo: any) => ~ possibleWin.find( possibleWinCombos => possibleWinCombos === combo ) )
                    .filter(Boolean);

                /** If a player has 3 positions correct of the possible combinations they won! */
                let positionMatch = correctPositions.length === 3;

                return positionMatch;
            });
        }
    }

    /** Adds a room to our stream */
    private addRoom(roomName: string) {
        const room: fys.TicTacToe.IRoom = {
            name: roomName, 
            created_on: new Date().toISOString(),
            id: guid(),
            joinable: true
        };

        const rooms = [...this.rooms$.value, room];

        this.rooms$.next(rooms);
    }

    /** Locks a room by changing its joinable flag depending on how many players there are in each room */
    private updateRoomsJoinability() {
        const rooms = [... this.rooms$.value]
        for (const [roomId, value] of this.roomsState.entries()) {
            const roomIndex = rooms.findIndex(room => room.id === roomId);
            if ( ~ roomIndex  && value.length === 2 ) {
                console.log(`[updateRoomsJoinability] ${roomId} is going to be locked`);
                rooms[roomIndex].joinable = false;
                this.rooms$.next(rooms);
            } else if (value.length < 2 ) {
                const roomIndex = rooms.findIndex(room => room.id === roomId);
                if ( ~ roomIndex && rooms[roomIndex].joinable == false ) {
                    console.log(`[updateRoomsJoinability] ${roomId} is going to be unlocked`);
                    rooms[roomIndex].joinable = true;
                    this.rooms$.next(rooms);
                }
            }
        }
    }

    private removeClientFromRoom(roomId: string, clientIdentefier: string ) {
        console.log(`[removeClientFromRoom] removing client ${clientIdentefier} from ${roomId} `);
        if ( this.roomsState.has(roomId) ) {
            const clientIndex = this.roomsState.get(roomId).findIndex(clientId => {
                const matchingClient = clientId === clientIdentefier;

                return matchingClient;
            });

            this.roomsState.get(roomId).splice(clientIndex, 1);
        }
    }

    /** Removes a client from all rooms */
    private removeClientFromRooms( clientIdentefier: string ) {
        for (const [roomId, value] of this.roomsState.entries()) { 
            const index = value.findIndex( clientId => clientIdentefier === clientId );

            if ( ~ index ) {
                const clientIds = this.roomsState.get(roomId);

                clientIds.splice(index, 1);

                this.roomsState.set(roomId, clientIds);

                console.log(`[removeClientFromRooms] removing client ${clientIdentefier} from ${roomId}`);
            }
        }
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