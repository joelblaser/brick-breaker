import { Ball } from './ball';
import { Brick } from './brick';
import { InputHandler } from './input';
import { buildLevel, levels } from './levels';
import { Paddle } from './paddle';

enum Gamestate {
  PAUSED,
  RUNNING,
  MENU,
  GAMEOVER,
  NEWLEVEL,
}

export class Game {
  gameWidth: number;
  gameHeight: number;
  gamestate: Gamestate = Gamestate.MENU;

  lives: number = 3;
  currentLevel: number = 0;

  ball: Ball;
  paddle: Paddle;
  gameObjects: any = [];
  bricks: Brick[] = [];

  constructor(gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.ball = new Ball(this);
    this.paddle = new Paddle(this);

    new InputHandler(this.paddle, this);
  }

  start() {
    if (
      this.gamestate !== Gamestate.MENU &&
      this.gamestate !== Gamestate.NEWLEVEL
    ) {
      return;
    }

    this.bricks = buildLevel(this, levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.ball, this.paddle];

    this.gamestate = Gamestate.RUNNING;
  }

  update() {
    if (this.lives === 0) {
      this.gamestate = Gamestate.GAMEOVER;
    }

    if (this.gamestate !== Gamestate.RUNNING) {
      return;
    }

    if (this.bricks.length === 0) {
      if (this.currentLevel < levels.length - 1) {
        this.currentLevel++;
      }
      this.gamestate = Gamestate.NEWLEVEL;
      this.start();
    }

    [...this.gameObjects, ...this.bricks].forEach((object) => {
      object.update();
    });

    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);
  }

  draw(ctx: CanvasRenderingContext2D) {
    [...this.gameObjects, ...this.bricks].forEach((object) => {
      object.draw(ctx);
    });

    switch (this.gamestate) {
      case Gamestate.PAUSED: {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = 'rgb(0, 0, 0, 0.5)';
        ctx.fill();

        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2);

        break;
      }
      case Gamestate.MENU: {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = 'rgb(0, 0, 0, 1)';
        ctx.fill();

        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(
          'Press SPACEBAR to start',
          this.gameWidth / 2,
          this.gameHeight / 2
        );

        break;
      }
      case Gamestate.GAMEOVER: {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = 'rgb(0, 0, 0, 1)';
        ctx.fill();

        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', this.gameWidth / 2, this.gameHeight / 2);

        break;
      }
    }
  }

  togglePause() {
    if (this.gamestate == Gamestate.PAUSED) {
      this.gamestate = Gamestate.RUNNING;
    } else {
      this.gamestate = Gamestate.PAUSED;
    }
  }
}
