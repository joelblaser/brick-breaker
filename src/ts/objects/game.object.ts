import { Position } from '../models/position.model';

export abstract class GameObject {
  position: Position;

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract update(): void;
}
