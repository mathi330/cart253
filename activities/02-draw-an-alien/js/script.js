/**
Draw an alien
Mathilde Davan

In this project, I drew an alien with simple shapes.
*/

"use strict";

/**
Description of preload
*/
function preload() {}

/**
setup()

Set the canvas' size and background color.
*/
function setup() {
  createCanvas(640, 480);

  // background color set to a light purple.
  background(242, 204, 255);
}

/**
draw()

Draw the alien.
*/
function draw() {
  noStroke();
  fill(152, 152, 185);
  //Draw body of the alien.
  ellipse(width / 2, 480, 260, 200);

  //Draw head.
  fill(138, 138, 168);
  ellipse(width / 2, 350, 180, 120);
  ellipse(width / 2, 300, 130, 250);

  //Draw alien's antenna.
  noFill();
  stroke(152, 152, 185);
  strokeWeight(1);
  bezier(width / 2, 175, 320, 10, 370, 155, 395, 140);
  //Draw tip of the antenna.
  strokeWeight(3);
  stroke(255, 255, 102);
  ellipse(400, 137, 10);

  noStroke();
  //Draw eyes.
  fill(0, 0, 0);
  ellipse(285, 265, 40, 100);
  ellipse(355, 265, 40, 100);

  //Draw nostrils.
  ellipse(width / 2 - 10, 330, 8);
  ellipse(width / 2 + 10, 330, 8);

  //Draw mouth.
  stroke(255, 255, 102);
  strokeWeight(5);
  rectMode(CENTER);
  rect(width / 2, 370, 100, 15, 10, 10, 10, 10);
}
