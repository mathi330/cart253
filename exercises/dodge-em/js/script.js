/**
Dodge 'em
Mathilde Davan

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let covid = {
  xCoordinates: {
    x0: 0,
    x1: 0,
    x2: 0,
  },
  yCoordinates: {
    y0: 0,
    y1: 0,
    y2: 0,
  },
  xVector: {
    vx0: 0,
    vx1: 0,
    vx2: 0,
  },
  yVector: {
    vy0: 0,
    vy1: 0,
    vy2: 0,
  },
  speedx: 5,
  speedy: 2,
  size: 50,
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

  covid.xVector.vx0 = covid.speedx;
  covid.xVector.vx1 = covid.speedx;
  covid.xVector.vx2 = covid.speedx;

  covid.yVector.vy0 = covid.speedy;
  covid.yVector.vy1 = covid.speedy;
  covid.yVector.vy2 = covid.speedy;

  covid.xCoordinates.x0 = random(windowWidth);
  covid.xCoordinates.x1 = random(windowWidth);
  covid.xCoordinates.x2 = random(windowWidth);

  covid.yCoordinates.y0 = random(windowHeight);
  covid.yCoordinates.y1 = random(windowHeight);
  covid.yCoordinates.y2 = random(windowHeight);
}

/**
Description of draw()
*/
function draw() {
  background(0);

  fill(255, 0, 0);
  noStroke();

  //Create the first covide-19 virus.
  covid.xCoordinates.x0 += covid.xVector.vx0;
  covid.yCoordinates.y0 += covid.yVector.vy0;
  ellipse(covid.xCoordinates.x0, covid.yCoordinates.y0, covid.size);

  //If statement to make the circle appear back into the the canvas.
  if (
    covid.xCoordinates.x0 >= width ||
    covid.xCoordinates.x0 <= 0 ||
    covid.yCoordinates.y0 >= height ||
    covid.yCoordinates.y0 <= 0
  ) {
    covid.xCoordinates.x0 = random(0, windowWidth);
    covid.yCoordinates.y0 = random(0, windowHeight);

    //Changes the direction of the circle depending on its coordinates.
    if (covid.xCoordinates.x0 >= width / 2) {
      covid.speedx = -covid.speedx;
    }
    if (covid.yCoordinates.y0 >= height / 2) {
      covid.speedy = -covid.speedy;
    }
    covid.xVector.vx0 = covid.speedx;
    covid.yVector.vy0 = covid.speedy;
  }

  //Create the second covide-19 virus.
  covid.xCoordinates.x1 += covid.xVector.vx1;
  covid.yCoordinates.y1 += covid.yVector.vy1;
  ellipse(covid.xCoordinates.x1, covid.yCoordinates.y1, covid.size);

  if (
    covid.xCoordinates.x1 >= width ||
    covid.xCoordinates.x1 <= 0 ||
    covid.yCoordinates.y1 >= height ||
    covid.yCoordinates.y1 <= 0
  ) {
    covid.xCoordinates.x1 = random(0, windowWidth);
    covid.yCoordinates.y1 = random(0, windowHeight);
    if (covid.xCoordinates.x1 >= width / 2) {
      covid.speedx = -covid.speedx;
    }
    if (covid.yCoordinates.y1 >= height / 2) {
      covid.speedy = -covid.speedy;
    }
    covid.xVector.vx1 = covid.speedx;
    covid.yVector.vy1 = covid.speedy;
  }

  //Create the third covide-19 virus.
  covid.xCoordinates.x2 += covid.xVector.vx2;
  covid.yCoordinates.y2 += covid.yVector.vy2;
  ellipse(covid.xCoordinates.x2, covid.yCoordinates.y2, covid.size);

  if (
    covid.xCoordinates.x2 >= width ||
    covid.xCoordinates.x2 <= 0 ||
    covid.yCoordinates.y2 >= height ||
    covid.yCoordinates.y2 <= 0
  ) {
    covid.xCoordinates.x2 = random(0, windowWidth);
    covid.yCoordinates.y2 = random(0, windowHeight);
    if (covid.xCoordinates.x2 >= width / 2) {
      covid.speedx = -covid.speedx;
    }
    if (covid.yCoordinates.y2 >= height / 2) {
      covid.speedy = -covid.speedy;
    }
    covid.xVector.vx2 = covid.speedx;
    covid.yVector.vy2 = covid.speedy;
  }
}
