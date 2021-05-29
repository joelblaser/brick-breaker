import { Brick } from './brick';
import { Game } from './game';
import { Position } from './models/position.model';

export function buildLevel(game: Game, level: number[][]) {
  let bricks: Brick[] = [];

  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        const position: Position = {
          x: 80 * brickIndex,
          y: 75 + 24 * rowIndex,
        };
        bricks.push(new Brick(game, position));
      }
    });
  });

  return bricks;
}

const level1 = [[0, 0, 0, 0, 1, 0, 0, 0, 0, 0]];

const level2 = [
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
];

export const levels = [level1, level2];
