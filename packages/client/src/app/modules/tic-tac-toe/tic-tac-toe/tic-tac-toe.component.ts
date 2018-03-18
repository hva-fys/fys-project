import { Component, OnInit, OnDestroy } from '@angular/core';
import { TicTacToeService } from '../tic-tac-toe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fys-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit, OnDestroy {

  public readonly BUTTON_COUNT = 9;

  public buttons: number[] = [];

  private roomId: string;

  constructor(private ticTacToeService: TicTacToeService, private route: ActivatedRoute) {
    this.buttons = Array(this.BUTTON_COUNT)
      .fill(null).map((_x, index) => index + 1);

    this.roomId = this.route.snapshot.params['id'];

    this.ticTacToeService.joinRoom(this.roomId);
  }

  ngOnInit() {
  }

  buttonPress() {

  }

  ngOnDestroy() {
    this.ticTacToeService.leaveRoom(this.roomId);
  }

}
