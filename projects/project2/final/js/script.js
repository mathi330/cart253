/**
Prototype
Mathilde Davan

This is a prototype for a bigger project. Here I concentrated more on the aesthetic
and learning how to create weird looking shapes. This prototype does not contain
any interactive elements and is more of a visual experience.
*/

"use strict";

//background
let bgColor = 0;

//Shapes
let bigShapes = [];
let numBigShapes = 2;

let smallShapes = [];
let numSmallShapes = 3;

//Lines
let lines = [];
let numLines = 3;

//Sound
let reverb;
let playingSound = false;

// let myShape;

function setup() {
  //Basics
  createCanvas(windowWidth, windowHeight);
  background(40); //Added to make sure that at the beginning of the program the backgroung is not transparent

  //Call Reverb to use in program
  // reverb = new p5.Reverb();

  //Creating 2 seperate for loops makes the big and small shapes of the same i be at the same center coordinates
  for (let i = 0; i < numBigShapes + numSmallShapes; i++) {
    if (i < numBigShapes) {
      let bigShape = new BigShape(i);
      bigShapes.push(bigShape);
      bigShape.choosePoints();
    } else if (i >= numBigShapes && i < numBigShapes + numSmallShapes) {
      let smallShape = new SmallShape(i);
      smallShapes.push(smallShape);
      smallShape.choosePoints();
    }
  }

  for (let i = 0; i < numLines; i++) {
    let line = new Line(i);
    lines.push(line);
  }

  ///

  // myShape = new ShapeNotMoving();
}

function draw() {
  background(bgColor, 40);

  displayLines();
  displayShapes();

  // myShape.display();
}

function displayLines() {
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    line.makeLine();
  }
}

function displayShapes() {
  for (let i = 0; i < bigShapes.length; i++) {
    let bigShape = bigShapes[i];
    bigShape.move();
    bigShape.distort();
    bigShape.display();
  }

  for (let i = 0; i < smallShapes.length; i++) {
    let smallShape = smallShapes[i];
    smallShape.move();
    smallShape.distort();
    smallShape.display();
  }
}

/**
keyPressed()

All the keyboard interactions
*/
function keyPressed() {
  if (keyCode === 32) {
    if (bgColor === 0) {
      bgColor = 255;
    } else {
      bgColor = 0;
    }
  } else if (keyCode === ENTER) {
    for (let i = 0; i < bigShapes.length; i++) {
      let shape = bigShapes[i];
      shape.colorChange();
    }
    for (let i = 0; i < smallShapes.length; i++) {
      let shape = smallShapes[i];
      shape.colorChange();
    }
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      line.colorChange();
    }
  }
}
