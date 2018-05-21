import * as express from 'express';
import * as SocketIO from 'socket.io';
import * as fys from '../../../shared/fys-types';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import * as Http from 'http';
import { guid } from '../utils';
import { isEmpty, noop } from 'lodash';
import _ = require('lodash');


interface IGamesState {
    [roomId: string]: BehaviorSubject<fys.TicTacToe.IGameState>;
}

interface IWinnerDetermination { 
    won: boolean;
    drawn: boolean;
    player?: fys.TicTacToe.TRole 
}

export class TicTacToe {

    private socket: SocketIO.Namespace;

    /** Represents game state for multiple clients, where key is room id and the value the game state */
    private gameState: IGamesState = {};

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

                        // When two players have connected, we will start the game
                        //
                        if ( this.roomsState.get(roomId).length === 2 ) {
                            this.startGame( roomId );
                        }
                    });

                    // const win: fys.TicTacToe.EGameStatus = 0;

                    // socket.emit('game-stat', { status: 0 });
                });
                        
        });
    }

    /** Starts a game */
    private startGame( roomId: string ) {        
        if ( !this.gameState[roomId] ) {
            console.log('[start:game] starting game...');

            const gameState: fys.TicTacToe.IGameState = {
                moves: {
                    x: [],
                    o: []
                },
                turn: "x",
                playable: false,
                score: {
                    x: 0,
                    o: 0
                }
            };

            this.gameState[roomId] = new BehaviorSubject(gameState);

            const xClientId: string = this.roomsState.get(roomId)[0];

            const oClientId: string = this.roomsState.get(roomId)[1];
            
            /** The x Client */
            const xClient: SocketIO.Socket = this.socket.in(roomId).connected[`/tic-tac-toe#${xClientId}`];

            /** The O client */
            const oClient: SocketIO.Socket = this.socket.in(roomId).connected[`/tic-tac-toe#${oClientId}`];

            /** Both connected clients in an array */
            const clients: { socket: SocketIO.Socket, role: 'x' | 'o' }[] = [
                { socket: xClient, role: 'x'}, 
                { socket: oClient, role: 'o'}
            ];

            console.log('[start:game] client x is', xClientId );
            
            console.log('[start:game] client o is', oClientId );


            clients.forEach(client => {
                /** Clear subscriptions */
                const stop$ = new Subject<void>();

                // Telling client to start the game
                //
                client.socket.emit('start-game' as fys.TicTacToe.TSocketEvent, client.role);
                // If one of the clients disconnect, we want to show a spinner
                //
                client.socket.on('disconnect', () => {
                    if ( this.gameState[roomId] ) {

                        console.log('[game-state] disconnecting', client.socket.id);

                        const gameState = this.gameState[roomId].value;

                        gameState.playable = false;

                        this.gameState[roomId].next(gameState);

                        stop$.next();
                    }
                });

                this.on<number>(client.socket, 'make-move')
                    .takeUntil(stop$)
                    .subscribe( index => {
                        console.log(`[make-move] ${client.role} is making a move ${index}`);
                        
                        const gameState = _.cloneDeep(this.gameState[roomId].value);
                        
                        gameState.moves[`${client.role}`].push(index);

                        gameState.turn = client.role === 'x' ? 'o' : 'x';
                        
                        this.gameState[roomId].next(gameState);
                    }, noop, () => console.log('[start-game] cleaning make move subscription'));
            })

            const gameStream$ = this.gameState[roomId];

            gameStream$.subscribe( gameState => {
                
                const gameStatus = this.determineWinner(gameState.moves);
                const clientSockets = clients.map(client => client.socket);
                
                if ( gameStatus.won ) {
                    this.endGame(clientSockets, gameStatus.player);
                    this.resetGame(clientSockets, roomId);
                } else if ( gameStatus.drawn ) {
                    this.endGame(clientSockets, null);
                    this.resetGame(clientSockets, roomId);
                }

                clients.forEach(client => client.socket.emit('game-stat', gameState));
            });

        } else {
            console.error('[start:game] attempt to start already started game', roomId);
        }
    }

    /** Resets the state of the game */
    private resetGame(clients: SocketIO.Socket[], roomId: string ) {
        const gameState = _.cloneDeep(this.gameState[roomId].value);
        
        gameState.moves = { x: [], o: [] };

        setTimeout(() => {
            this.gameState[roomId].next(gameState);

            clients.forEach( client => client.emit('restart-game' as fys.TicTacToe.TSocketEvent))
        }, 3000);
    }

    /** Ends game by telling players about the status */
    private endGame(clients: SocketIO.Socket[], winner: fys.TicTacToe.TRole | null ) {
        clients.forEach( client => {
            if ( winner ) {
                client.emit('end-game', {
                    winner
                });
            } else {
                client.emit('end-game', { draw: true });
            }
        })
    }

    /** Determines whether there has been a winner or not */
    private determineWinner( moves: fys.TicTacToe.IMoves ): IWinnerDetermination  {
        /** To determine wins,
         * we want our combinations arrays to always be sorted properly
         * We will do this in a copy to ensure we respect the original objects immutability
         * */
        // let sortedCombinations = { ...this.gameState.get(roomId) };
        let sortedCombinations = { ...moves };
        
        let status: IWinnerDetermination = { won: null, player: null, drawn: null };

        for (let key in sortedCombinations) {
            sortedCombinations[key].sort();

            const gameWon = this.possibleWins.some(possibleWin => {
                let correctPositions = sortedCombinations[key]
                    .map( (combo: any) => ~ possibleWin.find( possibleWinCombos => possibleWinCombos === combo ) )
                    .filter(Boolean);

                /** If a player has 3 positions correct of the possible combinations they won! */
                let positionMatch = correctPositions.length === 3;

                return positionMatch;
            });

            if ( gameWon ) {
                status.player = key as fys.TicTacToe.TRole;
                status.won = true;
            } else if ( moves.x.length + moves.o.length === 9 ) {
                status.drawn = true;
            }
        }

        return status;
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
                    delete this.gameState[roomId];
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
            const listener = (data: T) => {
                observer.next(data);
            };
            socket.on(event, listener);
            return () => socket.removeListener(event, listener);
        });
        return observable;
    }

}