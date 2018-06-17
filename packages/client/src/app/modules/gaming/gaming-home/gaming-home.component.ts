import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WikipediaService } from '../../../services/wikipedia.service';
import { fadeInOut } from '../../../animations';

interface IGameCard {
  route: string;
  name: string;
  description: Observable<string>;
}

@Component({
  selector: 'fys-gaming-home',
  templateUrl: './gaming-home.component.html',
  styleUrls: ['./gaming-home.component.scss'],
  animations: [fadeInOut]
})
export class GamingHomeComponent implements OnInit {


  public games: IGameCard[] = [
    {
      name: 'Tic tac toe',
      route: '../tic-tac-toe',
      description: this.$wikipedia.getIntro('Tic-tac-toe')
    },
    {
      name: 'Snake',
      route: 'snake',
      description: this.$wikipedia.getIntro('Snake (video game genre)')
    },
    {
      name: 'Pong',
      route: 'pong',
      description: this.$wikipedia.getIntro('pong')
    }
  ];

  constructor(private $wikipedia: WikipediaService) { }

  ngOnInit() {
  }

}
