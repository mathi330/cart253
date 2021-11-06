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
  myBezierVertexShapes();
  myCurveVertexShapes();
  // myQuadraticVertexShapes();
}

function myBezierVertexShapes() {
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
}

function myCurveVertexShapes() {
  //Create a shape using curveVertex();
  push();
  strokeWeight(5);
  fill(255);
  stroke(0, 255, 0);

  //Start 1st shape
  beginShape();
  curveVertex(100, 300); //Not visible in the curve but serves to close the curve
  curveVertex(100, 300); //    --
  curveVertex(140, 320); //     |
  curveVertex(120, 360); //     |-- The different points used to create the curve
  curveVertex(70, 380); //      |
  curveVertex(100, 300); //    --
  curveVertex(100, 300); //Same as first point (creates a sharp angle)
  endShape();

  //Start 2nd shape
  beginShape();
  curveVertex(170, 380); //Not visible in the curve but used to make the starting point curved and not sharp
  curveVertex(200, 300);
  curveVertex(230, 320);
  curveVertex(240, 300);
  curveVertex(260, 310);
  curveVertex(250, 360);
  curveVertex(220, 390);
  curveVertex(200, 380);
  curveVertex(170, 380);
  curveVertex(190, 350);
  curveVertex(200, 300);
  curveVertex(240, 320); //Not visible in the curve but used to make the starting point curved and not sharp
  endShape();

  //Start 3rd shape
  beginShape();
  curveVertex(375, 325); // smooth
  curveVertex(400, 300); //start
  curveVertex(425, 325);
  curveVertex(450, 350);
  curveVertex(425, 375);
  curveVertex(400, 400);
  curveVertex(375, 375);
  curveVertex(350, 350);
  curveVertex(375, 325);
  curveVertex(400, 300); //end
  curveVertex(425, 325);
  endShape();
  pop();
}

function myQuadraticVertexShapes() {
  //Create a shape using quadraticVertex()
  push();
  strokeWeight(5);
  fill(255);
  stroke(0, 0, 255);

  //Start 1st shape
  beginShape();
  vertex(100, 500);
  quadraticVertex(160, 520, 120, 550);
  quadraticVertex(140, 570, 80, 590);
  quadraticVertex(110, 520, 100, 500);
  vertex(100, 500);
  endShape();
  pop();
}
