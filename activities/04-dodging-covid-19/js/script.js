/**
Dodging COVID-19
Mathilde Davan

This project is a covid-19 simulation where the user (white) needs to avoid the virus (red), otherwise the program stops.
*/

"use strict";

//background static.
let staticAmount = 1000;

//Object for the covid-19 virus.
let covid = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 10,
  fill: {
    r: 255,
    g: 0,
    b: 0,
  },
};

//Object for the user.
let user = {
  x: undefined,
  y: undefined,
  size: 100,
  fill: 255,
};

/**
setup()

Create canvas,
determine Covid-19's y position at the beginning of the program and its speed to move,
erase the cursor on the canvas.
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  covid.y = random(0, height);
  covid.vx += covid.speed;
  noCursor();
}

/**
draw()

Create the background (color + static),
make the covid simulation,
create the user's simulation,
determine the distance between the user and covid to know if they touch (to see if the user is contaminated).
*/
function draw() {
  background(0);
  //Create the static effect.
  for (let i = 0; i < staticAmount; i++) {
    let x = random(0, width);
    let y = random(0, height);
    stroke(255);
    point(x, y);
  }

  //Determine the coordinates of the circle representing he user.
  user.x = mouseX;
  user.y = mouseY;

  //Create the covid-19 simulation.
  push();
  fill(covid.fill.r, covid.fill.g, covid.fill.b);
  noStroke();

  covid.x += covid.vx;
  covid.y += covid.vy;
  ellipse(covid.x, covid.y, covid.size);
  pop();
  //If statement to change the y coordinates everytime x goes back to 0.
  if (covid.x >= width) {
    covid.x = 0;
    covid.y = random(0, height);
  }

  //Create the user's simulation.
  push();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();

  //Evaluating the distance between the covid and the user.
  let d = dist(user.x, user.y, covid.x, covid.y);

  if (d <= covid.size / 2 + user.size / 2) {
    noLoop();
  }
}
