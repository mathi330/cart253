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
    let material = createMaterial("material-" + i);
    materials.push(material);
  }

  // Default stroke colors for the cursor.
  cursor.stroke = color(255);
}

/**
function for the material's object.
*/
function createMaterial(myName) {
  let myWidth = random(width / 13, width / 8);
  let myHeight = random(height / 20, height / 11);
  let material = {
    name: myName,
    x: random(myWidth / 2, width - myWidth / 2),
    y: ground.y - ground.height / 2 - myHeight / 2,
    width: myWidth,
    sizeX: myWidth,
    height: myHeight,
    sizeY: myHeight,
    colorfulFill: true,
    fillWhenDragged: color(150, 150, 150, 50),
    fill: color(random(150, 255), random(150, 200), random(100, 150), 100),
    isBeingDragged: false,
    gravity: 0,
    acceleration: 0.2,
    materialUnder: null,
    shiftKeyPressed: false,
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

function draw() {
  background(0);

  simulation();

  moveCursor();
  drawCursor();
}

/**
Create the simulation.
*/
function simulation() {
  displayGround();

  //loop to process the dragging of materials.
  for (let i = 0; i < materials.length; i++) {
    let material = materials[i];
    handleDragging(material);
    if (
      material.gravity === 0 &&
      !material.isBeingDragged &&
      !material.materialUnder === null
    ) {
      if (material.y === ground.y - ground.height / 2 - material.height / 2) {
        if (shapeIsInsideShape(material, material.materialUnder)) {
          startFreeFall(material);
          material.materialUnder = null;
        }
      }
    }
  }
  //loop to create the materials.
  for (let i = 0; i < materials.length; i++) {
    for (let j = 0; j < materials.length; j++) {
      if (i !== j) {
        drawMaterial(materials[i], materials[j]);
      }
    }
  }
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
    material.colorfulFill = false;
  } else {
    material.colorfulFill = true;
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
  // stroke(material.stroke);
  noStroke();
  if (material.colorfulFill) {
    fill(material.fill);
  } else {
    fill(material.fillWhenDragged);
  }

  rect(material.x, material.y, material.width, material.height);
  pop();
}

/**
Create the illusion of gravity.
If the material is not on the ground
     and not on top of another material, then it will fall.
*/
function gravityMaterial(material, otherMaterial) {
  //If statement to create a gravity effect.

  if (!material.isBeingDragged && material.gravity > 0) {
    if (material.y === ground.y - ground.height / 2 - material.height / 2) {
      //resets the gravity to zero when it touches the ground.
      material.gravity = 0;
    } else if (shapeIsInsideShape(material, otherMaterial)) {
      material.gravity = 0;

      if (
        material.y + material.height / 2 <=
        otherMaterial.y - otherMaterial.height / 2
      ) {
        material.materialUnder = otherMaterial;
      }
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
Changes the orientation of the material the user is double clicking on.
 */
function doubleClicked() {
  for (let i = 0; i < materials.length; i++) {
    if (
      mouseIsInsideShape(materials[i]) &&
      materials[i].width > materials[i].height
    ) {
      materials[i].width = materials[i].sizeY;
      materials[i].height = materials[i].sizeX;
    } else if (
      mouseIsInsideShape(materials[i]) &&
      materials[i].width < materials[i].height
    ) {
      materials[i].width = materials[i].sizeX;
      materials[i].height = materials[i].sizeY;
    }
  }
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
shapeIsInsideShape()

Checks if two materials are overlapping.
*/
function shapeIsInsideShape(material, otherMaterial) {
  if (
    material.x + material.width / 2 >=
      otherMaterial.x - otherMaterial.width / 2 &&
    material.x - material.width / 2 <=
      otherMaterial.x + otherMaterial.width / 2 &&
    material.y + material.height / 2 >=
      otherMaterial.y - otherMaterial.height / 2 &&
    material.y - material.height / 2 <=
      otherMaterial.y + otherMaterial.height / 2 &&
    !material.isBeingDragged &&
    !otherMaterial.isBeingDragged
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

      materials[i].materialUnder = null;
      //make any material on top of the material being dragged to start their free fall.
      startFreeFallForMaterialOnTop(materials[i]);
    }
  }
}

/**
Start a free fall and make those on top fall too.
*/
function startFreeFall(material) {
  material.isBeingDragged = false;
  material.gravity = 0.1;
  material.materialUnder = null;
  startFreeFallForMaterialOnTop(material);
}

function startFreeFallForMaterialOnTop(myMaterialUnder) {
  //Sorting out the array of the materials based on their y position.
  //We want the biggest y to be the first of the new array.
  let sortedMaterials = materials.sort(function (a, b) {
    return a.y < b.y;
  });
  //See if there is a material above the current "myMaterialUnder."
  for (let i = 0; i < sortedMaterials.length; i++) {
    if (materials[i].materialUnder === myMaterialUnder) {
      //If there is one, make it fall.
      startFreeFall(materials[i]);
    }
  }
}

/**
stops dragging when the mouse is released.
*/
function mouseReleased() {
  for (let i = 0; i < materials.length; i++) {
    if (mouseIsInsideShape(materials[i])) {
      // Processing the released element.
      startFreeFall(materials[i]);
      startFreeFallForMaterialOnTop(materials[i]);
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
