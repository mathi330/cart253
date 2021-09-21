/**
Moving Pictures
Mathilde Davan

In this project we see 4 filled circles move towards the middle where stop
changing location and only change in size. 4 other empty circles continue to
move across the diagonals of the canvas while their size changes too. The
color of the background also changes with the coordinates of the mouse on the
screen.
*/

"use strict";

//Create customized cursor.
let cursor = {
  //coordinates
  x1: 0,
  y1: -1,
  x2: 5,
  y2: -1,
  x3: -5,
  y3: -1,
  x4: -5,
  y4: 5,
  x5: 0,
  y5: 6,
  x6: 0,
  y6: 6,
  x7: 5,
  y7: 5,
  sizeHead: 20,
  sizeEyes: 5,
  //fill
  fillR: 200,
  fillG: 220,
  fillB: 180,
  random1: -0.04,
  random2: 0.04,
};

//Create object for left circle => circle1
let circle1 = {
  x: 0,
  y: 250,
  size: 100,
  fill: 255,
  alpha: 150,
  speed: 2,
  growth: 2,
};

//Create object for right circle => circle2
let circle2 = {
  x: 500,
  y: 250,
  size: 100,
  fill: 255,
  alpha: 150,
  speed: -2,
};

//Create object for top circle => circle3
let circle3 = {
  x: 250,
  y: 0,
  size: 100,
  fill: 255,
  alpha: 150,
  speed: 2,
};

//Create object for bottom circle => circle4
let circle4 = {
  x: 250,
  y: 500,
  size: 100,
  fill: 255,
  alpha: 150,
  speed: -2,
};

//Create object for top left empty circle/circle stroke => stroke1
let stroke1 = {
  x: 0,
  y: 0,
  size: 500,
  stroke: 255,
  strokeWeight: 2,
  speed: 1,
  growth: -0.39,
};

//Create object for top left empty circle => stroke1
let stroke2 = {
  x: 500,
  y: 0,
  size: 100,
  stroke: 255,
  strokeWeight: 2,
  speedx: -1,
  speedy: 1,
};

//Create object for top left empty circle => stroke1
let stroke3 = {
  x: 500,
  y: 500,
  size: 100,
  stroke: 255,
  strokeWeight: 2,
  speed: -1,
};

//Create object for top left empty circle => stroke1
let stroke4 = {
  x: 0,
  y: 500,
  size: 100,
  stroke: 255,
  strokeWeight: 2,
  speedx: 1,
  speedy: -1,
};

/**
preload()

Not used.
*/
function preload() {}

/**
setup()

Create a canvas.
*/
function setup() {
  createCanvas(500, 500);
}

/**
draw()

Draw background, moving circles, and empty circles (objects called stroke1, 2, 3 ,4).
*/
function draw() {
    noCursor();
  noStroke();

  //Draw the background and changing color depending on the mouse.
  background(mouseX, mouseX - mouseY, mouseY);

  //circle1 (biggest)
  circle1.x += circle1.speed;
  circle1.x = constrain(circle1.x, 0, width / 2);
  circle1.size += circle1.growth;
  circle1.size = constrain(circle1.size, 0, width);
  fill(circle1.fill, circle1.fill, circle1.fill, circle1.alpha);
  ellipse(circle1.x, circle1.y, circle1.size);

  //circle2 (2nd smallest)
  circle2.x += circle2.speed;
  circle2.x = constrain(circle2.x, width / 2, width);
  circle2.size = circle1.size * 0.6;
  circle2.size = constrain(circle2.size, 0, width);
  fill(circle2.fill, circle2.fill, circle2.fill, circle2.alpha);
  ellipse(circle2.x, circle2.y, circle2.size);

  //circle3 (2nd biggest)
  circle3.y += circle3.speed;
  circle3.y = constrain(circle3.y, 0, height / 2);
  circle3.size = circle1.size * 0.8;
  circle3.size = constrain(circle3.size, 0, height);
  fill(circle3.fill, circle3.fill, circle3.fill, circle3.alpha);
  ellipse(circle3.x, circle3.y, circle3.size);

  //circle4 (smallest)
  circle4.y += circle4.speed;
  circle4.y = constrain(circle4.y, height / 2, height);
  circle4.size = circle1.size * 0.4;
  circle4.size = constrain(circle4.size, 0, height);
  fill(circle4.fill, circle4.fill, circle4.fill, circle4.alpha);
  ellipse(circle4.x, circle4.y, circle4.size);

  //If statement to invert the growth of the circles.
  if (circle1.size >= width || circle1.size <= 20) {
    circle1.growth = -circle1.growth;
  }

  //Setting stroke for the empty circles.
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
  if (stroke1.size >= width || stroke1.size <= 50) {
    stroke1.growth = -stroke1.growth;
  }

  //If statement to invert trajectories of empty circles.
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
    
      //Smiley face cursor.
  noStroke();
  //fill for the head(changes with the mouse's movements).
  cursor.fillR = cursor.fillR + random(cursor.random1, cursor.random2);
  cursor.fillG = cursor.fillG + random(cursor.random1, cursor.random2);
  cursor.fillB = cursor.fillB + random(cursor.random1, cursor.random2);
  fill(
    noise(cursor.fillR) * mouseX,
    noise(cursor.fillG) * mouseY,
    noise(cursor.fillB) * 255
  );
  //head
  ellipse(mouseX + cursor.x1, mouseY + cursor.y1, cursor.sizeHead);
  //eyes
  fill(0);
  ellipse(mouseX + cursor.x2, mouseY + cursor.y2, cursor.sizeEyes);
  ellipse(mouseX + cursor.x3, mouseY + cursor.y3, cursor.sizeEyes);
  //mouth (smiling)
  stroke(0);
  line(
    mouseX + cursor.x4,
    mouseY + cursor.y4,
    mouseX + cursor.x5,
    mouseY + cursor.y5
  );
  line(
    mouseX + cursor.x6,
    mouseY + cursor.y6,
    mouseX + cursor.x7,
    mouseY + cursor.y7
  );
}
