export default class InputHandler {
  constructor(paddle, game) {
    document.addEventListener('keydown', (event) => {
      switch(event.key) {
        case 'a': {
          paddle.moveLeft();
          break;
        }
        case 'd': {
          paddle.moveRight();
          break;
        }
        case 'Escape': {
          game.togglePause();
          break;
        }
        case ' ': {
          game.start();
          break;
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      switch(event.key) {
        case 'a': {
          if (paddle.speed < 0) {
            paddle.stop();
          }
          break;
        }
        case 'd': {
          if (paddle.speed > 0) {
            paddle.stop();
          }
          break;
        }
      }
    });
  }
}