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
  xOriginPoint: 500,
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
};

let myBlueShape = {
  xOriginPoint: 500,
  yOriginPoint: 580,

  x0: 40,
  y0: -80,
  x1: 140,
  y1: -70,
  x2: 60,
  y2: -30,
  x3: 0,
  y3: 0,
  x4: 20,
  y4: 10,
  x5: -60,
  y5: 10,
  x6: 40,
  y6: -50,
  x7: 70,
  y7: -70,

  xoff: 0,
};

let myGreenShape = {
  xOriginPoint: 500,
  yOriginPoint: 350,

  x0: 0,
  y0: -50,
  x1: 25,
  y1: -25,
  x2: 50,
  y2: 0,
  x3: 25,
  y3: 25,
  x4: 0,
  y4: 50,
  x5: -25,
  y5: 25,
  x6: -50,
  y6: 0,
  x7: -25,
  y7: -25,

  xoff: 0,
  xoff1: 0,

  distortionRange: 20,
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
  myCurveVertexShapes();
  // myQuadraticVertexShapes();
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
  movingGreen();
  // movingBlue();
}

function movingRed() {
  //bezierVertex (red)

  //noise move (whole shape moving)
  myRedShape.xOriginPoint = map(noise(myRedShape.xoff), 0, 1, 0, width);
  myRedShape.yOriginPoint = map(noise(myRedShape.xoff + 100), 0, 1, 0, height);

  myRedShape.xoff += 0.003;

  push();
  strokeWeight(5);
  // fill(255);
  noFill();
  stroke(255, 0, 0);

  beginShape();
  vertex(
    myRedShape.xOriginPoint + myRedShape.x0,
    myRedShape.yOriginPoint + myRedShape.y0
  );
  bezierVertex(
    myRedShape.xOriginPoint + myRedShape.x1,
    myRedShape.yOriginPoint + myRedShape.y1,
    myRedShape.xOriginPoint + myRedShape.x2,
    myRedShape.yOriginPoint + myRedShape.y2,
    myRedShape.xOriginPoint + myRedShape.x3,
    myRedShape.yOriginPoint + myRedShape.y3
  );
  bezierVertex(
    myRedShape.xOriginPoint + myRedShape.x4,
    myRedShape.yOriginPoint + myRedShape.y4,
    myRedShape.xOriginPoint + myRedShape.x5,
    myRedShape.yOriginPoint + myRedShape.y5,
    myRedShape.xOriginPoint + myRedShape.x6,
    myRedShape.yOriginPoint + myRedShape.y6
  );
  bezierVertex(
    myRedShape.xOriginPoint + myRedShape.x7,
    myRedShape.yOriginPoint + myRedShape.y7,
    myRedShape.xOriginPoint + myRedShape.x8,
    myRedShape.yOriginPoint + myRedShape.y8,
    myRedShape.xOriginPoint + myRedShape.x0,
    myRedShape.yOriginPoint + myRedShape.y0
  );
  endShape();
  pop();
}

function movingGreen() {
  //curveVertex (green)

  //noise
  //Make the wholde shape move
  myGreenShape.xOriginPoint = map(noise(myGreenShape.xoff), 0, 1, 0, width);
  myGreenShape.yOriginPoint = map(
    noise(myGreenShape.xoff + 100),
    0,
    1,
    0,
    height
  );
  myGreenShape.xoff += 0.002;

  //Make each point change
  let x0 = map(
    noise(myGreenShape.xoff1),
    0,
    1,
    myGreenShape.x0 - myGreenShape.distortionRange,
    myGreenShape.x0 + myGreenShape.distortionRange
  );
  let y0 = map(
    noise(myGreenShape.xoff1),
    0,
    1,
    myGreenShape.y0 - myGreenShape.distortionRange,
    myGreenShape.y0 + myGreenShape.distortionRange
  );
  let x1 = map(
    noise(myGreenShape.xoff1 + 300),
    0,
    1,
    myGreenShape.x1 - myGreenShape.distortionRange,
    myGreenShape.x1 + myGreenShape.distortionRange
  );
  let y1 = map(
    noise(myGreenShape.xoff1 + 400),
    0,
    1,
    myGreenShape.y1 - myGreenShape.distortionRange,
    myGreenShape.y1 + myGreenShape.distortionRange
  );
  let x2 = map(
    noise(myGreenShape.xoff1 + 500),
    0,
    1,
    myGreenShape.x2 - myGreenShape.distortionRange,
    myGreenShape.x2 + myGreenShape.distortionRange
  );
  let y2 = map(
    noise(myGreenShape.xoff1 + 600),
    0,
    1,
    myGreenShape.y2 - myGreenShape.distortionRange,
    myGreenShape.y2 + myGreenShape.distortionRange
  );
  let x3 = map(
    noise(myGreenShape.xoff1 + 700),
    0,
    1,
    myGreenShape.x3 - myGreenShape.distortionRange,
    myGreenShape.x3 + myGreenShape.distortionRange
  );
  let y3 = map(
    noise(myGreenShape.xoff1 + 800),
    0,
    1,
    myGreenShape.y3 - myGreenShape.distortionRange,
    myGreenShape.y3 + myGreenShape.distortionRange
  );
  let x4 = map(
    noise(myGreenShape.xoff1 + 900),
    0,
    1,
    myGreenShape.x4 - myGreenShape.distortionRange,
    myGreenShape.x4 + myGreenShape.distortionRange
  );
  let y4 = map(
    noise(myGreenShape.xoff1 + 1000),
    0,
    1,
    myGreenShape.y4 - myGreenShape.distortionRange,
    myGreenShape.y4 + myGreenShape.distortionRange
  );
  let x5 = map(
    noise(myGreenShape.xoff1 + 1100),
    0,
    1,
    myGreenShape.x5 - myGreenShape.distortionRange,
    myGreenShape.x5 + myGreenShape.distortionRange
  );
  let y5 = map(
    noise(myGreenShape.xoff1 + 1200),
    0,
    1,
    myGreenShape.y5 - myGreenShape.distortionRange,
    myGreenShape.y5 + myGreenShape.distortionRange
  );
  let x6 = map(
    noise(myGreenShape.xoff1 + 1300),
    0,
    1,
    myGreenShape.x6 - myGreenShape.distortionRange,
    myGreenShape.x6 + myGreenShape.distortionRange
  );
  let y6 = map(
    noise(myGreenShape.xoff1 + 1400),
    0,
    1,
    myGreenShape.y6 - myGreenShape.distortionRange,
    myGreenShape.y6 + myGreenShape.distortionRange
  );
  let x7 = map(
    noise(myGreenShape.xoff1 + 1500),
    0,
    1,
    myGreenShape.x7 - myGreenShape.distortionRange,
    myGreenShape.x7 + myGreenShape.distortionRange
  );
  let y7 = map(
    noise(myGreenShape.xoff1 + 1600),
    0,
    1,
    myGreenShape.y7 - myGreenShape.distortionRange,
    myGreenShape.y7 + myGreenShape.distortionRange
  );

  myGreenShape.xoff1 += 0.005;

  push();
  strokeWeight(5);
  noFill();
  // fill(255);
  stroke(0, 255, 0);

  beginShape();
  curveVertex(myGreenShape.xOriginPoint + x7, myGreenShape.yOriginPoint + y7);
  curveVertex(myGreenShape.xOriginPoint + x0, myGreenShape.yOriginPoint + y0);
  curveVertex(myGreenShape.xOriginPoint + x1, myGreenShape.yOriginPoint + y1);
  curveVertex(myGreenShape.xOriginPoint + x2, myGreenShape.yOriginPoint + y2);
  curveVertex(myGreenShape.xOriginPoint + x3, myGreenShape.yOriginPoint + y3);
  curveVertex(myGreenShape.xOriginPoint + x4, myGreenShape.yOriginPoint + y4);
  curveVertex(myGreenShape.xOriginPoint + x5, myGreenShape.yOriginPoint + y5);
  curveVertex(myGreenShape.xOriginPoint + x6, myGreenShape.yOriginPoint + y6);
  curveVertex(myGreenShape.xOriginPoint + x7, myGreenShape.yOriginPoint + y7);
  curveVertex(myGreenShape.xOriginPoint + x0, myGreenShape.yOriginPoint + y0);
  curveVertex(myGreenShape.xOriginPoint + x1, myGreenShape.yOriginPoint + y1);
  endShape();

  pop();
}

function movingBlue() {
  //quadraticVertex (blue)

  //noise (need to modify each point according to their coordinates)
  myBlueShape.x0 = map(noise(myBlueShape.xoff), 0, 1, 0, 80);
  myBlueShape.y0 = map(noise(myBlueShape.xoff + 100), 0, 1, -120, -40);

  myBlueShape.x1 = map(noise(myBlueShape.xoff + 200), 0, 1, 100, 180);
  myBlueShape.y1 = map(noise(myBlueShape.xoff + 300), 0, 1, -110, -30);
  myBlueShape.x2 = map(noise(myBlueShape.xoff + 400), 0, 1, 20, 100);
  myBlueShape.y2 = map(noise(myBlueShape.xoff + 500), 0, 1, -70, 10);

  myBlueShape.x3 = map(noise(myBlueShape.xoff + 600), 0, 1, -40, 40);
  myBlueShape.y3 = map(noise(myBlueShape.xoff + 700), 0, 1, -40, 40);
  myBlueShape.x4 = map(noise(myBlueShape.xoff + 800), 0, 1, -20, 60);
  myBlueShape.y4 = map(noise(myBlueShape.xoff + 900), 0, 1, -30, 50);

  myBlueShape.x5 = map(noise(myBlueShape.xoff + 1000), 0, 1, -100, -20);
  myBlueShape.y5 = map(noise(myBlueShape.xoff + 1100), 0, 1, -30, 50);
  myBlueShape.x6 = map(noise(myBlueShape.xoff + 1200), 0, 1, 0, 80);
  myBlueShape.y6 = map(noise(myBlueShape.xoff + 1300), 0, 1, -90, -10);

  myBlueShape.x7 = map(noise(myBlueShape.xoff + 1200), 0, 1, 30, 110);
  myBlueShape.y7 = map(noise(myBlueShape.xoff + 1300), 0, 1, -110, -30);
  myBlueShape.xoff += 0.003;

  push();
  strokeWeight(5);
  noFill();
  // fill(255);
  stroke(0, 0, 255);

  beginShape();
  vertex(
    myBlueShape.xOriginPoint + myBlueShape.x0,
    myBlueShape.yOriginPoint + myBlueShape.y0
  );
  quadraticVertex(
    myBlueShape.xOriginPoint + myBlueShape.x1,
    myBlueShape.yOriginPoint + myBlueShape.y1,
    myBlueShape.xOriginPoint + myBlueShape.x2,
    myBlueShape.yOriginPoint + myBlueShape.y2
  );
  quadraticVertex(
    myBlueShape.xOriginPoint + myBlueShape.x3,
    myBlueShape.yOriginPoint + myBlueShape.y3,
    myBlueShape.xOriginPoint + myBlueShape.x4,
    myBlueShape.yOriginPoint + myBlueShape.y4
  );
  quadraticVertex(
    myBlueShape.xOriginPoint + myBlueShape.x5,
    myBlueShape.yOriginPoint + myBlueShape.y5,
    myBlueShape.xOriginPoint + myBlueShape.x6,
    myBlueShape.yOriginPoint + myBlueShape.y6
  );
  quadraticVertex(
    myBlueShape.xOriginPoint + myBlueShape.x7,
    myBlueShape.yOriginPoint + myBlueShape.y7,
    myBlueShape.xOriginPoint + myBlueShape.x0,
    myBlueShape.yOriginPoint + myBlueShape.y0
  );
  endShape();
  pop();
}
