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

    type TSocketEvent = 'get-rooms'  | 
                        'add-room'   | 
                        'rooms'      | 
                        'join-room'  |
                        'leave-room' |
                        'make-move'  |
                        'game-stat'  ;

    enum EGameStatus {
        LOSS = 0,
        DRAW,
        WIN
    }
}

