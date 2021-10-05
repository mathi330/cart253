/**
Looking for love
Mathilde Davan

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

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
  image: undefined,
  x: undefined,
  y: undefined,
  size: undefined,
  vx: 0,
  vy: 0,
  speed: 10,
  tx: 0,
  ty: 10,
  blackHeart: undefined,
  blueHeart: undefined,
  greenHeart: undefined,
  orangeHeart: undefined,
  pinkHeart: undefined,
  purpleHeart: undefined,
  redHeart: undefined,
  whiteHeart: undefined,
  yellowHeart: undefined,
};

/**
preload()


*/
function preload() {
  hearts.blackHeart = loadImage("assets/images/black-heart.png");

  hearts.blueHeart = loadImage("assets/images/blue-heart.png");
  hearts.greenHeart = loadImage("assets/images/green-heart.png");
  hearts.orangeHeart = loadImage("assets/images/orange-heart.png");
  hearts.pinkHeart = loadImage("assets/images/pink-heart.png");
  hearts.purpleHeart = loadImage("assets/images/purple-heart.png");
  hearts.redHeart = loadImage("assets/images/red-heart.png");
  hearts.whiteHeart = loadImage("assets/images/white-heart.png");
  hearts.yellowHeart = loadImage("assets/images/yellow-heart.png");

  hearts.image = hearts.blueHeart;
}

/**
setup()


*/
function setup() {
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  setupMe();

  hearts.x = random(0, width);
  hearts.y = random(0, height);
  hearts.size = random(100, 150);
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

  moveMe();
  checkOffScreenMe();
  displayMe();

  //hearts
  hearts.tx += 0.005;
  hearts.ty += 0.005;

  let noiseX = noise(hearts.tx);
  let noiseY = noise(hearts.ty);

  hearts.vx = map(noiseX, 0, 1, -hearts.speed, hearts.speed);
  hearts.vy = map(noiseY, 0, 1, -hearts.speed, hearts.speed);

  hearts.x += hearts.vx;
  hearts.y += hearts.vy;
  checkOffScreenHearts();

  image(hearts.image, hearts.x, hearts.y, hearts.size, hearts.size);
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

function checkOffScreenHearts() {
  //Sees if "hearts" is off screen, and if it is, it will appear on the opposite side of the canvas.
  if (hearts.x < 0) {
    hearts.x = width;
  }
  if (hearts.x > width) {
    hearts.x = 0;
  }
  if (hearts.y < 0) {
    hearts.y = height;
  }
  if (hearts.y > height) {
    hearts.y = 0;
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
