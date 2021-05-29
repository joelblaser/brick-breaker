import { Brick } from './game-objects/brick';
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

const level1 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

const level2 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const level3 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const levels = [level1, level2, level3];
