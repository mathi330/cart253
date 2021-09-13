"use strict";

/**************************************************
Drawing experiment
Mathilde Davan

Experiment with p5's drawing and color functions.

Abstract image of a landscape.
**************************************************/

// setup()
//
// Draws the background of the lanscape.
function setup() {
  ellipseMode(CORNER);

  createCanvas(900, 500);
  //Set backround to red-pink.
  background(200, 0, 100);

  //Draw 5 rectangles rotated in the background with colors creating a gradient.
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
// Draws the foreground of the landscape.
function draw() {
  //Draw a triangle with a black stroke and no fill.
  stroke(0);
  noFill();
  triangle(width/2, height/2, width/2 + 69, height/2, width/2, height/2 + 69);

  //Draw a cone with a blue-purple gradient.
  noStroke();
  fill(204, 204, 255);
  ellipse(width/2, height/2, 40, 40);
  fill(195, 195, 246);
  ellipse(width/2, height/2, 30, 30);
  fill(186, 186, 237);
  ellipse(width/2, height/2, 20, 20);
  fill(177, 177, 228);
  ellipse(width/2, height/2, 10, 10);

  //Draw the line of the mountains as white line (from top-left corner to bottom-right corner).
  stroke(255);
  strokeWeight(2);
  line(0, 0, width/6, height/3);
  line(width/6, height/3, width/4, height/5);
  line(width/4, height/5, width/7*3, height/3*2);
  line(width/7*3, height/3*2, width/9*8, height/7*4);
  line(width/9*8, height/7*4, width, height);
}
