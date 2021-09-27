/**
Dodging COVID-19
Mathilde Davan

Blah, blah, blah...
*/

"use strict";

let covid = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5,
  fill: {
    r: 255,
    g: 0,
    b: 0,
  },
};

let user = {
  x: undefined,
  y: undefined,
  size: 80,
  fill: 255,
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
  covid.y = random(0, height);
  covid.vx += covid.speed;
}

/**
Description of draw()
*/
function draw() {
  background(0);

  user.x = mouseX;
  user.y = mouseY;

  //Covid-19
  push();
  fill(covid.fill.r, covid.fill.g, covid.fill.b);
  noStroke();

  covid.x += covid.vx;
  covid.y += covid.vy;
  ellipse(covid.x, covid.y, covid.size);
  pop();

  if (covid.x >= width) {
    covid.x = 0;
    covid.y = random(0, height);
  }

  //user
  push();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}
