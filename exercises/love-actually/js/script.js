/**
Looking for love
Mathilde Davan

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let state = `title`;

//Object for the element the user can move around ("me").
let me = {
  x: undefined,
  y: undefined,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5,
  fill: {
    r: 255,
    g: 255,
    b: 255,
    a: 255,
  },
};

let hearts = {
  blackHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 0,
    ty: 10,
  },
  blueHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 100,
    ty: 110,
  },
  greenHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 200,
    ty: 210,
  },
  orangeHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 300,
    ty: 310,
  },
  pinkHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 400,
    ty: 410,
  },
  purpleHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 500,
    ty: 510,
  },
  redHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 600,
    ty: 610,
  },
  whiteHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 700,
    ty: 710,
  },
  yellowHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 800,
    ty: 810,
  },
};

/**
preload()


*/
function preload() {
  //images
  hearts.blackHeart.image = loadImage("assets/images/black-heart.png");

  hearts.blueHeart.image = loadImage("assets/images/blue-heart.png");
  hearts.greenHeart.image = loadImage("assets/images/green-heart.png");
  hearts.orangeHeart.image = loadImage("assets/images/orange-heart.png");
  hearts.pinkHeart.image = loadImage("assets/images/pink-heart.png");
  hearts.purpleHeart.image = loadImage("assets/images/purple-heart.png");
  hearts.redHeart.image = loadImage("assets/images/red-heart.png");
  hearts.whiteHeart.image = loadImage("assets/images/white-heart.png");
  hearts.yellowHeart.image = loadImage("assets/images/yellow-heart.png");

  hearts.image = hearts.blueHeart.image;
}

/**
setup()


*/
function setup() {
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  setupMe();
  setupAllHearts();
}

/**
setupHearts

function that sets up "heart."
*/
function setupHearts(heart) {
  heart.x = random(0, width);
  heart.y = random(0, height);
  heart.size = random(100, 150);
}

/**
setupAllHearts

function applying setupHearts to all the colored hears.
*/
function setupAllHearts() {
  setupHearts(hearts.blueHeart);
  setupHearts(hearts.greenHeart);
  setupHearts(hearts.orangeHeart);
  setupHearts(hearts.pinkHeart);
  setupHearts(hearts.purpleHeart);
  setupHearts(hearts.redHeart);
  setupHearts(hearts.whiteHeart);
  setupHearts(hearts.yellowHeart);
}

/**
setupMe()

function to setup the coordinates and speed of "me."
*/
function setupMe() {
  me.x = width / 2;
  me.y = height / 2;

  me.vx = me.speed;
  me.vy = me.speed;
}

/**
draw()


*/
function draw() {
  background(0);

  switch (state) {
    case `title`:
      title();
      break;

    case `simulation`:
      simulation();
      break;

    case `ending`:
      ending();
      break;
  }
}

/**
title()

function for the title of the simulation.
*/
function title() {
  push();
  fill(255);
  textFont(`Quicksand`);
  textAlign(CENTER, CENTER);
  textSize(40);
  textStyle(BOLD);
  text(`Love, Actually`, width / 2, height / 2);
  pop();
}

/**
simulation()

function with everything that happens in the simulation part.
*/
function simulation() {
  justMe();
  allHearts();
}

/**
justMe()

function with all information on "me."
*/
function justMe() {
  moveMe();
  checkOffScreenMe();
  displayMe();
}

/**
moveME()

function to make the interactive element "me" move with the arrow keys of the keyboard.
*/
function moveMe() {
  if (keyIsDown(LEFT_ARROW)) {
    me.x -= me.vx;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    me.x += me.vx;
  }

  if (keyIsDown(UP_ARROW)) {
    me.y -= me.vy;
  }
  if (keyIsDown(DOWN_ARROW)) {
    me.y += me.vy;
  }
}

/**
checkOffScreenMe()

funcion to see if "me" is off screen, and if it is, it will appear on the opposite side of the canvas.
 */
function checkOffScreenMe() {
  if (me.x + me.size / 2 < 0) {
    me.x = width + me.size / 2;
  }
  if (me.x - me.size / 2 > width) {
    me.x = 0 - me.size / 2;
  }
  if (me.y + me.size / 2 < 0) {
    me.y = height + me.size / 2;
  }
  if (me.y - me.size / 2 > height) {
    me.y = 0 - me.size / 2;
  }
}

/**
displayMe()

function to display the interactive element "me."
 */
function displayMe() {
  //Display "me"
  fill(me.fill.r, me.fill.g, me.fill.b, me.fill.a);
  ellipse(me.x, me.y, me.size);
}

/**
allHearts()

function for all that has to do with the hearts in the program.
*/
function allHearts() {
  moveAllHearts();
  checkOffScreenAllHearts();
  displayAllHearts();
}

/**
moveHearts(heart)

function to make a heart move with perlin noise.
 */
function moveHearts(heart) {
  heart.tx += 0.005;
  heart.ty += 0.005;

  let noiseX = noise(heart.tx);
  let noiseY = noise(heart.ty);

  heart.vx = map(noiseX, 0, 1, -heart.speed, heart.speed);
  heart.vy = map(noiseY, 0, 1, -heart.speed, heart.speed);

  heart.x += heart.vx;
  heart.y += heart.vy;
}

/**
moveAllHearts()

function applying moveHearts for all 8 heart images.
 */
function moveAllHearts() {
  moveHearts(hearts.blueHeart);
  moveHearts(hearts.greenHeart);
  moveHearts(hearts.orangeHeart);
  moveHearts(hearts.pinkHeart);
  moveHearts(hearts.purpleHeart);
  moveHearts(hearts.redHeart);
  moveHearts(hearts.whiteHeart);
  moveHearts(hearts.yellowHeart);
}

/**
checkOffScreenHeart(heart)

function to see if "heart" is off screen, and if it is, it will appear on the opposite side of the canvas.
 */
function checkOffScreenHeart(heart) {
  if (heart.x + me.size / 2 < 0) {
    heart.x = width + me.size / 2;
  }
  if (heart.x - me.size / 2 > width) {
    heart.x = 0 - me.size / 2;
  }
  if (heart.y + me.size / 2 < 0) {
    heart.y = height + me.size / 2;
  }
  if (heart.y - me.size / 2 > height) {
    heart.y = 0 - me.size / 2;
  }
}

/**
checkOffScreenAllHearts()

function applying checkOffScreenHeart for all 8 heart images.
 */
function checkOffScreenAllHearts() {
  checkOffScreenHeart(hearts.blueHeart);
  checkOffScreenHeart(hearts.greenHeart);
  checkOffScreenHeart(hearts.orangeHeart);
  checkOffScreenHeart(hearts.pinkHeart);
  checkOffScreenHeart(hearts.purpleHeart);
  checkOffScreenHeart(hearts.redHeart);
  checkOffScreenHeart(hearts.whiteHeart);
  checkOffScreenHeart(hearts.yellowHeart);
}

/**
displayAllHearts(heart)

function to display "heart."
 */
function displayHeart(heart) {
  image(heart.image, heart.x, heart.y, heart.size, heart.size);
}

/**
displayAllHearts()

function applying displayHeart for all 8 heart images.
 */
function displayAllHearts() {
  displayHeart(hearts.blueHeart);
  displayHeart(hearts.greenHeart);
  displayHeart(hearts.orangeHeart);
  displayHeart(hearts.pinkHeart);
  displayHeart(hearts.purpleHeart);
  displayHeart(hearts.redHeart);
  displayHeart(hearts.whiteHeart);
  displayHeart(hearts.yellowHeart);
}

function keyPressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}
