/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let state = `animation`;

let paddle;

let greenBalls = [];
let purpleBalls = [];
let numBalls = 3;

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
    let greenBall = new GreenBall(x, y);
    greenBalls.push(greenBall);
  }
  for (let i = 0; i < numBalls; i++) {
    let x = random(0, width);
    let y = random(-400, -100);
    let purpleBall = new PurpleBall(x, y);
    purpleBalls.push(purpleBall);
  }
}

function draw() {
  background(0);

  switch (state) {
    case `title`:
      title();
      break;

    case `animation`:
      animation();
      break;

    case `ending`:
      ending();
      break;
  }
}

function title() {}

function animation() {
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
      let greenBall = new GreenBall(x, y);
      greenBalls.push(greenBall);
    }
    myTimer = numSec;
  }

  //Creates the balls with all the necessary information.
  for (let i = 0; i < greenBalls.length; i++) {
    let greenBall = greenBalls[i];
    if (greenBall.active) {
      greenBall.gravity();
      greenBall.move();
      greenBall.bounce(paddle);
      greenBall.display();
    }
  }

  //Creates the balls with all the necessary information.
  for (let i = 0; i < purpleBalls.length; i++) {
    let purpleBall = purpleBalls[i];
    if (purpleBall.active) {
      purpleBall.gravity();
      purpleBall.move();
      purpleBall.bounce(paddle);
      purpleBall.display();
    }
  }
}
