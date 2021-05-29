import { Ball } from "./game-objects/ball";
import { Brick } from "./game-objects/brick";
import { Paddle } from "./game-objects/paddle";

export function detectBrickCollision(ball: Ball, brick: Brick) {
  const bottomOfBall = ball.position.y + ball.size;
  const topOfBall = ball.position.y;

  const topOfBrick = brick.position.y;
  const leftSideOfBrick = brick.position.x;
  const rightSideOfBrick = brick.position.x + brick.width;
  const bottomOfBrick = brick.position.y + brick.height;

  return (
    bottomOfBall >= topOfBrick &&
    topOfBall <= bottomOfBrick &&
    ball.position.x >= leftSideOfBrick &&
    ball.position.x + ball.size <= rightSideOfBrick
  );
}

export function detectPaddleCollision(ball: Ball, paddle: Paddle) {
  const bottomOfBall = ball.position.y + ball.size;

  const topOfPaddle = paddle.position.y;
  const leftSideOfPaddle = paddle.position.x;
  const rightSideOfPaddle = paddle.position.x + paddle.width;

  return (
    bottomOfBall >= topOfPaddle &&
    ball.position.x >= leftSideOfPaddle &&
    ball.position.x + ball.size <= rightSideOfPaddle
  );
}
