import * as express from 'express';
import * as socketio from 'socket.io';

import * as fys from '../../shared/fys-types';

export class Main {
    constructor(){
        console.log("Main constructed");        
        this.setUpExpress();
    }

    private setUpExpress() {
        
        const app = express();
        const http = require('http').Server(app);
        const io = socketio(http);

        // respond with "hello world" when a GET request is made to the homepage
        app.get('/', function (req, res) {
            res.send('hello world');
        });
        
        http.listen(3000, () => {
            console.log('listening on *:3000');
        });

        io.on('connection', socket => {
            console.log('connnected');
           
            socket.on('disconnect', function () {
                console.log('user disconnected');
            });

            socket.on('fetch-rooms', () => {
                console.log('send rooms');
            });

            socket.send('test');
        });

    }

    public getRooms(): fys.TicTacToe.IRoom {
        return null;
    }
}
