/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

//the bottom of the canvas that represents the earth/ground.
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

// The customized cursor (a small rectangle)
let cursor = {
  x: undefined,
  y: undefined,
  width: 5,
  height: 5,
  stroke: undefined,
};

// The material.
let material = {
  material1: {
    x: undefined,
    y: undefined,
    width: 200,
    height: 200,
    stroke: undefined,
    isBeingDragged: false,
    gravity: 0,
    acceleration: 0.2,
  },
  material2: {
    x: undefined,
    y: undefined,
    width: 200,
    height: 200,
    stroke: undefined,
    isBeingDragged: false,
    gravity: 0,
    acceleration: 0.2,
  },
};

/**
setup()


*/
function setup() {
  createCanvas(1000, 700);
  rectMode(CENTER);

  setupGround();
  setupMaterial(material.material1, material.material2);
  setupMaterial(material.material2, material.material1);
  noCursor();

  // Default stroke colors for the two shapes
  cursor.stroke = color(255);
  material.material1.stroke = color(255, 255, 0);
  material.material2.stroke = color(255, 0, 0);
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
function setupMaterial(material, otherMaterial) {
  //choosing random sizes for the material while taking into account the size of the canvas.
  material.width = random(width / 13, width / 8);
  material.height = random(height / 20, height / 11);
  //choosing coordinates of the material while taking into account the ground and the material's size.
  material.x = random(material.width / 2, width - material.width / 2);
  material.y = ground.y - ground.height / 2 - material.height / 2;
  // - materials.stroke.strokeWeight;
}

function draw() {
  background(0);
  displayGround();

  moveCursor();
  handleDragging(material.material1);
  handleDragging(material.material2);
  drawMaterial(material.material1, material.material2);
  drawMaterial(material.material2, material.material1);
  drawCursor();
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

function moveCursor() {
  // Move the cursor rectangle to the position of the mouse
  cursor.x = mouseX;
  cursor.y = mouseY;
}

/**
handleDragging()

function that make the material shape be dragged when isBeingDragged is true.
*/
function handleDragging(material) {
  if (material.isBeingDragged) {
    material.x = mouseX;
    material.y = mouseY;
  }
}

/**
Same idea as above for the material shape
*/
function drawMaterial(material, otherMaterial) {
  push();
  gravityMaterial(material, otherMaterial);
  material.y += material.gravity;
  insideCanvas(material);
  stroke(material.stroke);
  noFill();
  rect(material.x, material.y, material.width, material.height);
  pop();
}

function gravityMaterial(material, otherMaterial) {
  //If statement to create a gravity effect.
  if (
    material.x + material.width / 2 >
      otherMaterial.x - otherMaterial.width / 2 &&
    material.x - material.width / 2 <
      otherMaterial.x + otherMaterial.width / 2 &&
    material.isBeingDragged === false
  ) {
    if (material.y < otherMaterial.height) {
      material.gravity += material.acceleration;
    } else {
      material.gravity = 0;
    }
  } else if (
    material.y !== ground.y - ground.height / 2 - material.height / 2 &&
    material.isBeingDragged === false
  ) {
    material.gravity += material.acceleration;
  } else {
    //resets the gravity to zero when it touches the ground.
    material.gravity = 0;
  }
}

/**
Displays the cursorer shape using appropriate drawing settings
*/
function drawCursor() {
  push();
  insideCanvas(cursor);
  noFill();
  stroke(cursor.stroke);
  rect(cursor.x, cursor.y, cursor.width, cursor.height);
  pop();
}

/**
mouseIsInsideShape()

Checks if the cursor rectangle/cursor is inside the material rectangle.
*/
function mouseIsInsideShape(material) {
  if (
    cursor.x - cursor.width / 2 > material.x - material.width / 2 &&
    cursor.x + cursor.width / 2 < material.x + material.width / 2 &&
    cursor.y - cursor.height / 2 > material.y - material.height / 2 &&
    cursor.y + cursor.height / 2 < material.y + material.height / 2
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
  if (mouseIsInsideShape(material.material1)) {
    material.material1.isBeingDragged = true;
  }
  if (mouseIsInsideShape(material.material2)) {
    material.material2.isBeingDragged = true;
  }
}

/**
stops dragging when the mouse is released.
*/
function mouseReleased() {
  material.material1.isBeingDragged = false;
  material.material2.isBeingDragged = false;
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
