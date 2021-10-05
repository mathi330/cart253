/**
Love, Actually
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

/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  setupMe();
}

function setupMe() {
  //Sets the coordinates and the speed of "me."
  me.x = width / 2;
  me.y = height / 2;

  me.vx = me.speed;
  me.vy = me.speed;
}

/**
Description of draw()
*/
function draw() {
  background(0);

  moveMe();
  checkOffScreenMe();
  displayMe();
}

function moveMe() {
  //Make "me" move with the arrow keys on the keyboard.
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

function checkOffScreenMe() {
  //Sees if "me" is off screen, and if it is, it will appear on the opposite side of the canvas.
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

function displayMe() {
  //Display "me"
  fill(me.fill.r, me.fill.g, me.fill.b, me.fill.a);
  ellipse(me.x, me.y, me.size);
}
