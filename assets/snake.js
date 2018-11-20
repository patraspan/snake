$(document).ready(function () {
  //variables
  let canvas = document.getElementById('snake'),
    context = canvas.getContext('2d'),
    width = canvas.width,
    height = canvas.height,
    blockSize = 10,
    blockWidth = width / blockSize,
    blockHeight = height / blockSize,
    result = 0,
    playing = false;

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
  let playAgain = () => {
    context.textBaseline = 'top';
    context.textAlign = 'middle';
    context.font = '16px sans-serif';
    context.fillText('Refresh to play again', width / 2, height / 2 + 50);
  }

  let gameOver = () => {
    playing = false;
    context.font = '50px sans-serif';
    context.fillStyle = 'Black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Game Over', width / 2, height / 2);
    playAgain();

  }

  // Simple block prototype

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
  // comparing snake's head to other blocks
  Block.prototype.compare = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
  }

  //Snake prototype - as array

  let Snake = function () {
    this.segments = [
      new Block(7, 5),
      new Block(6, 5),
      new Block(6, 5)
    ]
    this.direction = 'right';
    this.nextDirection = 'right';
  }

  //drawing snake
  Snake.prototype.draw = function () {
    for (let i = 0; i < this.segments.length; i++) {
      if (i % 2 === 0) {
        this.segments[i].drawRect("#27ae60");
      } else {
        this.segments[i].drawRect("#2ecc71");
      }

    }
  }

  //moving snake
  Snake.prototype.move = function () {
    let head = this.segments[0];
    let newHead;

    this.direction = this.nextDirection;

    if (this.direction === 'right') {
      newHead = new Block(head.col + 1, head.row)
    } else if (this.direction === 'down') {
      newHead = new Block(head.col, head.row + 1)
    } else if (this.direction === 'left') {
      newHead = new Block(head.col - 1, head.row)
    } else if (this.direction === 'up') {
      newHead = new Block(head.col, head.row - 1)
    }

    if (this.detectCollision(newHead)) {
      gameOver();
      return;
    }

    this.segments.unshift(newHead);

    if (newHead.compare(apple.position)) {
      result++;
      animationTime -= 1;
      apple.move(this.segments);
    } else {
      this.segments.pop();
    }
  }
  //collision detection
  Snake.prototype.detectCollision = function (head) {
    let leftCollision = (head.col === 0),
      upCollision = (head.row === 0),
      downCollision = (head.row === blockHeight - 1),
      rightCollision = (head.col === blockWidth - 1),
      wallCollision = leftCollision || rightCollision || upCollision || downCollision,
      tailCollision = false;

    for (let i = 0; i < this.segments.length; i++) {
      if (head.compare(this.segments[i])) {
        tailCollision = true;
      }
    }
    return wallCollision || tailCollision;
  }

  Snake.prototype.setDirection = function (newDirection) {
    if (this.direction === "up" && newDirection === "down") {
      return;
    } else if (this.direction === "right" && newDirection === "left") {
      return;
    } else if (this.direction === "down" && newDirection === "up") {
      return;
    } else if (this.direction === "left" && newDirection === "right") {
      return;
    }
    this.nextDirection = newDirection;
  }
  //Apple
  //random apple position - letiables

  let Apple = function (newDirection) {

    this.position = new Block(10, 10)
  }
  Apple.prototype.draw = function () {
    this.position.drawRect("#c0392b")
  }


  Apple.prototype.move = function (occupiedBlocks) {
    let randomCol = Math.floor(Math.random() * (blockWidth - 2) + 1);
    let randomRow = Math.floor(Math.random() * (blockHeight - 2) + 1);
    this.position = new Block(randomCol, randomRow);
    for (var i = 0; i < occupiedBlocks.length; i++) {
      if (this.position.compare(occupiedBlocks[i])) {
        this.move(occupiedBlocks); // Call the move method again
        return;
      }
    }
  }

  // Create the snake and apple objects
  let snake = new Snake();
  let apple = new Apple();

  // let playing = true;
  let animationTime = 60;

  // Create a game loop function, which will call itself using setTimeout
  let gameLoop = function () {
    context.clearRect(0, 0, width, height);
    playing = true;
    drawResult();
    snake.move();
    snake.draw();
    apple.draw();
    drawFrame();

    // This is set to false by the gameOver function
    if (playing) {
      setTimeout(gameLoop, animationTime);
    }
  };
  // Start the game loop
  gameLoop();

  //directions markup
  let directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  }

  $("body").keydown(function (e) {
    e.preventDefault();
    let newDirection = directions[e.keyCode];
    if (newDirection !== undefined) {
      snake.setDirection(newDirection)
    }
    if (e.keyCode === 13) {
      console.log("enter")
    }
  });
});