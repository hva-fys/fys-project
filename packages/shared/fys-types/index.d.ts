/**
 * @author Abdel Elmedny
 * @description This file will contain client and server shared namespaces
 */
export declare namespace TicTacToe {
    interface IRoom {
        /** Name of room */
        name: string;
        /** Creator date */
        created_on?: string;
        /** Room id */
        id: string;
        /** Whether the room is joinable or not */
        joinable: boolean;
    }

    type TRole = 'x' | 'o';

    type TSocketEvent = 'get-rooms'    | 
                        'add-room'     | 
                        'rooms'        | 
                        'join-room'    |
                        'start-game'   |
                        'leave-room'   |
                        'make-move'    |
                        'end-game'     |   
                        'restart-game' |   
                        'game-stat'    ;

    enum EGameStatus {
        LOSS = 0,
        DRAW,
        WIN
    }

    interface IMoves {
        x: number[];
        o: number[];
        [key: string]: number[];
    }

    interface IGameState {
        /** The moves that have been made so far */
        moves: IMoves;
        /** Whos turn it is */
        turn: TRole;
        /** Whether clients can be making moves or not, useful incase clients havent connected yet */
        playable: boolean;

        score: {
            x: number
            o: number
        }
    }

    interface IEndGame { 
        winner?: string; 
        draw?: boolean;
    }
    
}

