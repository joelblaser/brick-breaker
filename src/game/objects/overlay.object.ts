import { Game } from '../game';
import { GameObject } from './game.object';

export class Overlay extends GameObject {
  game: Game;

  lives: string;

  constructor(game: Game) {
    super();
    this.game = game;

    this.lives = `Lives: ${game.lives}`;
  }

  update() {
    this.lives = `Lives: ${this.game.lives}`;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = '30px Arial';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'start';
    ctx.fillText(this.lives, 10, 40);
  }
}
  