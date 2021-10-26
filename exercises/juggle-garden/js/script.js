/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let state = `title`;

let paddle;

let happy = [];
let numHappiness = 4;
let angry = [];
let numAnger = 2;
let sad = [];
let numSadness = 2;
let love;

//Timer
let beginTimer = true;
// 60 frames per second so 60 times the number of seconds I want.
let numSec = 60 * 7;
let myTimer = numSec;

function setup() {
  createCanvas(windowWidth, windowHeight);

  setupEmotions();
}

function setupEmotions() {
  paddle = new Paddle(300, 20);
  love = new Love();

  for (let i = 0; i < numHappiness; i++) {
    let happyBubble = new Happiness();
    happy.push(happyBubble);
  }

  for (let i = 0; i < numAnger; i++) {
    let angryBubble = new Anger();
    angry.push(angryBubble);
  }

  for (let i = 0; i < numSadness; i++) {
    let sadBubble = new Sadness();
    sad.push(sadBubble);
  }
}

function draw() {
  background(0, 200);

  switch (state) {
    case `title`:
      title();
      break;

    case `simulation`:
      simulation();
      break;

    case `lose`:
      loseEnding();
      break;

    case `win`:
      winEnding();
      break;
  }
}

function title() {
  push();
  fill(255);
  textFont(`Balsamiq Sans`);
  textAlign(CENTER, TOP);
  textSize(20);
  text(
    `Use the left and right arrow keys to move the paddle.`,
    width / 2,
    height / 5
  );
  textAlign(CENTER, CENTER);
  textSize(32);
  text(`Catch the good emotions!`, width / 2, height / 2);
  textAlign(CENTER, BOTTOM);
  textSize(20);
  text(`Click any key to start!`, width / 2, (height / 5) * 4);
  pop();
}

function simulation() {
  if (paddle.active) {
    paddle.move();
    paddle.handleFriction();
    paddle.display();
  } else {
    state = `lose`;
  }
  if (paddle.win) {
    state = `win`;
  }

  //Creates the ball that corresponds to love.
  if (love.active) {
    love.gravity();
    love.move();
    love.bounce(paddle);
    love.display();
  }
  if (love.win) {
    state = `win`;
  }

  //Timer.
  if (beginTimer) {
    myTimer--;
  }

  //Make new balls fall every time the timer gets to 0.
  if (myTimer === 0) {
    let howMuchHappiness = random(numHappiness);
    for (let i = 0; i < howMuchHappiness; i++) {
      let happyBubble = new Happiness();
      happy.push(happyBubble);
    }
    let howMuchAnger = random(numAnger);
    for (let i = 0; i < howMuchAnger; i++) {
      let angryBubble = new Anger();
      angry.push(angryBubble);
    }
    let howMuchSadness = random(numSadness);
    for (let i = 0; i < howMuchSadness; i++) {
      let sadBubble = new Sadness();
      sad.push(sadBubble);
    }
    myTimer = numSec;
  }

  //Creates the balls with all the necessary information.
  for (let i = 0; i < happy.length; i++) {
    let happyBubble = happy[i];
    if (happyBubble.active) {
      happyBubble.gravity();
      happyBubble.move();
      happyBubble.bounce(paddle);
      happyBubble.display();
    }
  }

  //Creates the balls with all the necessary information.
  for (let i = 0; i < angry.length; i++) {
    let angryBubble = angry[i];
    if (angryBubble.active) {
      angryBubble.gravity();
      angryBubble.move();
      angryBubble.bounce(paddle);
      angryBubble.display();
    }
  }

  //Creates the balls with all the necessary information.
  for (let i = 0; i < sad.length; i++) {
    let sadBubble = sad[i];
    if (sadBubble.active) {
      sadBubble.gravity();
      sadBubble.move();
      sadBubble.bounce(paddle);
      sadBubble.display();
    }
  }
}

function loseEnding() {
  push();
  fill(255);
  textFont(`Balsamiq Sans`);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(`No motivation left...`, width / 2, height / 2);
  textAlign(CENTER, BOTTOM);
  textSize(20);
  text(`Click any key to start again!`, width / 2, (height / 5) * 4);
  pop();
}

function winEnding() {
  push();
  fill(255);
  textFont(`Balsamiq Sans`);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(`Happiness will always be by your side! :)`, width / 2, height / 2);
  textAlign(CENTER, BOTTOM);
  textSize(20);
  text(`Click any key to start again!`, width / 2, (height / 5) * 4);
  pop();
}

function keyPressed() {
  if (state === `title`) {
    state = `simulation`;
  } else if (state === `lose` || state === `win`) {
    for (let i = 0; i < happy.length; i++) {
      happy[i].active = false;
    }
    for (let i = 0; i < angry.length; i++) {
      angry[i].active = false;
    }
    for (let i = 0; i < sad.length; i++) {
      sad[i].active = false;
    }
    setupEmotions();
    state = `title`;
  }
}
