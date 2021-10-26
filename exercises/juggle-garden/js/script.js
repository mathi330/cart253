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
let numGreenBalls = 4;
let purpleBalls = [];
let numPurpleBalls = 2;
let redBalls = [];
let numRedBalls = 2;

//Timer
let beginTimer = true;
// 60 frames per second so 60 times the number of seconds I want.
let numSec = 60 * 7;
let myTimer = numSec;

function setup() {
  createCanvas(windowWidth, windowHeight);

  paddle = new Paddle(300, 20);

  for (let i = 0; i < numGreenBalls; i++) {
    let x = random(0, width);
    let y = random(-400, -100);
    let greenBall = new GreenBall(x, y);
    greenBalls.push(greenBall);
  }

  for (let i = 0; i < numRedBalls; i++) {
    let x = random(0, width);
    let y = random(-400, -100);
    let redBall = new RedBall(x, y);
    redBalls.push(redBall);
  }

  for (let i = 0; i < numPurpleBalls; i++) {
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

    case `dead`:
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

  //Timer.
  if (beginTimer) {
    myTimer--;
  }

  //Make new balls fall every time the timer gets to 0.
  if (myTimer === 0) {
    let howManyGreenBalls = random(numGreenBalls);
    for (let i = 0; i < howManyGreenBalls; i++) {
      let x = random(0, width);
      let y = random(-400, -100);
      let greenBall = new GreenBall(x, y);
      greenBalls.push(greenBall);
    }
    let howManyRedBalls = random(numRedBalls);
    for (let i = 0; i < howManyRedBalls; i++) {
      let x = random(0, width);
      let y = random(-400, -100);
      let redBall = new RedBall(x, y);
      redBalls.push(redBall);
    }
    let howManyPurpleBalls = random(numPurpleBalls);
    for (let i = 0; i < howManyPurpleBalls; i++) {
      let x = random(0, width);
      let y = random(-400, -100);
      let purpleBall = new PurpleBall(x, y);
      purpleBalls.push(purpleBall);
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
  for (let i = 0; i < redBalls.length; i++) {
    let redBall = redBalls[i];
    if (redBall.active) {
      redBall.gravity();
      redBall.move();
      redBall.bounce(paddle);
      redBall.display();
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

function ending() {}
