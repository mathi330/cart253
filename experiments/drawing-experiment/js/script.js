"use strict";

/**************************************************
Template p5 project
Pippin Barr

Playing around with colors and shapes.
**************************************************/

// setup()
//
// Description of setup() goes here.
function setup() {
  ellipseMode(CORNER);

  createCanvas(900, 500);
  background(200, 0, 100);

  noStroke(1);
  fill(210, 0, 100, 100);
  rotate(PI / 100.0);
  rect(20, 0, 880, 480, 0, 25, 0, 0);

  fill(220, 0, 100, 100);
  rotate(PI / 90.0);
  rect(20, 0, 880, 480, 0, 25, 0, 0);

  fill(230, 0, 100, 100);
  rotate(PI / 80.0);
  rect(20, 0, 880, 480, 0, 25, 0, 0);

  fill(240, 0, 100, 100);
  rotate(PI / 70.0);
  rect(20, 0, 880, 480, 0, 25, 0, 0);

  fill(250, 0, 100, 100);
  rotate(PI / 60.0);
  rect(20, 0, 880, 480, 0, 25, 0, 0);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  stroke(0, 0, 0, 10);
  noFill();
  triangle(width/2, height/2, width/2 + 69, height/2, width/2, height/2 + 69);

  noStroke();
  fill(204, 204, 255, 120);
  ellipse(width/2, height/2, 40, 40);
  fill(195, 195, 246, 120);
  ellipse(width/2, height/2, 30, 30);
  fill(186, 186, 237, 120);
  ellipse(width/2, height/2, 20, 20);
  fill(177, 177, 228, 120);
  ellipse(width/2, height/2, 10, 10);

  stroke(255);
  strokeWeight(2);
  line(0, 0, width/6, height/3);
  line(width/6, height/3, width/4, height/5);
  line(width/4, height/5, width/7*3, height/3*2);
  line(width/7*3, height/3*2, width/9*8, height/7*4);
  line(width/9*8, height/7*4, width, height);
}
