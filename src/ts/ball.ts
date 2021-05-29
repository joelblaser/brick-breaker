import { detectPaddleCollision } from './collision-detection';
import { Game } from './game';
import { Position } from './models/position.model';

export class Ball {
  image: CanvasImageSource;

  game: Game;
  size: number = 16;

  position: Position;
  speed: { x: number; y: number };

  constructor(game: Game) {
    this.image = <CanvasImageSource> document.getElementById('img_ball');

    this.game = game;
    this.reset();
  }

  reset() {
    this.position = {
      x: 10,
      y: 400,
    };
    this.speed = {
      x: 2,
      y: -2,
    };
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (
      this.position.x + this.size > this.game.gameWidth ||
      this.position.x < 0
    ) {
      this.speed.x = -this.speed.x;
    }

    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    if (this.position.y + this.size > this.game.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    if (detectPaddleCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
