import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'fys-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {

  public readonly BUTTON_COUNT = 9;

  public buttons: number[] = [];

  constructor() {
    this.buttons = Array(this.BUTTON_COUNT)
      .fill(null).map((_x, index) => index + 1);
  }

  ngOnInit() {
  }

}
