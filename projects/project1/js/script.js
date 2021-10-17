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

// The materials.
let materials = [];
let countMaterial = 5;

// The enemies
let enemies = [];
let countEnemy = 5;

//------------------------------------
//------------------------------------

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

  //Create and setup all the enemies.
  for (let i = 0; i < countEnemy; i++) {
    let enemy = createEnemy("enemy-" + i);
    enemies.push(enemy);
  }

  // Default stroke colors for the cursor.
  cursor.stroke = color(255);
}

//------------------------------------
//------------------------------------

/**
function for the material's object.
(the name variable is to help me know which material is which when debugging).
*/
function createMaterial(myName) {
  let myWidth = random(width / 13, width / 8);
  let myHeight = random(height / 20, height / 11);
  let myAlpha = 100;
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
    fill: {
      r: random(150, 255),
      g: random(100, 150),
      b: random(150, 230),
      alpha: myAlpha,
    },
    isBeingDragged: false,
    isDead: false,
    gravity: 0,
    acceleration: 0.2,
    materialUnder: null,
  };
  return material;
}

/**
function for the enemy's object (similar to the one for the material).
*/
function createEnemy(myName) {
  let mySize = random(width / 60, width / 100);
  let speedValue = 5;
  let enemy = {
    name: myName,
    size: mySize,
    fillBeforeAttack: color(0, 0),
    fillDuringAttack: color(random(180, 255), random(180, 255), 0, 200),
    x: random(mySize + speedValue, width - mySize - speedValue),
    y: mySize + speedValue,
    vx: 0,
    vy: 0,
    speedX: random(-speedValue, speedValue),
    speedY: random(-speedValue, speedValue),
    speedValue: speedValue,
    gravity: 0,
    acceleration: 0.2,
    startAttack: false,
    numLives: 0,
    maxLives: 3,
  };
  return enemy;
}

/**
setupGround()

function to set up the ground's size and coordinates.
*/
function setupGround() {
  //determining the height and length of the ground depending on the size of the canvas.
  ground.width = width;
  ground.height = height / 11;
  //placing the ground according to the size of the canvas and size of the ground.
  ground.x = width / 2;
  ground.y = height - ground.height / 2;
}

//------------------------------------
//------------------------------------

function draw() {
  background(0);

  simulation();

  myCursor();
}

//------------------------------------
//------------------------------------

/**
Create the simulation.
*/
function simulation() {
  displayGround();

  //loop to process the dragging of materials.
  loopForMaterialDragging();

  //loop to create the materials.
  materialsCreation();

  for (let i = 0; i < enemies.length; i++) {
    drawEnemy(enemies[i]);
  }
}

/**
moves and displays the customized cursor.
*/
function myCursor() {
  moveCursor();
  drawCursor();
}

//------------------------------------
//------------------------------------

/**
Create enemies (in Progress)
*/

function drawEnemy(enemy) {
  push();
  noStroke();
  fill(enemy.fillBeforeAttack);

  consequenceEnemyTouchingMaterial(enemy);
  moveEnemy(enemy);
  restrictEnemyToCanvas(enemy);
  ellipse(enemy.x, enemy.y, enemy.size);
  pop();
}

/**
Makes the enemy disappear when it touches a material and loose lives.
*/
function consequenceEnemyTouchingMaterial(enemy) {
  for (let i = 0; i < materials.length; i++) {
    if (enemyIsTouchingMaterial(enemy, materials[i])) {
      //Sees if the enemy still has a life
      if (enemy.numLives < enemy.maxLives) {
        //if yes, the enemy's y is reinitialized
        enemy.y = enemy.size + enemy.speedValue;
        enemy.numLives++;
      } else {
        //if not, the enemy dies/disappears.
        enemy.startAttack = false;
      }
      materials[i].fill.alpha -= 20;
      if (materials[i].fill.alpha <= 0) {
        materialIsDead(materials[i]);
        //removes the dead material from the list.
        materials.splice(i, 1);
        // if (materials.length === 0) {
        // }
      }
    }
  }
}

function materialIsDead(material) {
  startFreeFall(material);
}

/**
Checks if an enemy is touching a material.
*/
function enemyIsTouchingMaterial(enemy, material) {
  if (
    enemy.x + enemy.size / 2 >= material.x - material.width / 2 &&
    enemy.x - enemy.size / 2 <= material.x + material.width / 2 &&
    enemy.y + enemy.size / 2 >= material.y - material.height / 2 &&
    enemy.y - enemy.size / 2 <= material.y + material.height / 2 &&
    !material.isBeingDragged
  ) {
    return true;
  } else {
    return false;
  }
}

/**
Make the enemies bounce off the borders of the canvas (and ground).
*/
function restrictEnemyToCanvas(enemy) {
  if (enemy.x + enemy.size >= width + enemy.speedValue) {
    enemy.speedX = -enemy.speedX;
  }
  if (enemy.x - enemy.size <= 0 - enemy.speedValue) {
    enemy.speedX = -enemy.speedX;
  }
  if (enemy.y + enemy.size >= height - ground.height + enemy.speedValue) {
    enemy.speedY = -enemy.speedY;
  }
  if (enemy.y - enemy.size <= 0 - enemy.speedValue) {
    enemy.speedY = -enemy.speedY;
  }
}

/**
Makes the enemy move according to its velocity.
*/
function moveEnemy(enemy) {
  if (enemy.startAttack) {
    fill(enemy.fillDuringAttack);
    enemy.vx = enemy.speedX;
    enemy.vy = enemy.speedY;
  } else {
    fill(enemy.fillBeforeAttack);
    enemy.vx = 0;
    enemy.vy = 0;
  }
  enemy.x += enemy.vx;
  enemy.y += enemy.vy;
}

//------------------------------------
//------------------------------------

/**
Inside the simulation() function.
*/

/**
function that displays the ground/lower part of the canvas.
*/
function displayGround() {
  push();
  noStroke();
  fill(ground.fill.r, ground.fill.g, ground.fill.b);
  rect(ground.x, ground.y, ground.width, ground.height);
  pop();
}

/**
function to process the dragging of materials.
*/
function loopForMaterialDragging() {
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
}

/**
function that creates the materials.
*/
function materialsCreation() {
  for (let i = 0; i < materials.length; i++) {
    for (let j = 0; j < materials.length; j++) {
      if (i !== j) {
        drawMaterial(materials[i], materials[j]);
      }
    }
  }
}

//------------------------------------
//------------------------------------

/**
Inside the loopForMaterialDragging() function.
*/

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
Start a free fall and make those on top fall too.
*/
function startFreeFall(material) {
  material.isBeingDragged = false;
  material.gravity = 0.1;
  material.materialUnder = null;
  startFreeFallForMaterialOnTop(material);
}

//------------------------------------
//------------------------------------

/**
Inside the materialsCreation() function.
*/

/**
Displays the material's shape using appropriate drawing settings
*/
function drawMaterial(material, otherMaterial) {
  push();
  gravityMaterial(material, otherMaterial);
  material.y += material.gravity;
  insideCanvas(material, ground);
  // stroke(material.stroke);
  noStroke();
  if (material.colorfulFill) {
    fill(
      material.fill.r,
      material.fill.g,
      material.fill.b,
      material.fill.alpha
    );
  } else {
    fill(material.fillWhenDragged);
  }

  rect(material.x, material.y, material.width, material.height);
  pop();
}

//------------------------------------
//------------------------------------

/**
Inside the startFreeFall() and drawMaterial() functions.
*/

/**
Makes the materials on top of the current one fall when there is nothing under.
*/
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
Create the illusion of gravity.
If the material is not on the ground and not on top of another material, then it will fall.
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
constrain to make sure the shapes don't go outside the canvas.
*/
function insideCanvas(shape, ground) {
  shape.x = constrain(shape.x, shape.width / 2, width - shape.width / 2);
  shape.y = constrain(
    shape.y,
    -shape.height / 2,
    ground.y - ground.height / 2 - shape.height / 2
  );
}

//------------------------------------
//------------------------------------

/**
Inside the mousePressed() function.
*/

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

//------------------------------------
//------------------------------------

/**
Inside the myCursor() function.
*/

/**
Move the cursor to the position of the mouse
*/
function moveCursor() {
  cursor.x = mouseX;
  cursor.y = mouseY;
}

/**
Displays the cursor's shape using appropriate drawing settings
*/
function drawCursor() {
  push();
  // insideCanvas(cursor, ground);
  noFill();
  stroke(cursor.stroke);
  ellipse(cursor.x, cursor.y, cursor.width, cursor.height);
  pop();
}

//------------------------------------
//------------------------------------

/**
Sees if the mouse is inside the shape when the mouse is pressed.
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
Stops dragging when the mouse is released.
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

function keyPressed() {
  if (keyCode === ENTER) {
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].startAttack = true;
    }
  }
}
