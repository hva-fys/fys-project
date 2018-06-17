import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'fys-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PongComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    const pong = new Pong('root');

    pong.run();
  }

}


/**
 * Pong Game.
 *
 * Implemented all exercises 1 to 10 and 11, 12.
 * Search around with the following expression // Exercise 2
 *
 * Also the AI is fixed to make sure the Computer can handle more balls.
 * Search // AI Fix
 *
 * Monster only have a walk issue completed.
 *
 * @author Nick Vlug <nick.vlug@hva.nl>
 */

/**
 * Default Canvas element.
 */
class CanvasElem {

  score: number;

  mode: number;

  width: number;

  height: number;

  canvas: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  x: number;

  y: number;

  x_speed: number;

  y_speed: number;

  /**
   * Paddle constructor.
   *
   * @param x
   * @param y
   * @param width
   * @param height
   */
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.x_speed = 0;
    this.y_speed = 0;

    this.ctx = null;
    this.canvas = null;
  }

  /**
   * Render.
   */
  render() {
    this.ctx.fillStyle = '#ee453d';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  /**
   * Move object.
   *
   * @param deltaX
   * @param deltaY
   */
  move(deltaX, deltaY) {
    this.x += deltaX;
    this.y += deltaY;
    this.y_speed = deltaY;

    if (this.y < 0) {
      this.y = 0;
      this.y_speed = 0;
    } else if (this.y + this.height > this.canvas.height) {
      this.y = this.canvas.height - this.height;
      this.y_speed = 0;
    }
  }
}

/**
 * Paddle Class.
 */
class Paddle extends CanvasElem {

  /**
   * Paddle constructor.
   *
   * @param x
   * @param y
   * @param width
   * @param height
   */
  constructor(x, y, width, height) {
    super(x, y, width, height);

    // Exercise 3
    this.score = 0;

    // Exercise 4
    this.mode = 0;
  }

  /**
   * Set mode.
   *
   * @param mode
   */
  setMode(mode) {
    // Exercise 4
    this.mode = parseInt(mode, 10);

    if (this.mode === 0) {
      this.height = 70;
    } else {
      this.height = 40;
    }

    this.y = this.canvas.height / 2 - this.height / 2;
  }

  /**
   * Reset.
   */
  reset() {
    this.score = 0;

    this.y = this.canvas.height / 2 - this.height / 2;
  }

  /**
   * Check collision.
   *
   * @param obj
   */
  checkCollision(obj) {
    if (obj.x + obj.width < this.x
      || obj.x - obj.width > this.x + this.width
      || obj.y + obj.width <= this.y
      || obj.y - obj.width >= this.y + this.height
    ) {
      return;
    }

    if (obj.x > this.x + this.width / 2 && obj.x_speed > 0) {
      return;
    }

    if (obj.x < this.x + this.width / 2 && obj.x_speed < 0) {
      return;
    }

    // Exercise 8
    if (++obj.hits % 3 === 0 && obj.hits < 30) {
      const sign = Math.sign(obj.x_speed);
      if (sign === 1) {
        obj.x_speed++;
      } else if (sign === -1) {
        obj.x_speed--;
      }
    }


    // Exercise 9
    let y_speed = 0;
    if (obj.y < this.y + this.height / 2) {
      const point = (this.y + this.height / 2) - obj.y;
      y_speed = -(point / 6);

    } else if (obj.y > this.y + this.height / 2) {
      const point = obj.y - (this.y + this.height / 2);
      y_speed = point / 6;
    }

    obj.x_speed = -obj.x_speed;
    obj.y_speed = y_speed;
  }
}

/**
 * Computer Class.
 */
class Computer extends Paddle {
  /**
   * Player constructor.
   *
   * @param canvas
   * @param ctx
   */
  constructor(canvas, ctx) {
    super(10, canvas.height / 2 - 25, 10, 50);

    this.canvas = canvas;
    this.ctx = ctx;
  }

  /**
   * Reset.
   */
  reset() {
    super.reset();

    this.x = 10;
  }

  /**
   * Update.
   *
   * @param balls
   */
  update(balls) {
    let target = null;
    for (const k in balls) {
      if (!balls.hasOwnProperty(k)) {
        continue;
      }

      if (!target) {
        target = balls[k];
      } else {
        if (balls[k].x < target.x) {
          target = balls[k];
        }
      }
    }

    if (!target) {
      return;
    }

    // AI Fix
    const currPosCenter = this.y + (this.height / 2);
    const ballPosCenter = target.y + (target.height / 2);

    const diff = currPosCenter - ballPosCenter;

    const move = -4 * 2;
    if (move < diff && diff > -move) {
      const sign = Math.sign(diff);
      if (sign === 1) {
        this.move(0, 2 * (move / 2) / 3);
      } else if (sign === -1) {
        this.move(0, 2 * (-move / 2) / 3);
      } else {
        this.move(0, 0);
      }
    } else {
      if (diff < 4) {
        this.move(0, 2 * (-move) / 3);
      }
    }
  }
}

/**
 * Player Class.
 */
class Player extends Paddle {

  keys: any;

  /**
   * Player constructor.
   *
   * @param canvas
   * @param ctx
   */
  constructor(canvas, ctx) {
    super(canvas.width - 20, (canvas.height / 2) - 25, 10, 50);

    this.canvas = canvas;
    this.ctx = ctx;

    this.keys = {};

    window.addEventListener('keydown', (e) => {
      this.keys[e.keyCode] = e.key;
    });

    window.addEventListener('keyup', (e) => {
      delete this.keys[e.keyCode];
    });
  }

  /**
   * Reset.
   */
  reset() {
    super.reset();

    this.x = this.canvas.width - 20;
  }

  /**
   * Move.
   *
   * @param deltaX
   * @param deltaY
   */
  move(deltaX, deltaY) {
    // Exercise 7
    const width = this.canvas.width / 2;
    const minWidth = this.canvas.width - (width - this.width) - deltaX;
    const maxWidth = (this.canvas.width - (10 + this.width)) - deltaX;

    if (this.x > maxWidth || this.x < minWidth) {
      return;
    }

    super.move(deltaX, deltaY);
  }

  /**
   * Update cycle.
   */
  update() {
    this.move(0, 0);

    // Exercise 7
    // tslint:disable-next-line:forin
    for (const key in this.keys) {
      const value = parseInt(key, 10);
      if (value === 38) {
        this.move(0, -4);
      } else if (value === 40) {
        this.move(0, 4);
      } else if (value === 37) {
        this.move(-4, 0);
      } else if (value === 39) {
        this.move(4, 0);
      }
    }
  }
}

/**
 * Ball Class
 */
class Ball extends CanvasElem {

  ctx: CanvasRenderingContext2D;

  canvas: HTMLCanvasElement;

  x_speed: number;

  hits: number;

  unit: number;

  x: number;

  y: number;

  width: number;

  height: number;

  mode: number;

  /**
   * Ball constructor.
   *
   * @param canvas
   * @param ctx
   */
  constructor(canvas, ctx) {
    super((canvas.width / 2) - 10, (canvas.height / 2) - 10, 10, 0);

    this.canvas = canvas;
    this.ctx = ctx;

    this.x_speed = 3;

    this.hits = 0;
    this.unit = 0;
  }

  /**
   * Render Ball paddle.
   */
  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.width, 2 * Math.PI, 0);
    this.ctx.fillStyle = '#ee453d';
    this.ctx.fill();
  }

  /**
   * Reset to default values.
   */
  reset() {
    // Exercise 5
    this.x = (this.canvas.width / 2) + (this.mode === 0 ? 10 : 5);
    this.y = (this.canvas.height / 2);
    this.x_speed = 3;
    this.y_speed = 0;

    // Exercise 8
    this.hits = 0;
    this.unit = 0;
  }

  /**
   * Set mode.
   *
   * @param mode
   */
  setMode(mode) {
    // Exercise 5
    this.mode = parseInt(mode, 10);

    this.width = this.height = this.mode === 0 ? 10 : 5;

    this.y = this.canvas.height / 2 - this.height / 2;
    this.x = this.canvas.width / 2 - this.width / 2;
  }

  /**
   * Update cycle.
   *
   * @param computerPaddle
   * @param playerPaddle
   * @param monster
   */
  update(computerPaddle, playerPaddle, monster) {
    this.x += this.x_speed;
    this.y += this.y_speed;

    if (this.x < 0 || this.x > this.canvas.width) {
      // Exercise 3
      if (this.x < 0) {
        playerPaddle.score++;
      }

      // Exercise 3
      if (this.x > this.canvas.width) {
        computerPaddle.score++;
      }

      this.reset();
      return;
    }

    if (this.y - 5 < 0) {
      this.y = 5;
      if (this.y_speed < 0) {
        this.y_speed = -this.y_speed;
      }
    } else if (this.y + 5 > this.canvas.height) {
      this.y = this.canvas.height - 5;
      if (this.y_speed > 0) {
        this.y_speed = -this.y_speed;
      }
    }

    monster.checkCollision(this);

    if (this.x < this.canvas.width / 2) {
      computerPaddle.checkCollision(this);
    } else {
      playerPaddle.checkCollision(this);
    }
  }
}

/**
 * Monster Class.
 */
class Monster extends CanvasElem {

  alive: boolean;

  walk_x: number;

  walk_y: number;

  /**
   * Monster constructor.
   *
   * @param canvas
   * @param ctx
   */
  constructor(canvas, ctx) {
    super((canvas.width / 2) - 15, (canvas.height / 2) - 15, 30, 30);

    this.canvas = canvas;
    this.ctx = ctx;

    this.x_speed = 1;

    this.alive = false;

    this.walk_x = 0;
    this.walk_y = 0;
  }

  /**
   * Reset Monster.
   */
  reset() {
    this.alive = false;
  }

  /**
   * Render Monster.
   */
  render() {
    if (!this.alive) {
      return;
    }

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.width, 2 * Math.PI, 0);
    this.ctx.fillStyle = '#00FF00';
    this.ctx.fill();
  }

  /**
   * Check collision.
   *
   * @param obj
   */
  checkCollision(obj) {
    if (!this.alive) {
      return;
    }

    if (
      obj.x + obj.width < this.x ||
      obj.x - obj.width > this.x + this.width ||
      obj.y + obj.width <= this.y ||
      obj.y - obj.width >= this.y + this.height
    ) {
      return;
    }

    const dx = obj.x - this.x;
    const dy = obj.y - this.y;
    const dist = Math.sqrt((dx * dx) + (dy * dy));
    if (dist < (obj.width + this.width)) {
      this.alive = false;

      obj.y_speed = -obj.y_speed;
      obj.x_speed = -obj.x_speed;
    }
  }

  /**
   * Walk X
   */
  walkX() {
    const currPosCenterX = this.x + (this.width / 2);

    const diff = currPosCenterX - this.walk_x;

    const move = -4 * 2;
    const sign = Math.sign(diff);
    if (sign === 1) {
      this.move(2 * (move / 2) / 3, 0);
    } else if (sign === -1) {
      this.move(2 * (-move / 2) / 3, 0);
    } else {
      this.move(0, 0);
    }
  }

  /**
   * Walk Y
   */
  walkY() {
    const currPosCenterY = this.y + (this.height / 2);

    const diff = currPosCenterY - this.walk_y;

    const move = -4 * 2;
    const sign = Math.sign(diff);
    if (sign === 1) {
      this.move(0, 2 * (move / 2) / 3);
    } else if (sign === -1) {
      this.move(0, 2 * (-move / 2) / 3);
    } else {
      this.move(0, 0);
    }
  }


  /**
   * Update monster.
   */
  update() {
    if (this.walk_x === 0 || this.walk_x === this.x) {
      let res = Math.floor(Math.random() * Math.floor(this.canvas.width));
      if (res < this.width) {
        res += this.width;
      }

      this.walk_x = res;
    }

    if (this.walk_y === 0 || this.walk_y === this.y) {
      let res = Math.floor(Math.random() * Math.floor(this.canvas.height));
      if (res < this.height) {
        res += this.height;
      }

      this.walk_y = res;
    }

    this.walkX();
    this.walkY();
  }
}

/**
 * Pong Class
 */
class Pong {

  cheat: boolean;

  player: Player;

  computer: Computer;

  monster: Monster;

  elemRoot: HTMLElement;

  elemCanvas: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  balls: Ball[];

  elemStart: HTMLButtonElement;

  elemStop: HTMLButtonElement;

  elemScore: HTMLDivElement;

  elemOptionEasy: HTMLInputElement;

  elemOptionHard: HTMLInputElement;

  elemWinner: HTMLDivElement;

  interval: any;

  slowInterval: any;

  /**
   * Pong constructor.
   *
   * @param id  Element id.
   */
  constructor(id) {
    const elemRoot = document.getElementById(id);
    if (!elemRoot) {
      console.error('Pong root element not found.');
      return;
    }

    const elemCanvas = document.createElement('canvas');
    elemCanvas.width = 600;
    elemCanvas.height = 400;

    const ctx = elemCanvas.getContext('2d');

    this.elemRoot = elemRoot;
    this.elemCanvas = elemCanvas;
    this.ctx = ctx;

    this.cheat = false;
    this.balls = [];

    this.player = new Player(this.elemCanvas, this.ctx);
    this.computer = new Computer(this.elemCanvas, this.ctx);
    this.monster = new Monster(this.elemCanvas, this.ctx);

    this.balls.push(new Ball(this.elemCanvas, this.ctx));

    const elemStart = document.createElement('button');
    elemStart.innerHTML = 'Start Pong';
    elemStart.onclick = (e) => this.startHandle(e);

    const elemStop = document.createElement('button');
    elemStop.innerHTML = 'Stop Pong';
    elemStop.onclick = (e) => this.stopHandle(e);

    // Exercise 3
    const elemScore = document.createElement('div');
    elemScore.className = 'score';
    elemScore.innerHTML = this.computeScore();

    // Exercise 4
    const elemOptionEasy = document.createElement('input');
    elemOptionEasy.id = 'easy';
    elemOptionEasy.type = 'radio';
    elemOptionEasy.name = 'mode';
    elemOptionEasy.checked = true;
    elemOptionEasy.value = '0';
    elemOptionEasy.onclick = (e) => this.changeMode(e);

    const elemOptionHard = document.createElement('input');
    elemOptionHard.id = 'hard';
    elemOptionHard.type = 'radio';
    elemOptionHard.name = 'mode';
    elemOptionHard.value = '1';
    elemOptionHard.onclick = (e) => this.changeMode(e);

    // Exercise 6
    const elemWinner = document.createElement('div');
    elemWinner.className = 'winner';

    this.elemStart = elemStart;
    this.elemStop = elemStop;
    this.elemScore = elemScore;
    this.elemOptionEasy = elemOptionEasy;
    this.elemOptionHard = elemOptionHard;
    this.elemWinner = elemWinner;

    // Exercise 12
    window.addEventListener('keydown', (e) => {
      if (!e.key) {
        return;
      }

      // Custom cheat 'o' spam balls.
      switch (e.key) {
        case 'g':
          this.cheat = false;
          break;

        case 'p':
          this.cheat = true;
          break;

        case 'i':
          this.player.height = this.elemCanvas.height;
          break;

        case 'o':
          this.balls.push(new Ball(this.elemCanvas, this.ctx));
          break;

        case 'm':
          this.monster.alive = true;
          break;
      }
    });
  }

  /**
   * Render cycle.
   */
  render() {
    // Exercise 2


    this.ctx.rect(0, 0, this.elemCanvas.width, this.elemCanvas.height);
    this.ctx.fillStyle = '#584bb3';
    this.ctx.fill();

    this.player.render();
    this.computer.render();
    this.monster.render();

    for (const k in this.balls) {
      if (!this.balls.hasOwnProperty(k)) {
        continue;
      }

      this.balls[k].render();
    }
  }

  /**
   * Compute score string.
   *
   * @returns {string}
   */
  computeScore() {
    // Exercise 3
    return this.computer.score + ' - ' + this.player.score;
  }

  /**
   * Update Score in Element.
   */
  updateScore() {
    // Exercise 3
    this.elemScore.innerHTML = this.computeScore();

    // Exercise 6
    if (!this.elemWinner.classList.contains('open') && (this.computer.score >= 5 || this.player.score >= 5)) {
      if (this.computer.score >= 5) {
        this.elemWinner.innerHTML = 'Computer wins';
      } else if (this.player.score >= 5) {
        this.elemWinner.innerHTML = 'Player wins';
      }

      this.elemWinner.classList.add('open');

      this.stopHandle(null);
    }
  }

  /**
   * Update cycle.
   */
  update() {
    // Exercise 3
    this.updateScore();

    this.player.update();

    // Exercise 12
    if (!this.cheat) {
      this.computer.update(this.balls);

      for (const k in this.balls) {
        if (!this.balls.hasOwnProperty(k)) {
          continue;
        }

        const ball = this.balls[k];
        if (ball) {
          ball.update(this.computer, this.player, this.monster);

          // Exercise 10
          if (this.balls.length === 1) {
            if (ball.hits === 7 && ball.hits % 7 === 0) {
              this.balls.push(new Ball(this.elemCanvas, this.ctx));
            }
          }

          // Exercise 11
          if (ball.hits === 10 && !this.monster.alive) {
            this.monster.alive = true;
          }
        }
      }
    }
  }

  /**
   * run Pong.
   */
  run() {
    const elemHeader = document.createElement('div');
    elemHeader.className = 'header';

    const elemButtons = document.createElement('div');
    elemButtons.className = 'buttons';

    elemButtons.appendChild(this.elemStart);
    elemButtons.appendChild(this.elemStop);

    // Exercise 4
    const elemTools = document.createElement('div');
    elemTools.className = 'tools';

    const elemEasyLabel = document.createElement('label');
    elemEasyLabel.innerHTML = 'Gemakkelijk';
    elemEasyLabel.setAttribute('for', 'easy');

    const elemHardLabel = document.createElement('label');
    elemHardLabel.innerHTML = 'Moeilijk';
    elemHardLabel.setAttribute('for', 'hard');

    elemTools.appendChild(this.elemOptionEasy);
    elemTools.appendChild(elemEasyLabel);
    elemTools.appendChild(this.elemOptionHard);
    elemTools.appendChild(elemHardLabel);

    elemHeader.appendChild(elemButtons);
    elemHeader.appendChild(this.elemScore);
    elemHeader.appendChild(elemTools);

    this.elemRoot.appendChild(elemHeader);
    this.elemRoot.appendChild(this.elemWinner);
    this.elemRoot.appendChild(this.elemCanvas);

    this.render();
  }

  /**
   * Reset all objects.
   */
  reset() {
    for (const k in this.balls) {
      if (!this.balls.hasOwnProperty(k)) {
        continue;
      }

      this.balls[k].reset();

      if (parseInt(k, 10) !== 0) {
        delete this.balls[k];
      }
    }

    this.computer.reset();
    this.player.reset();
    this.monster.reset();

    this.elemOptionEasy.disabled = false;
    this.elemOptionHard.disabled = false;

    if (this.elemWinner.classList.contains('open')) {
      this.elemWinner.classList.remove('open');
    }
  }

  /**
   * Change mode.
   *
   * @param e
   */
  changeMode(e) {
    // Exercise 4
    if (!e.target) {
      return;
    }

    const target = e.target;
    if (target) {
      this.player.setMode(target.value || 0);

      for (const k in this.balls) {
        if (!this.balls.hasOwnProperty(k)) {
          continue;
        }

        this.balls[k].setMode(target.value || 0);
      }
    }

    this.render();
  }

  /**
   * Stop pong.
   *
   * @param e
   */
  stopHandle(e) {
    clearInterval(this.interval);
    clearInterval(this.slowInterval);
  }

  /**
   * Start pong.
   *
   * @param e
   */
  startHandle(e) {
    this.stopHandle(e);
    this.reset();

    this.elemOptionEasy.disabled = true;
    this.elemOptionHard.disabled = true;

    this.interval = setInterval(() => {
      this.render();
      this.update();
    }, 15);

    this.slowInterval = setInterval(() => {
      this.monster.update();
    }, 50);
  }
}
