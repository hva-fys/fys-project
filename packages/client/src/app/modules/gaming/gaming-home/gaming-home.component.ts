import { Component, OnInit } from '@angular/core';

interface IGameCard {
  route: string;
  name: string;
}

@Component({
  selector: 'fys-gaming-home',
  templateUrl: './gaming-home.component.html',
  styleUrls: ['./gaming-home.component.scss']
})
export class GamingHomeComponent implements OnInit {


  public games: IGameCard[] = [
    {
      name: 'Tic tac toe',
      route: '../tic-tac-toe'
    },
    {
      name: 'Snake',
      route: 'snake'
    },
    {
      name: 'Pong',
      route: 'pong'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
