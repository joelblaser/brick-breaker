import { Game } from '../game';
import { GameObject } from './game.object';

export class Paddle extends GameObject {
  gameWidth: number;
  width: number = 150;
  height: number = 30;

  maxSpeed: number = 5;
  speed: number = 0;

  constructor(game: Game) {
    super();
    this.gameWidth = game.gameWidth;

    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10,
    };
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#0ff';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  update() {
    this.position.x += this.speed;

    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
  }
}
