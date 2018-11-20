const canvas = document.getElementById('pong'),
      ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

function Paddel(width, height, color, posX, posY) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.posX = posX;
  this.posY = posY;
  this.speed = 3;
  this.middleHeight = heigh / 2;
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
}