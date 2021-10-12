/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let ground = {
  x: undefined,
  y: undefined,
  width: undefined,
  height: 50,
  fill: {
    r: 200,
    g: 200,
    b: 200,
  },
};

// The small rectangle we'll control with the mouse
// Changes stroke color when overlap detected
let small = {
  x: undefined,
  y: undefined,
  width: 5,
  height: 5,
  stroke: undefined,
};

// The big rectangle that will just sit in the centre
let big = {
  x: undefined,
  y: undefined,
  width: 200,
  height: 200,
  stroke: undefined,
  isBeingDragged: false,
};

/**
setup()


*/
function setup() {
  createCanvas(800, 700);
  rectMode(CENTER);

  setupGround();
  setupMaterial();
  noCursor();

  // Default stroke colors for the two shapes
  small.stroke = color(255);
  big.stroke = color(255, 255, 0);
}

/**
setupGround()

function to set up the grounds size and coordinates.
*/
function setupGround() {
  //determining the height and lenght of the ground depending on the size of the canvas.
  ground.width = width;
  ground.height = height / 11;
  //placing the ground according to the size of the canvas and size of the ground.
  ground.x = width / 2;
  ground.y = height - ground.height / 2;
}

/**
setupMaterial()

function that sets up size and coordinates for material.
*/
function setupMaterial() {
  //choosing random sizes for the material while taking into account the size of the canvas.
  big.width = random(width / 13, width / 8);
  big.height = random(height / 20, height / 11);
  //choosing coordinates of the material while taking into account the ground and the material's size.
  big.x = random(big.width / 2, width - big.width / 2);
  big.y = ground.y - ground.height / 2 - big.height / 2;
  // - materials.stroke.strokeWeight;
}

function draw() {
  background(0);
  displayGround();

  moveSmall();
  handleDragging();
  drawBig();
  drawSmall();
}

/**
displayGround()

function that displays the ground/lower part of the canvas.
*/
function displayGround() {
  push();
  noStroke();
  fill(ground.fill.r, ground.fill.g, ground.fill.b);
  rect(ground.x, ground.y, ground.width, ground.height);
  pop();
}

function moveSmall() {
  // Move the small rectangle to the position of the mouse
  small.x = mouseX;
  small.y = mouseY;
}

/**
handleDragging()

function that make the big shape be dragged when isBeingDragged is true.
*/
function handleDragging() {
  if (big.isBeingDragged) {
    big.x = mouseX;
    big.y = mouseY;
  }
}

/**
mouseIsInsideShape()

Checks if the small rectangle/cursor is inside the big rectangle.
*/
function mouseIsInsideShape() {
  if (
    small.x - small.width / 2 > big.x - big.width / 2 &&
    small.x + small.width / 2 < big.x + big.width / 2 &&
    small.y - small.height / 2 > big.y - big.height / 2 &&
    small.y + small.height / 2 < big.y + big.height / 2
  ) {
    return true;
  } else {
    return false;
  }
}

/**
sees if the mouse is inside the shape when the mouse is pressed.
*/
function mousePressed() {
  if (mouseIsInsideShape()) {
    big.isBeingDragged = true;
  }
}

/**
stops dragging when the mouse is released.
*/
function mouseReleased() {
  big.isBeingDragged = false;
}

/**
Displays the smaller shape using appropriate drawing settings
*/
function drawSmall() {
  push();
  insideCanvas(small);
  noFill();
  stroke(small.stroke);
  rect(small.x, small.y, small.width, small.height);
  pop();
}

/**
Same idea as above for the big shape
*/
function drawBig() {
  push();
  insideCanvas(big);
  stroke(big.stroke);
  noFill();
  rect(big.x, big.y, big.width, big.height);
  pop();
}

/**
constrain to make sure the shapes don't go outside the canvas.
*/
function insideCanvas(shape) {
  shape.x = constrain(shape.x, shape.width / 2, width - shape.width / 2);
  shape.y = constrain(
    shape.y,
    shape.height / 2,
    ground.y - ground.height / 2 - shape.height / 2
  );
}
