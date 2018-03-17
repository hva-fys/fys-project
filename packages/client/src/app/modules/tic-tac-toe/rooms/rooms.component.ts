import { Component, OnInit } from '@angular/core';
import { TicTacToeService } from '../tic-tac-toe.service';
import * as fys from 'fys';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

/**
 * This component will show available rooms and give the user the ability to add them
 */
@Component({
  selector: 'fys-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  public rooms$: Observable<fys.TicTacToe.IRoom[]>;

  constructor(private ticTacToeService: TicTacToeService) {

    this.ticTacToeService.getRooms();

    this.rooms$ = this.ticTacToeService.state.rooms$
      .pipe(
        map( rooms => {
          const newRooms = rooms.map( room => {
            const newRoom = { ...room };
            newRoom.created_on = moment(newRoom.created_on).fromNow();
            return newRoom;
          });
          return newRooms;
        })
      );
  }

  ngOnInit() { }

  public addRoom() {
    // For the ripple effect of the fab to take place, we want to defer our work
    //
    setTimeout(() => {
      const name = prompt('Whats the room name?');

      if ( name ) {
        this.ticTacToeService.addRoom(name);
      }
    });
  }

}
