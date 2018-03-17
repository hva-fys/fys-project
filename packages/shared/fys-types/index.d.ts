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
    }

    type TSocketEvent = 'get-rooms' | 'add-room' | 'rooms';
}
