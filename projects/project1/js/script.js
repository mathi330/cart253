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
let materials = [];
let countMaterial = 5;

/**
setup()


*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  setupGround();
  noCursor();

  //Create and setup all the materials.
  for (let i = 0; i < countMaterial; i++) {
    let material = createMaterial();
    print(i + "  " + material.width);
    materials.push(material);
  }

  // Default stroke colors for the two shapes
  cursor.stroke = color(255);
}

function createMaterial() {
  let myWidth = random(width / 13, width / 8);
  let myHeight = random(height / 20, height / 11);
  let material = {
    x: random(myWidth / 2, width - myWidth / 2),
    y: ground.y - ground.height / 2 - myHeight / 2,
    width: myWidth,
    height: myHeight,
    stroke: color(random(150, 255), random(150, 200), random(100, 150)),
    isBeingDragged: false,
    gravity: 0,
    acceleration: 0.2,
  };
  return material;
}

/**
setupGround()

function to set up the grounds size and coordinates.
*/
function setupGround() {
  //determining the height and length of the ground depending on the size of the canvas.
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
// function setupMaterial(material) {
//   material.stroke = color(random(150, 255), random(150, 200), random(100, 150));
//   //choosing random sizes for the material while taking into account the size of the canvas.
//   material.width = random(width / 13, width / 8);
//   material.height = random(height / 20, height / 11);
//   //choosing coordinates of the material while taking into account the ground and the material's size.
//   material.x = random(material.width / 2, width - material.width / 2);
//   material.y = ground.y - ground.height / 2 - material.height / 2;
// }

function draw() {
  background(0);
  displayGround();

  moveCursor();

  for (let i = 0; i < materials.length; i++) {
    handleDragging(materials[i]);
  }
  for (let i = 0; i < materials.length; i++) {
    for (let j = 0; j < materials.length; j++) {
      if (i !== j) {
        drawMaterial(materials[i], materials[j]);
        // print("Coucou " + materials[i].x);
      }
    }
  }
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
  insideCanvas(material, ground);
  stroke(material.stroke);
  noFill();
  rect(material.x, material.y, material.width, material.height);
  // print(
  //   material.x + " " + material.y + " " + material.width + " " + material.height
  // );
  pop();
}

function gravityMaterial(material, otherMaterial) {
  //If statement to create a gravity effect.
  if (!material.isBeingDragged && material.gravity > 0) {
    if (material.y === ground.y - ground.height / 2 - material.height / 2) {
      //resets the gravity to zero when it touches the ground.
      material.gravity = 0;
    } else if (shapeIsInsideShape(material, otherMaterial)) {
      material.gravity = 0;
    } else {
      material.gravity += material.acceleration;
    }
  }
}

/**
Displays the cursorer shape using appropriate drawing settings
*/
function drawCursor() {
  push();
  insideCanvas(cursor, ground);
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

function shapeIsInsideShape(material, otherMaterial) {
  if (
    material.x + material.width / 2 >=
      otherMaterial.x - otherMaterial.width / 2 &&
    material.x - material.width / 2 <=
      otherMaterial.x + otherMaterial.width / 2 &&
    material.y + material.height / 2 >=
      otherMaterial.y - otherMaterial.height / 2 &&
    material.y - material.height / 2 <=
      otherMaterial.y + otherMaterial.height / 2
  ) {
    material.y =
      otherMaterial.y - otherMaterial.height / 2 - material.height / 2;
    return true;
  } else {
    return false;
  }
}

/**
sees if the mouse is inside the shape when the mouse is pressed.
*/
function mousePressed() {
  for (let i = 0; i < materials.length; i++) {
    if (mouseIsInsideShape(materials[i])) {
      materials[i].isBeingDragged = true;
    }
  }
}

function isOnTopOfMaterial() {}

/**
stops dragging when the mouse is released.
*/
function mouseReleased() {
  for (let i = 0; i < materials.length; i++) {
    if (mouseIsInsideShape(materials[i])) {
      // Processing the released element.
      materials[i].isBeingDragged = false;
      materials[i].gravity = 0.1;
    } else {
      //
    }
  }
}

/**
constrain to make sure the shapes don't go outside the canvas.
*/
function insideCanvas(shape, ground) {
  shape.x = constrain(shape.x, shape.width / 2, width - shape.width / 2);
  shape.y = constrain(
    shape.y,
    shape.height / 2,
    ground.y - ground.height / 2 - shape.height / 2
  );
}
