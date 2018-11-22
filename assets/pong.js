$(document).ready(function () {
const canvas = document.getElementById('pong'),
      ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;
let gameWidth = canvas.width;

const updateGameWindow = () => {
  gameWidth = canvas.width;
  computerPaddel = canvas.width -30;
}

function Paddel(width, height, color, posX, posY) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.posX = posX;
  this.posY = posY;
  this.speed = 3;
  this.middleHeight = height / 2;
}

function Ball(size, color, posX, posY) {
  this.width = size;
  this.height = size;
  this.color = color;
  this.posX = posX;
  this.posY = posY;
  this.middleHeight = size / 2;
  this.speedX = 2;
  this.speedY = 2;
  this.directionX = true; //true - w prawo
  this.directionY = false //true - w dół
}

const drawObject = (collisionObjects, context) => {
  collisionObjects.map((collisionObject) => {
    context.fillStyle = collisionObject.color;
    context.fillRect(collisionObject.posX, collisionObject.posY, collisionObject.width, collisionObject.height);
    
  })
}


const collisionObjects = [];

const playerPaddel = new Paddel(20,120,'#fbc531',10,50);
const aiPaddel = new Paddel(20,120,'#c23616',canvas.width - 30 , 100);
const ball1 = new Ball(10, '#f5f6fa', canvas.width/2 - 4, canvas.height/2 - 4);

collisionObjects.push(playerPaddel, aiPaddel, ball1);

const run = () => {
  if (gameWidth !== canvas.width) {
    updateGameWindow();
  }
  drawObject(collisionObjects, ctx);
}

let timer = setInterval(run, 1000/ 60);

});