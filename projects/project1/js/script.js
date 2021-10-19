/**
Building Blocks
Mathilde Davan

This project is a game/simulation where the player builds something with blocks
(what I call "material" in my code) and see if they will all be destroyed by the
enemy attack or if some will remain at the end of the time.
The game starts on a title page with the instructions on how to play and three
levels for the player to choose from.
The simulation starts with the chosen level and with only the materials for the
player to build with. Once the player is done building, they can start the
enemy attack that lasts 15 seconds by pressing ENTER on their keyboard.
During the attack, the player cannot interact with the simulation and only wait
for one of the 2 possible endings. They can see the remaining time at the bottom
of the canvas with the dark line in the ground reducing.
The happy ending happens if there are still materials after the end of the
attack, while the sad ending happens if all the materials were destroyed by the
enemies.
After either ending, the player can click on any key of their keyboard to go
back to the title page.
*/

"use strict";

let state = `title`;

// The bottom of the canvas that represents the earth/ground.
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

// The object for the visual aspect of the timer
let myLittleTimer = {
  x: 0,
  y: undefined,
  width: undefined,
  height: ground.height / 3,
};

// The customized cursor (a small circle)
let cursor = {
  x: undefined,
  y: undefined,
  width: 5,
  height: 5,
  stroke: undefined,
};

// Objects for the buttons
let easy = {
  x: undefined,
  y: undefined,
  width: 160,
  height: 40,
  fill: {
    r: undefined,
    g: undefined,
    b: undefined,
    alpha: 200,
  },
  fillHover: 150,
  hover: false,
};

let medium = {
  x: undefined,
  y: undefined,
  width: 160,
  height: 40,
  fill: {
    r: undefined,
    g: undefined,
    b: undefined,
    alpha: 200,
  },
  fillHover: 150,
  hover: false,
};

let hard = {
  x: undefined,
  y: undefined,
  width: 160,
  height: 40,
  fill: {
    r: undefined,
    g: undefined,
    b: undefined,
    alpha: 200,
  },
  fillHover: 150,
  hover: false,
};

// The background shapes.
let bg = [];
let bgCount = 3;

// The materials.
let materials = [];
let countMaterial = undefined;
let allowMovingMaterial = true;

// The enemies
let enemies = [];
let countEnemy = undefined;

//Timer
let beginTimer = false;
// 60 frames per second so 60 times the number of seconds I want.
let numSec = 60 * 15;
let myTimer = numSec;

//------------------------------------
//------------------------------------

/**
function to setup things that need to be there from the start but don't need
to be reinitialized for every game.
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  setupGround();
  noCursor();
  chooseButtonsColor();

  initializeBackground();

  // Default stroke colors for the cursor.
  cursor.stroke = color(255);
}

//------------------------------------
//------------------------------------

/**
function to choose the colors of the buttons for the levels.
*/
function chooseButtonsColor() {
  easy.fill.r = random(150, 255);
  easy.fill.g = random(100, 150);
  easy.fill.b = random(150, 230);
  medium.fill.r = random(150, 255);
  medium.fill.g = random(100, 150);
  medium.fill.b = random(150, 230);
  hard.fill.r = random(150, 255);
  hard.fill.g = random(100, 150);
  hard.fill.b = random(150, 230);
}

/**
Initializing the objects for the game.
*/
function createEverythingForGame() {
  //Create and setup all the materials.
  for (let i = 0; i < countMaterial; i++) {
    let material = createMaterial();
    materials.push(material);
  }
  allowMovingMaterial = true;

  //Create and setup all the enemies.
  for (let i = 0; i < countEnemy; i++) {
    let enemy = createEnemy();
    enemies.push(enemy);
  }
}

/**
function for the material's object.
*/
function createMaterial() {
  let myWidth = random(width / 17, width / 12);
  let myHeight = random(height / 25, height / 13);
  let material = {
    x: random(myWidth / 2, width - myWidth / 2),
    y: random(myHeight, height - ground.height - myHeight / 2),
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
      alpha: 100,
    },
    // stroke: 255,
    isBeingDragged: false,
    gravity: 0,
    acceleration: 0.05,
    materialUnder: null,
    start: true,
  };
  return material;
}

/**
function for the enemy's object (similar to the one for the material).
*/
function createEnemy() {
  let mySize = random(width / 60, width / 100);
  let speedValues = [-7, -6, -5, -4, -3, 3, 4, 5, 6, 7];
  let enemy = {
    size: mySize,
    fill: color(random(180, 255), random(180, 255), 0, 200),
    x: random(mySize + 6, width - mySize - 6),
    y: mySize + 6,
    vx: 0,
    vy: 0,
    speedX: random(speedValues),
    speedY: random(speedValues),
    maxSpeedValue: 6,
    startAttack: false,
    numLives: 0,
    maxLives: 5,
    noEnemy: true,
  };
  return enemy;
}

/**
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

/**
function to reset everything once the game is finished.
*/
function reset() {
  materials.length = 0;
  let countMaterial = undefined;
  enemies.length = 0;
  let countEnemy = undefined;
  beginTimer = false;
  myTimer = 60 * 15;
  createMaterial();
  createEnemy();
  chooseButtonsColor();
  initializeBackground();
}

/**
Set up the background rectangles.
*/
function initializeBackground() {
  bg = [];
  for (let i = 0; i < bgCount; i++) {
    let myBackground = createBackgroundShapes();
    bg.push(myBackground);
  }
}

/**
function for the object of the rectangles in the background
*/
function createBackgroundShapes() {
  let myWidth = random((width / 4) * random(1, 3), (width / 2) * random(1, 2));
  let myHeight = random(
    (height / 5) * random(1, 4),
    (height / 3) * random(1, 2)
  );
  let myBackground = {
    x: random(0, width),
    y: random(0, height),
    width: myWidth,
    height: myHeight,
    fill: color(200, random(10, 20)),
  };
  return myBackground;
}

//------------------------------------
//------------------------------------

/**
Function calling the title, the simulation, and the endings.
*/
function draw() {
  drawBackground();

  switch (state) {
    case `title`:
      title();
      break;

    case `simulation`:
      simulation();
      break;

    case `happy ending`:
      happyEnding();
      break;

    case `sad ending`:
      sadEnding();
      break;
  }

  myCursor();
}

//------------------------------------
//------------------------------------

function drawBackground() {
  background(0);
  for (let i = 0; i < bg.length; i++) {
    push();
    noStroke();
    fill(bg[i].fill);
    rect(bg[i].x, bg[i].y, bg[i].width, bg[i].height);
    pop();
  }
}

/**
Create the title page with the instructions for the user.
*/
function title() {
  push();
  fill(255);
  textFont(`Quicksand`);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(
    `Instructions:
    Drag and drop the blocks to build a structure.
    Press ENTER to start the enemy attack.
    Try to make a structure that will survive until the time is up!`,
    width / 2,
    height / 7
  );

  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(`Building Blocks`, width / 2, height / 2);
  pop();
  easyButton();
  mediumButton();
  hardButton();
}

/**
Create the simulation.
*/
function simulation() {
  displayGround();

  //loop to process the dragging of a material and makes the materials on top fall
  loopForMaterialDragging();

  //loop to create the materials inside the canvas, and have a gravity.
  materialsCreation();

  //Loop to create enemies inside the canvas when the attack starts.
  enemiesCreation();

  //Chooses 1 of 2 endings.
  //   happy ending: when the timer ends before all the materials disappear.
  //   sad ending: when all the materials are killed by the enemies before the end of the timer.
  chooseEnding();
}

/**
Create the endings
*/
function happyEnding() {
  push();
  stroke(255);
  fill(255);
  textFont(`Quicksand`);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(`You survived the enemies!`, width / 2, height / 2);
  textAlign(CENTER, BOTTOM);
  textSize(20);
  text(`Click any key to start again!`, width / 2, (height / 5) * 4);
  pop();
}

function sadEnding() {
  push();
  fill(255);
  textFont(`Quicksand`);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(
    `Nothing is left standing...
You ruined the world...`,
    width / 2,
    height / 2
  );
  textAlign(CENTER, BOTTOM);
  textSize(20);
  text(`Click any key to start again!`, width / 2, (height / 5) * 4);
  pop();
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
Inside the title() function.
*/

/**
The three following functions are to create the buttons to choose the level.
*/
function easyButton() {
  push();
  noStroke();
  easy.x = width / 6;
  easy.y = (height / 6) * 5;

  //Create a hover effect
  if (mouseIsInsideShape(easy)) {
    easy.hover = true;
  } else {
    easy.hover = false;
  }
  if (easy.hover) {
    fill(easy.fillHover);
  } else {
    fill(easy.fill.r, easy.fill.g, easy.fill.b, easy.fill.alpha);
  }

  rect(easy.x, easy.y, easy.width, easy.height);

  //text inside the button.
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(`Easy`, easy.x, easy.y);
  pop();
}

function mediumButton() {
  push();
  noStroke();
  medium.x = (width / 6) * 3;
  medium.y = (height / 6) * 5;

  //Create a hover effect
  if (mouseIsInsideShape(medium)) {
    medium.hover = true;
  } else {
    medium.hover = false;
  }
  if (medium.hover) {
    fill(medium.fillHover);
  } else {
    fill(medium.fill.r, medium.fill.g, medium.fill.b, medium.fill.alpha);
  }
  rect(medium.x, medium.y, medium.width, medium.height);

  //text inside the button.
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(`Medium`, medium.x, medium.y);
  pop();
}

function hardButton() {
  push();
  noStroke();
  hard.x = (width / 6) * 5;
  hard.y = (height / 6) * 5;

  //Create a hover effect
  if (mouseIsInsideShape(hard)) {
    hard.hover = true;
  } else {
    hard.hover = false;
  }
  if (hard.hover) {
    fill(hard.fillHover);
  } else {
    fill(hard.fill.r, hard.fill.g, hard.fill.b, hard.fill.alpha);
  }
  rect(hard.x, hard.y, hard.width, hard.height);

  //text inside the button.
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(`Hard`, hard.x, hard.y);
  pop();
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
function to process the dragging of a material and the fall of any material on top of it.
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
      if (material.y === height - ground.height - material.height / 2) {
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

/**
function that creates the enemies.
*/
function enemiesCreation() {
  for (let i = 0; i < enemies.length; i++) {
    drawEnemy(enemies[i]);
  }
}

//------------------------------------
//------------------------------------

/**
Inside the loopForMaterialDragging() function.
*/

/**
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
    //looks if 2 shapes are touching/overlapping.
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
  material.gravity = 0.05;
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

  //Change the color of the material depending on if it is being dragged (grey) or not (color).
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

  //Loop to make the materials fall at the start of the simulation.
  //If 2 materials are overlapping at the start, one will not fall => needs debugging.
  if (material.start) {
    startFreeFall(material);
    material.start = false;
  }
  rect(material.x, material.y, material.width, material.height);
  pop();
}

//------------------------------------
//------------------------------------

/**
Inside the enemiesCreation() function.
*/

/**
Displays the enemy's shape using appropriate drawing settings
*/
function drawEnemy(enemy) {
  if (!enemy.noEnemy) {
    push();
    noStroke();
    fill(enemy.fill);
    restrictEnemyToCanvas(enemy);
    consequenceEnemyTouchingMaterial(enemy);
    moveEnemy(enemy);
    ellipse(enemy.x, enemy.y, enemy.size);
    pop();
  }
}

//------------------------------------
//------------------------------------

/**
Inside the startFreeFall() function.
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

//------------------------------------
//------------------------------------

/**
Inside the drawMaterial() function.
*/

/**
Create the illusion of gravity.
If the material is not on the ground and not on top of another material, then it will fall.
*/
function gravityMaterial(material, otherMaterial) {
  //If statement to create a gravity effect.

  if (!material.isBeingDragged && material.gravity > 0) {
    if (material.y === height - ground.height - material.height / 2) {
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
    height - ground.height - shape.height / 2
  );
}

//------------------------------------
//------------------------------------

/**
Inside the drawEnemy() function.
*/

/**
Make the enemies bounce off the borders of the canvas (and ground).
*/
function restrictEnemyToCanvas(enemy) {
  if (enemy.x + enemy.size >= width + enemy.maxSpeedValue) {
    enemy.speedX = -enemy.speedX;
  }
  if (enemy.x - enemy.size <= 0 - enemy.maxSpeedValue) {
    enemy.speedX = -enemy.speedX;
  }
  if (enemy.y + enemy.size >= height - ground.height + enemy.maxSpeedValue) {
    enemy.speedY = -enemy.speedY;
  }
  if (enemy.y - enemy.size <= 0 - enemy.maxSpeedValue) {
    enemy.speedY = -enemy.speedY;
  }
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
        enemy.y = enemy.size + enemy.maxSpeedValue;
        enemy.numLives++;
      } else {
        //if not, the enemy disappears.
        enemy.startAttack = false;
      }
      //Every time a material is touched by an enemy, it will become more transparent.
      materials[i].fill.alpha -= 20;
      //If it is completely transparent, it dies and is no longer there.
      if (materials[i].fill.alpha < 10) {
        startFreeFall(materials[i]);
        materials.splice(i, 1);
      }
    }
  }
}

/**
Makes the enemy move according to its velocity.
*/
function moveEnemy(enemy) {
  if (enemy.startAttack) {
    enemy.vx = enemy.speedX;
    enemy.vy = enemy.speedY;
    enemy.noEnemy = false;
  } else {
    enemy.vx = 0;
    enemy.vy = 0;
    enemy.noEnemy = true;
  }
  enemy.x += enemy.vx;
  enemy.y += enemy.vy;
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

//------------------------------------
//------------------------------------

/**
Chooses between the 2 possible endings
considering the timer and the number of material left.
*/
function chooseEnding() {
  if (beginTimer) {
    myTimer--;
    //Create a visual timer at the bottom of the canvas (in the ground).
    push();
    rectMode(CORNER);
    noStroke();
    fill(50, 100);

    let thePassingTime;
    thePassingTime = map(myTimer, 0, numSec, 0, ground.width);
    myLittleTimer.y = height - myLittleTimer.height;
    myLittleTimer.width = thePassingTime;

    rect(
      myLittleTimer.x,
      myLittleTimer.y,
      myLittleTimer.width,
      myLittleTimer.height
    );
    pop();

    //Chooses ending.
    if (materials.length <= 1 && state === `simulation`) {
      state = `sad ending`;
    } else if (myTimer <= 0 && materials.length > 0 && state === `simulation`) {
      state = `happy ending`;
    }
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
Sees if the mouse is inside the shape when the mouse is pressed.
*/
function mousePressed() {
  //3 first statement are to make the simulation start depending on the level selected.
  //Easy
  if (state === `title` && mouseIsInsideShape(easy)) {
    state = `simulation`;
    countMaterial = 8;
    countEnemy = 7;
    createEverythingForGame();
  }
  //Medium
  if (state === `title` && mouseIsInsideShape(medium)) {
    state = `simulation`;
    countMaterial = 8;
    countEnemy = 13;
    createEverythingForGame();
  }
  //Hard
  if (state === `title` && mouseIsInsideShape(hard)) {
    state = `simulation`;
    countMaterial = 10;
    countEnemy = 16;
    createEverythingForGame();
  }

  //Drag a material in the simulation.
  if (state === `simulation`) {
    if (allowMovingMaterial) {
      for (let i = 0; i < materials.length; i++) {
        if (mouseIsInsideShape(materials[i])) {
          materials[i].isBeingDragged = true;

          materials[i].materialUnder = null;
          //make any material on top of the material being dragged start falling.
          startFreeFallForMaterialOnTop(materials[i]);
        }
      }
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
  if (allowMovingMaterial) {
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
}

function keyPressed() {
  //Start the enemy attack.
  if (keyCode === ENTER && state === `simulation`) {
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].startAttack = true;
      enemies[i].noEnemy = false;
    }
    beginTimer = true;
    allowMovingMaterial = false;
  }

  //restarts the game oncce it's finished.
  if (state === `happy ending` || state === `sad ending`) {
    reset();
    state = `title`;
  }
}
