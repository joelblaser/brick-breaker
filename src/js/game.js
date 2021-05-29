import Ball from './ball';
import InputHandler from './input';
import { buildLevel, levels } from './levels';
import Paddle from './paddle';

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;

    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.gameObjects = [];
    this.bricks = [];

    this.lives = 3;
    this.currentLevel = 0;

    new InputHandler(this.paddle, this);
  }

  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    ) {
      return;
    }

    this.bricks = buildLevel(this, levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.ball, this.paddle];

    this.gamestate = GAMESTATE.RUNNING;
  }

  update(dt) {
    if (this.lives === 0) {
      this.gamestate = GAMESTATE.GAMEOVER;
    }

    if (this.gamestate !== GAMESTATE.RUNNING) {
      return;
    }

    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }

    [...this.gameObjects, ...this.bricks].forEach((object) => {
      object.update(dt);
    });

    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach((object) => {
      object.draw(ctx);
    });

    switch (this.gamestate) {
      case GAMESTATE.PAUSED: {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = 'rgb(0, 0, 0, 0.5)';
        ctx.fill();

        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2);

        break;
      }
      case GAMESTATE.MENU: {
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
      case GAMESTATE.GAMEOVER: {
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
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
