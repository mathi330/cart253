/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let state = `title`;

let paddle;

let balls = [];
let numBalls = 5;

//Timer
let beginTimer = true;
// 60 frames per second so 60 times the number of seconds I want.
let numSec = 60 * 4;
let myTimer = numSec;

function setup() {
  createCanvas(windowWidth, windowHeight);

  paddle = new Paddle(300, 20);

  for (let i = 0; i < numBalls; i++) {
    let x = random(0, width);
    let y = random(-400, -100);
    let ball = new Ball(x, y);
    balls.push(ball);
  }
}

function draw() {
  background(0);

  paddle.move();
  paddle.handleFriction();
  paddle.display();
  paddle.die(state);

  //Makes new balls appear every time the timer gets to 0.
  if (beginTimer) {
    myTimer--;
  }
  if (myTimer === 0) {
    let howManyBalls = random(1, numBalls);
    for (let i = 0; i < howManyBalls; i++) {
      let x = random(0, width);
      let y = random(-400, -100);
      let ball = new Ball(x, y);
      balls.push(ball);
    }
    myTimer = numSec;
  }

  //Creates the balls with all the necessary information.
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (ball.active) {
      ball.gravity();
      ball.move();
      ball.bounce(paddle);
      ball.display();
    }
  }
}
