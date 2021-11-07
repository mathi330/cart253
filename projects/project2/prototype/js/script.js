/**
Prototype
Mathilde Davan

To do:
- Create a weird shape
- Make it move using noise
    - Experiment with different kind of movements
        - Whole shape moving (red)
        - Each point moving independently (blue)
        - Both of the above at once (green)
*/

"use strict";

let myRedShape = {
  xOiginPoint: 500,
  yOriginPoint: 100,

  x0: 0,
  y0: 0,
  x1: 80,
  y1: -40,
  x2: 20,
  y2: 20,
  x3: 90,
  y3: 10,

  x4: 70,
  y4: 40,
  x5: 50,
  y5: 80,
  x6: 0,
  y6: 90,

  x7: -20,
  y7: 70,
  x8: 50,
  y8: 30,

  xoff: 0,
  numberOfPoints: 9,
};

let myBlueShape = {
  x0: 540,
  y0: 500,
  x1: 640,
  y1: 510,
  x2: 560,
  y2: 550,
  x3: 500,
  y3: 580,
  x4: 520,
  y4: 590,
  x5: 440,
  y5: 590,
  x6: 540,
  y6: 530,
  x7: 570,
  y7: 510,
};

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
  // myRedShapes();
  // myCurveVertexShapes();
  myQuadraticVertexShapes();
  movingShapes();
}

function myRedShapes() {
  //Create a shape using bezierVertex()
  push();
  strokeWeight(5);
  fill(255, 100);
  stroke(255, 0, 0, 100);

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
  fill(255, 100);
  stroke(0, 255, 0, 100);

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
  curveVertex(325, 325); // smooth
  curveVertex(350, 300); //start
  curveVertex(375, 325);
  curveVertex(400, 350);
  curveVertex(375, 375);
  curveVertex(350, 400);
  curveVertex(325, 375);
  curveVertex(300, 350);
  curveVertex(325, 325);
  curveVertex(350, 300); //end
  curveVertex(375, 325);
  endShape();
  pop();
}

function myQuadraticVertexShapes() {
  //Create a shape using quadraticVertex()
  push();
  strokeWeight(5);
  fill(255, 100);
  stroke(0, 0, 255, 100);

  //Start 1st shape
  beginShape();
  vertex(100, 500);
  quadraticVertex(200, 510, 120, 550);
  quadraticVertex(60, 580, 80, 590);
  quadraticVertex(0, 590, 100, 530);
  quadraticVertex(130, 510, 100, 500);
  endShape();

  //Start 2nd shape
  beginShape();
  vertex(250, 530);
  quadraticVertex(270, 450, 300, 490);
  quadraticVertex(330, 550, 270, 550);
  quadraticVertex(290, 610, 250, 590);
  quadraticVertex(200, 560, 250, 530);
  endShape();

  //Start 3rd shape
  beginShape();
  vertex(400, 500);
  quadraticVertex(500, 510, 420, 550);
  quadraticVertex(360, 580, 380, 590);
  quadraticVertex(300, 590, 400, 530);
  quadraticVertex(430, 510, 400, 500);
  endShape();
  pop();
}

function movingShapes() {
  // movingRed();
  // movingGreen();

  movingBlue();
}

function movingRed() {
  //bezierVertex (red)

  //noise move (whole shape moving)
  myRedShape.xOiginPoint = map(noise(myRedShape.xoff), 0, 1, 0, width);
  myRedShape.yOriginPoint = map(noise(myRedShape.xoff + 100), 0, 1, 0, height);

  myRedShape.xoff += 0.003;

  push();
  strokeWeight(5);
  // fill(255);
  noFill();
  stroke(255, 0, 0);

  beginShape();
  vertex(
    myRedShape.xOiginPoint + myRedShape.x0,
    myRedShape.yOriginPoint + myRedShape.y0
  );
  bezierVertex(
    myRedShape.xOiginPoint + myRedShape.x1,
    myRedShape.yOriginPoint + myRedShape.y1,
    myRedShape.xOiginPoint + myRedShape.x2,
    myRedShape.yOriginPoint + myRedShape.y2,
    myRedShape.xOiginPoint + myRedShape.x3,
    myRedShape.yOriginPoint + myRedShape.y3
  );
  bezierVertex(
    myRedShape.xOiginPoint + myRedShape.x4,
    myRedShape.yOriginPoint + myRedShape.y4,
    myRedShape.xOiginPoint + myRedShape.x5,
    myRedShape.yOriginPoint + myRedShape.y5,
    myRedShape.xOiginPoint + myRedShape.x6,
    myRedShape.yOriginPoint + myRedShape.y6
  );
  bezierVertex(
    myRedShape.xOiginPoint + myRedShape.x7,
    myRedShape.yOriginPoint + myRedShape.y7,
    myRedShape.xOiginPoint + myRedShape.x8,
    myRedShape.yOriginPoint + myRedShape.y8,
    myRedShape.xOiginPoint + myRedShape.x0,
    myRedShape.yOriginPoint + myRedShape.y0
  );
  endShape();
  pop();
}

function movingGreen() {
  //curveVertex (green)
  push();
  strokeWeight(5);
  fill(255);
  stroke(0, 255, 0);

  beginShape();
  curveVertex(475, 325); // smooth
  curveVertex(500, 300); //start
  curveVertex(525, 325);
  curveVertex(550, 350);
  curveVertex(525, 375);
  curveVertex(500, 400);
  curveVertex(475, 375);
  curveVertex(450, 350);
  curveVertex(475, 325);
  curveVertex(500, 300); //end
  curveVertex(525, 325);
  endShape();
  pop();
}

function movingBlue() {
  //quadraticVertex (blue)
  push();
  strokeWeight(5);
  fill(255);
  stroke(0, 0, 255);

  beginShape();
  vertex(myBlueShape.x0, myBlueShape.y0);
  quadraticVertex(
    myBlueShape.x1,
    myBlueShape.y1,
    myBlueShape.x2,
    myBlueShape.y2
  );
  quadraticVertex(
    myBlueShape.x3,
    myBlueShape.y3,
    myBlueShape.x4,
    myBlueShape.y4
  );
  quadraticVertex(
    myBlueShape.x5,
    myBlueShape.y5,
    myBlueShape.x6,
    myBlueShape.y6
  );
  quadraticVertex(
    myBlueShape.x7,
    myBlueShape.y7,
    myBlueShape.x0,
    myBlueShape.y0
  );
  endShape();
  pop();
}
