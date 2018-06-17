import { animate, state, style, trigger, transition } from '@angular/animations';
import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { fadeInOut } from '../../../animations';




/**
 * Angular implementation of snake with credit to @straker on github
 * @see https://gist.github.com/straker/ff00b4b49669ad3dec890306d348adc4
 */
@Component({
  selector: 'fys-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss'],
  animations: [
    trigger('scaleUp', [
      state('true', style({
          transform: 'scale(1.2)'
      })),
      state('false', style({
          transform: 'scale(1)'
      })),
      transition('* <=> *', animate('350ms cubic-bezier(0.4, 0.0, 1, 1)'))
    ]),
    fadeInOut
  ]
})
export class SnakeComponent implements AfterViewInit {

  @ViewChild('canvas') canvasElementRef: { nativeElement: HTMLCanvasElement};

  public get canvas(): HTMLCanvasElement {
    return this.canvasElementRef.nativeElement;
  }

  public context: CanvasRenderingContext2D;

  public grid = 16;

  public snake = new Proxy({
    x: 160,
    y: 160,
    dx: this.grid,
    dy: 0,
    cells: [],
    maxCells: 4
  }, {
      set: (snake, property, value) => {
        if ( property === 'maxCells' ) {
            this.score = value - 4;
        }

        snake[property] = value;

        return true;
      }
    });

  public count = 0;

  public apple = {
    x: 320,
    y: 320
  };

  public animateScore: boolean;

  get score(): number {
    return this._score;
  }
  set score(newScore) {
    this._score = newScore;

    this.animateScore = true;

    setTimeout(() => this.animateScore = false, 350);

    // Setting highscore
    //
    if ( newScore > (this.highscore || 0) ) {
      this.highscore = newScore;
    }
  }

  private _score = 0;

  public highscore: number;

  @HostListener('window:keydown', ['$event']) moveSnake(e: KeyboardEvent| { code: string }) {
    // prevent snake from backtracking on itself
    if (e.code === 'ArrowLeft' && this.snake.dx === 0) {
      this.snake.dx = -this.grid;
      this.snake.dy = 0;
    } else if (e.code === 'ArrowUp' && this.snake.dy === 0) {
      this.snake.dy = -this.grid;
      this.snake.dx = 0;
    } else if (e.code === 'ArrowRight' && this.snake.dx === 0) {
      this.snake.dx = this.grid;
      this.snake.dy = 0;
    } else if (e.code === 'ArrowDown' && this.snake.dy === 0) {
      this.snake.dy = this.grid;
      this.snake.dx = 0;
    }
  }

  constructor() { }

  ngAfterViewInit() {
    this.context = this.canvas.getContext('2d');

    requestAnimationFrame(this.loop);
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  loop = () => {

    requestAnimationFrame(this.loop);
    // slow game loop to 15 fps instead of 60 - 60/15 = 4
    if (++this.count < 4) {
      return;
    }
    this.count = 0;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.snake.x += this.snake.dx;
    this.snake.y += this.snake.dy;
    // wrap snake position on edge of screen
    if (this.snake.x < 0) {
      this.snake.x = this.canvas.width - this.grid;
    } else if (this.snake.x >= this.canvas.width) {
      this.snake.x = 0;
    }
    if (this.snake.y < 0) {
      this.snake.y = this.canvas.height - this.grid;
    } else if (this.snake.y >= this.canvas.height) {
      this.snake.y = 0;
    }
    // keep track of where this.snake has been. front of the array is always the head
    this.snake.cells.unshift({ x: this.snake.x, y: this.snake.y });
    // remove cells as we move away from them
    if (this.snake.cells.length > this.snake.maxCells) {
      this.snake.cells.pop();
    }
    // draw apple
    this.context.fillStyle = 'red';
    this.context.fillRect(this.apple.x, this.apple.y, this.grid - 1, this.grid - 1);
    // draw this.snake
    this.context.fillStyle = 'green';
    this.snake.cells.forEach( (cell, index) => {
      this.context.fillRect(cell.x, cell.y, this.grid - 1, this.grid - 1);
      // this.snake ate apple
      if (cell.x === this.apple.x && cell.y === this.apple.y) {
        this.snake.maxCells++;
        this.apple.x = this.getRandomInt(0, 25) * this.grid;
        this.apple.y = this.getRandomInt(0, 25) * this.grid;
      }
      // check collision with all cells after this one (modified bubble sort)
      for (let i = index + 1; i < this.snake.cells.length; i++) {

        // collision. reset game
        if (cell.x === this.snake.cells[i].x && cell.y === this.snake.cells[i].y) {
          this.snake.x = 160;
          this.snake.y = 160;
          this.snake.cells = [];
          this.snake.maxCells = 4;
          this.snake.dx = this.grid;
          this.snake.dy = 0;
          this.apple.x = this.getRandomInt(0, 25) * this.grid;
          this.apple.y = this.getRandomInt(0, 25) * this.grid;
        }
      }
    });
  }

}
