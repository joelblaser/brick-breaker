import { detectBrickCollision } from '../collision-detection';
import { Game } from '../game';
import { Position } from '../models/position.model';
import { GameObject } from './game.object';

export class Brick extends GameObject {
  image: CanvasImageSource;

  game: Game;

  width: number = 80;
  height: number = 24;

  markedForDeletion: boolean = false;

  constructor(game: Game, position: Position) {
    super();
    this.image = <CanvasImageSource> document.getElementById('img_brick');

    this.game = game;
    this.position = position;
  }

  update() {
    if (detectBrickCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;

      this.markedForDeletion = true;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
