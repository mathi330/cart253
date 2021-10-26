/**
Juggle Garden
Mathilde Davan

This project is about emotional well-being where different emotions are represented by colored circles.
Each emotions interacts differently with the paddle controlled by the player with the left and right arrow keys.
Happiness (yellow) will make the paddle a little bigger, anger (red) a little smaller, sadness (blue) much smaller, and love (pink) won't change it.
The game has 2 possible endings. One is a bad ending if the paddle disappears completely, and the good ending can happen in 2 ways.
Either if the paddle got to its maximum size (half the width of the canvas) or if the player was able to make the love get to its maximum size.
However, love only appears once at the beginning of the game, so once it fell, the player cannot win through this way.

*/

"use strict";

let state = `title`;

let decorations = [];
let numDeco = 10;

let paddle;

let love;

let happy = [];
let numHappiness = 4;
let angry = [];
let numAnger = 2;
let sad = [];
let numSadness = 2;

//Timer
let beginTimer = true;
// 60 frames per second so 60 times the number of seconds I want.
let numSec = 60 * 7;
let myTimer = numSec;

//Sets up the game at the beginning.
function setup() {
  createCanvas(windowWidth, windowHeight);

  setupDeco();
  setupEmotions();
}

//Sets up the deco for the background of the title and endings.
function setupDeco() {
  let chooseColor = [
    color(100, 100, 255, 100), //blue = sadness
    color(255, 255, 0, 100), //yellow = happiness
    color(255, 100, 100, 100), //red = anger
    color(255, 51, 255, 100), //pink = love
  ];
  for (let i = 0; i < numDeco; i++) {
    let x = random(0, width);
    let y = random(-400, -100);
    let myDeco = new Deco(x, y, chooseColor);
    decorations.push(myDeco);
  }
}

//Sets up the different emotions in the simulation and the paddle.
function setupEmotions() {
  paddle = new Paddle(300, 20);

  love = new Love(); //pink

  for (let i = 0; i < numHappiness; i++) {
    let happyBubble = new Happiness();
    happy.push(happyBubble);
  } //yellow

  for (let i = 0; i < numAnger; i++) {
    let angryBubble = new Anger();
    angry.push(angryBubble);
  } //red

  for (let i = 0; i < numSadness; i++) {
    let sadBubble = new Sadness();
    sad.push(sadBubble);
  } //blue
}

//Calls the different states
function draw() {
  background(0, 200); //slightly transparent to give a little after-image of the falling bubbles

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
  //Displaying the decorations (and make them move).
  for (let i = 0; i < decorations.length; i++) {
    let myDeco = decorations[i];
    myDeco.gravity();
    myDeco.move();
    myDeco.bounce();
    myDeco.display();
  }

  //text with title an instructions.
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

//Simulation
function simulation() {
  if (paddle.active) {
    paddle.move();
    paddle.handleFriction();
    paddle.display();
  }
  //lose or win depending on the size of the paddle.
  else {
    state = `lose`;
  }
  if (paddle.win) {
    state = `win`;
  }

  //Creates love.
  if (love.active) {
    love.gravity();
    love.move();
    love.bounce(paddle);
    love.display();
  }
  //Win if the bubble gets bigger than 50.
  if (love.win) {
    state = `win`;
  }

  //Timer.
  if (beginTimer) {
    myTimer--;
  }

  //Make new balls/emotions fall every time the timer gets to 0.
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

  //Displays the emotions (and make them move).
  for (let i = 0; i < happy.length; i++) {
    let happyBubble = happy[i];
    if (happyBubble.active) {
      happyBubble.gravity();
      happyBubble.move();
      happyBubble.bounce(paddle);
      happyBubble.display();
    }
  }

  for (let i = 0; i < angry.length; i++) {
    let angryBubble = angry[i];
    if (angryBubble.active) {
      angryBubble.gravity();
      angryBubble.move();
      angryBubble.bounce(paddle);
      angryBubble.display();
    }
  }

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

// Displays this ending page if the player loses.
function loseEnding() {
  //Decorations just life for the title page.
  for (let i = 0; i < decorations.length; i++) {
    let myDeco = decorations[i];
    myDeco.gravity();
    myDeco.move();
    myDeco.bounce();
    myDeco.display();
  }

  //Text.
  push();
  fill(255);
  textFont(`Balsamiq Sans`);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(
    `You feel empty, uncapable of remembering what joy feels like...`,
    width / 2,
    height / 2
  );
  textAlign(CENTER, BOTTOM);
  textSize(20);
  text(`Click any key to try again`, width / 2, (height / 5) * 4);
  pop();
}

// Displays this ending page if the player wins.
function winEnding() {
  //Decorations just life for the title page.
  for (let i = 0; i < decorations.length; i++) {
    let myDeco = decorations[i];
    myDeco.gravity();
    myDeco.move();
    myDeco.bounce();
    myDeco.display();
  }

  //Text.
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

//Changes the state when a key is pressed according to the current state.
function keyPressed() {
  //if the state is title, go to the simulation.
  if (state === `title`) {
    state = `simulation`;
  }
  //If the state is win or lose, go to the title.
  else if (state === `lose` || state === `win`) {
    for (let i = 0; i < happy.length; i++) {
      happy[i].active = false;
    }
    for (let i = 0; i < angry.length; i++) {
      angry[i].active = false;
    }
    for (let i = 0; i < sad.length; i++) {
      sad[i].active = false;
    }
    state = `title`;
    //resets the decorations for the new game.
    decorations = [];
    setupDeco();
  }
}

//Adds a decoration at the mouse's coordinates when the state is not simulation.
function mousePressed() {
  if (state !== `simulation`) {
    let chooseColor = [
      color(100, 100, 255, 100),
      color(100, 255, 100, 100),
      color(255, 100, 100, 100),
      color(255, 51, 255, 100),
    ];
    let myDeco = new Deco(mouseX, mouseY, chooseColor);
    decorations.push(myDeco);
  }
}
