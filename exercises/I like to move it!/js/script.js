/**
I like to move it!
Mathilde Davan

This project is an abstract piece composed of a moving triangle in the center
changing color with a square of the same color in the background rotating.
Made on top of the triangle, we can see 4 empty squares and 4 empty circles
moving across the canvas each in its own direction.
I also made my background slightly transparent to make the movements of the
empty shapes more mesmerizing and fluid in my opinion.
The mouse's movements were integrated with the size of the empty squares and
the customized mouse cursor that I made and that reminds the movements and
shapes of the bigger empty shapes.
*/

"use strict";

let bg = {
  fill: 0,
  alpha: 50,
};

let cursor = {
  //squares
  x1: 0,
  y1: -5,
  x2: 5,
  y2: 0,
  x3: 0,
  y3: 5,
  x4: -5,
  y4: 0,
  sizeS: 25,
  minSizeS: 3,
  maxSizeS: 25,
  growthS: -0.1,

  //circles
  x5: -5,
  y5: -5,
  x6: 5,
  y6: -5,
  x7: 5,
  y7: 5,
  x8: -5,
  y8: 5,
  sizeC: 2,
  minSizeC: 2,
  maxSizeC: 25,
  growthC: 0.1,
};

//Create object for the triangle in the middle of the canvas.
let middleTriangle = {
  //Coordinates of the angles of the triangle.
  x1: 400,
  y1: 350,
  x2: 443.3,
  y2: 425,
  x3: 356.7,
  y3: 425,
  //Fill
  r: 255,
  g: 255,
  b: 255,
  changeR: -0.19,
  changeG: -1,
  changeB: -0.38,
  //speed to modify the coordinates of the triangle.
  speedx1: 1,
  speedy1: 1,
  speedx2: -1,
  speedy2: -1,
  speedx3: 1,
  speedy3: -1,
  //angle to use the sine.
  angle: 0,
  angleChange: 0.01,
};

//Create object for top left (at the start of the program) empty circle/circle stroke => stroke1
let stroke1 = {
  x: 0,
  y: 0,
  size: 500,
  sizeMin: 70,
  sizeMax: 900,
  speed: 1.5,
  growth: -0.39,
  stroke: 255,
  strokeWeight: 2,
};

//Create object for top right (at the start of the program) empty circle => stroke1
let stroke2 = {
  x: 800,
  y: 0,
  size: 100,
  speedx: -1.5,
  speedy: 1.5,
  strokeWeight: 2,
};

//Create object for bottom right (at the start of the program) empty circle => stroke1
let stroke3 = {
  x: 800,
  y: 800,
  size: 100,
  speed: -1.5,
  strokeWeight: 1.5,
};

//Create object for bottom left (at the start of the program) empty circle => stroke1
let stroke4 = {
  x: 0,
  y: 800,
  size: 100,
  speedx: 1.5,
  speedy: -1.5,
  strokeWeight: 2,
};

//Create object for top (at the start of the program) empty square.
let square1 = {
  x: 400,
  y: 0,
  size: 100,
  sizeMin: 50,
  sizeMax: 700,
  speed: 1.5,
  growth: -0.39,
  stroke: 255,
  strokeWeight: 2,
};

//Create object for right (at the start of the program) empty square.
let square2 = {
  x: 800,
  y: 400,
  size: 100,
  speed: -1.5,
  strokeWeight: 2,
};

//Create object for bottom (at the start of the program) empty square.
let square3 = {
  x: 400,
  y: 800,
  size: 100,
  speed: -1.5,
  strokeWeight: 2,
};

//Create object for left (at the start of the program) empty square.
let square4 = {
  x: -0,
  y: 400,
  size: 100,
  speed: 1.5,
  strokeWeight: 2,
};

//Create object for the middle square(under triangle).
let centerSquare = {
  x: 400,
  y: 400,
  size: 400,
  angle: 0.0,
  rotate: 0.005,
};

/**
setup()

Set canvas' size and make the rectangles be drawn from their center.
*/
function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
}

/**
draw()

Set background to black.
Draw a triangle in the middle (changes shape and color).
Make empty circles (white stroke) grow and move across the canvas (diagonals).
Make empty squares grow (mouseX) and move across the canvas.
Make a cursor inspired from the empty shapes mentionned above.
Make a square (same color as the triangle) rotate in the center of the canvas.
*/
function draw() {
  //Draw black background
  background(bg.fill, bg.alpha);
  noCursor();

  //Draw the triangle of the middle of the canvas.
  noStroke();
  //triangle color.
  middleTriangle.r = middleTriangle.r + middleTriangle.changeR;
  middleTriangle.g = middleTriangle.g + middleTriangle.changeG;
  middleTriangle.b = middleTriangle.b + middleTriangle.changeB;
  fill(middleTriangle.r, middleTriangle.g, middleTriangle.b);
  //If statement to prevent the triangle to become black.
  if (middleTriangle.r >= 255 || middleTriangle.r <= 0) {
    middleTriangle.changeR = -middleTriangle.changeR;
  }
  if (middleTriangle.g >= 255 || middleTriangle.g <= 0) {
    middleTriangle.changeG = -middleTriangle.changeG;
  }
  if (middleTriangle.b >= 255 || middleTriangle.b <= 0) {
    middleTriangle.changeB = -middleTriangle.changeB;
  }
  //Movement of the triangle.
  // Increase the angle so the sine result changes.
  middleTriangle.angle += middleTriangle.angleChange;
  middleTriangle.x1 += middleTriangle.speedx1 * sin(middleTriangle.angle);
  middleTriangle.y1 += middleTriangle.speedy1 * sin(middleTriangle.angle);
  middleTriangle.x2 += middleTriangle.speedx2 * sin(middleTriangle.angle);
  middleTriangle.y2 += middleTriangle.speedy2 * sin(middleTriangle.angle);
  middleTriangle.x3 += middleTriangle.speedx3 * sin(middleTriangle.angle);
  middleTriangle.y3 += middleTriangle.speedy3 * sin(middleTriangle.angle);
  triangle(
    middleTriangle.x1,
    middleTriangle.y1,
    middleTriangle.x2,
    middleTriangle.y2,
    middleTriangle.x3,
    middleTriangle.y3
  );
  //Stopping the angles of the triangle to go too far.
  if (middleTriangle.x1 >= 443.3 || middleTriangle.x1 <= 356.7) {
    middleTriangle.speedx1 = -middleTriangle.speedx1;
  }
  if (middleTriangle.y1 >= 425 || middleTriangle.y1 <= 350) {
    middleTriangle.speedy1 = -middleTriangle.speedy1;
  }

  if (middleTriangle.x2 >= 443.3 || middleTriangle.x2 <= 356.7) {
    middleTriangle.speedx2 = -middleTriangle.speedx2;
  }

  if (middleTriangle.y2 >= 425 || middleTriangle.y2 <= 350) {
    middleTriangle.speedy2 = -middleTriangle.speedy2;
  }

  if (middleTriangle.x3 >= 443.3 || middleTriangle.x3 <= 356.7) {
    middleTriangle.speedx3 = -middleTriangle.speedx3;
  }
  if (middleTriangle.y3 >= 425 || middleTriangle.y3 <= 350) {
    middleTriangle.speedy3 = -middleTriangle.speedy3;
  }

  //Setting stroke for the empty circles and empty squares.
  noFill();
  strokeWeight(stroke1.strokeWeight);
  stroke(stroke1.stroke, stroke1.stroke, stroke1.stroke);
  //empty circle (top-left)
  stroke1.x += stroke1.speed;
  stroke1.y += stroke1.speed;
  stroke1.x = constrain(stroke1.x, 0, width);
  stroke1.y = constrain(stroke1.y, 0, height);
  stroke1.size += stroke1.growth;
  stroke1.size = constrain(stroke1.size, 50, width);
  ellipse(stroke1.x, stroke1.y, stroke1.size);

  //empty circle (top-right)
  strokeWeight(stroke2.strokeWeight);
  stroke(stroke2.stroke, stroke2.stroke, stroke2.stroke);
  stroke2.x += stroke2.speedx;
  stroke2.y += stroke2.speedy;
  stroke2.x = constrain(stroke2.x, 0, width);
  stroke2.y = constrain(stroke2.y, 0, height);
  ellipse(stroke2.x, stroke2.y, stroke1.size);

  //empty circle (bottom-right)
  strokeWeight(stroke3.strokeWeight);
  stroke(stroke3.stroke, stroke3.stroke, stroke3.stroke);
  stroke3.x += stroke3.speed;
  stroke3.y += stroke3.speed;
  stroke3.x = constrain(stroke3.x, 0, width);
  stroke3.y = constrain(stroke3.y, 0, height);
  ellipse(stroke3.x, stroke3.y, stroke1.size);

  //empty circle (bottom-left)
  strokeWeight(stroke4.strokeWeight);
  stroke(stroke4.stroke, stroke4.stroke, stroke4.stroke);
  stroke4.x += stroke4.speedx;
  stroke4.y += stroke4.speedy;
  stroke4.x = constrain(stroke4.x, 0, width);
  stroke4.y = constrain(stroke4.y, 0, height);
  ellipse(stroke4.x, stroke4.y, stroke1.size);

  //If statement to invert the growth of the empty circles.
  if (stroke1.size >= stroke1.sizeMax || stroke1.size <= stroke1.sizeMin) {
    stroke1.growth = -stroke1.growth;
  }

  //If statement to invert trajectories of empty circles when they touch the sides of canvas.
  if (
    stroke1.x >= width ||
    (stroke1.x <= 0 && stroke1.y >= width) ||
    stroke1.y <= 0
  ) {
    stroke1.speed = -stroke1.speed;
    stroke2.speedx = -stroke2.speedx;
    stroke2.speedy = -stroke2.speedy;
    stroke3.speed = -stroke3.speed;
    stroke4.speedx = -stroke4.speedx;
    stroke4.speedy = -stroke4.speedy;
  }

  //Draw side squares (motion similar to empty circles).
  //empty square (top)
  square1.y += square1.speed;
  square1.y = constrain(square1.y, 0, height);
  square1.size = map(mouseX, 0, width, square1.sizeMin, square1.sizeMax);
  square1.size = constrain(square1.size, square1.sizeMin, square1.sizeMax);
  rect(square1.x, square1.y, square1.size);

  //empty square (right)
  square2.x += square2.speed;
  square2.x = constrain(square2.x, 0, width);
  rect(square2.x, square2.y, square1.size);

  //empty square (bottom)
  square3.y += square3.speed;
  square3.y = constrain(square3.y, 0, height);
  rect(square3.x, square3.y, square1.size);

  //empty square (left)
  square4.x += square4.speed;
  square4.x = constrain(square4.x, 0, width);
  rect(square4.x, square4.y, square1.size);

  //If statement to invert the trajectories of the empty squares when they touch the sides of canvas.
  if (square1.y >= height || square1.y <= 0) {
    square1.speed = -square1.speed;
    square2.speed = -square2.speed;
    square3.speed = -square3.speed;
    square4.speed = -square4.speed;
  }

  //Draw cursor
  //Draw the squares of the cursor.
  cursor.sizeS += cursor.growthS;
  rect(mouseX + cursor.x1, mouseY + cursor.y1, cursor.sizeS);
  rect(mouseX + cursor.x2, mouseY + cursor.y2, cursor.sizeS);
  rect(mouseX + cursor.x3, mouseY + cursor.y3, cursor.sizeS);
  rect(mouseX + cursor.x4, mouseY + cursor.y4, cursor.sizeS);
  //Make the squares grow and shrink.
  if (cursor.sizeS >= cursor.maxSizeS || cursor.sizeS <= cursor.minSizeS) {
    cursor.growthS = -cursor.growthS;
  }

  //Draw the circles of the cursor.
  cursor.sizeC += cursor.growthC;
  ellipse(mouseX + cursor.x5, mouseY + cursor.y5, cursor.sizeC);
  ellipse(mouseX + cursor.x6, mouseY + cursor.y6, cursor.sizeC);
  ellipse(mouseX + cursor.x7, mouseY + cursor.y7, cursor.sizeC);
  ellipse(mouseX + cursor.x8, mouseY + cursor.y8, cursor.sizeC);
  //Make the circles grow and shrink.
  if (cursor.sizeC >= cursor.maxSizeC || cursor.sizeC <= cursor.minSizeC) {
    cursor.growthC = -cursor.growthC;
  }

  //Draw a square spin.
  noStroke();
  //Fill the same color as the triangle in the middle.
  fill(middleTriangle.r, middleTriangle.g, middleTriangle.b, 25);
  centerSquare.angle += centerSquare.rotate;
  let t = tan(centerSquare.angle);
  translate(centerSquare.x, centerSquare.y, centerSquare.size);
  rotate(t);
  rect(0, 0, centerSquare.size);
}
