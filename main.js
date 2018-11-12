$(document).ready(function () {
  console.log('hello')
  //variables
  let canvas = document.getElementById('snake'),
    context = canvas.getContext('2d'),
    width = canvas.width,
    height = canvas.height,
    blockSize = 10,
    blockWidth = width / blockSize,
    blockHeight = height / blockSize,
    result = 0;


  let drawFrame = () => {
    context.fillStyle = "Gray";
    context.fillRect(0, 0, width, blockSize);
    context.fillRect(0, height - blockSize, width, blockSize);
    context.fillRect(0, 0, blockSize, width);
    context.fillRect(width - blockSize, 0, blockSize, height);

  }
  let drawResult = () => {
    context.textBaseline = 'top';
    context.textAlign = 'left';
    context.font = '20px sans-serif';
    context.fillText('Score: ' + result, blockSize, blockSize);
  }

  let gameOver = () => {
    clearInterval(idInterval);
    context.font = '50px sans-serif';
    context.fillStyle = 'Black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Game Over', width / 2, height / 2);
  }
  let Block = function (col, row) {
    this.col = col;
    this.row = row;
  }

  Block.prototype.drawRect = function (color) {
    let x = this.col * blockSize;
    let y = this.row * blockSize;
    context.fillStyle = color;
    context.fillRect(x, y, blockSize, blockSize);
  }

  Block.prototype.compare = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
  }

  let apple = new Block(6, 5);

  let snake = () => {
    this.segments = [
      new Block(7, 5),
      new Block(6, 5),
      new Block(6, 5)
    ]
    this.direction = 'right';
    this.nextDirection = 'right';
  }

  let idInterval = setInterval(() => {
    context.clearRect(0, 0, height, width);
    apple.drawRect('red');
    // drawResult();
    // snake.move();
    // snake.draw();
    // apple.draw();
    drawFrame();
  }, 1000)

});