import { Component, OnInit, OnDestroy } from '@angular/core';
import { TicTacToeService } from '../tic-tac-toe.service';
import { ActivatedRoute } from '@angular/router';
import { fadeInOut } from '../../../animations';
import { Subject } from 'rxjs/Subject';
import { takeUntil, map, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { each } from 'lodash';
import * as fys from 'fys';

interface IButton {
  disabled: boolean;
  text?: string;
}

@Component({
  selector: 'fys-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss'],
  animations: [fadeInOut]
})
export class TicTacToeComponent implements OnInit, OnDestroy {

  public readonly BUTTON_COUNT = 9;

  public buttons: IButton[] = [];

  /** Role of this player */
  public role$: Observable<string>;

  public score$: Observable<number> = Observable.of(5);

  public loading$: Observable<boolean>;

  private roomId: string;

  private stop$ = new Subject<void>();

  constructor(private ticTacToeService: TicTacToeService, private route: ActivatedRoute) {

    this.setButtons();

    this.roomId = this.route.snapshot.params['id'];

    this.role$ = this.ticTacToeService.joinRoom(this.roomId);

    this.loading$ = this.ticTacToeService.state.gameStatus$.pipe(
      withLatestFrom(this.role$),
      map( ([gameState, role]) => {
        const awaitingOtherPlayer: boolean = gameState.turn !== role;
        return awaitingOtherPlayer;
      })
    );

    this.ticTacToeService.state.endGame$
    .pipe( takeUntil(this.stop$) )
    .subscribe( endGame => {
      if ( endGame.winner ) {
        setTimeout(() => {
          alert(`${endGame.winner} has won!`);
        }, 1000);
      } else {
        setTimeout(() => {
          alert(`The game ended in a draw`);
        }, 1000);
      }
    });

    this.ticTacToeService.state.restartGame$.pipe(
      takeUntil(this.stop$)
    ).subscribe(() => this.setButtons());

    this.ticTacToeService.state.gameStatus$.pipe(
      takeUntil(this.stop$),
      map( gameState => gameState.moves )
    ).subscribe( moves => {
      each(moves, (indexes: number[], key: fys.TicTacToe.TRole) => {
        indexes.forEach( index => {
          this.buttons[index].text = key;
          this.buttons[index].disabled = true;
        });
      });
    });
  }

  ngOnInit() {
  }

  private setButtons() {
    this.buttons = Array(this.BUTTON_COUNT)
      .fill(null).map(() => ({ disabled: false }));
  }

  buttonPress(index: number) {
    this.ticTacToeService.makeMove(index);

    this.buttons[index].disabled = true;
  }

  ngOnDestroy() {
    this.stop$.next();

    this.ticTacToeService.leaveRoom(this.roomId);
  }

}
