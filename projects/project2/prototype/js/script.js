/**
Prototype
Mathilde Davan

To do:
- Create a weird shape
- Make it move using noise
    - Experiment with different kind of movements
        - Whole shape moving
        - Each point moving independently
        - Both of the above at once
    - Use random (just to see)
*/

"use strict";

/**
Description of setup
*/
function setup() {
  createCanvas(700, 700);
}

/**
Description of draw()
*/
function draw() {
  background(0);

  //Create a shape using bezierVertex()
  push();
  strokeWeight(5);
  fill(255);
  stroke(255, 0, 0);

  //Start 1st shape
  beginShape();
  vertex(100, 100);
  bezierVertex(180, 120, 140, 160, 70, 180);
  vertex(100, 100); //Closes the shape (returns to the original point).
  endShape();

  //Start 2nd shape
  beginShape();
  vertex(200, 100);
  bezierVertex(280, 120, 240, 160, 170, 180);
  bezierVertex(170, 180, 250, 130, 200, 100); //To close the shape the last parameters should be the same as the vertex one at the start of the shape.
  endShape();

  //Start 3rd shape
  beginShape();
  vertex(300, 100);
  bezierVertex(380, 70, 320, 120, 390, 110);
  bezierVertex(370, 140, 350, 180, 300, 190);
  bezierVertex(280, 170, 350, 130, 300, 100);
  endShape();
  pop();

  //Create a shape using curveVertex();
  push();
  strokeWeight(5);
  fill(255);
  stroke(255, 0, 0);

  //Start 1st shape
  beginShape();
  curveVertex();
  endShape();
  pop();
}
