/**
Prototype
Mathilde Davan

This is a prototype for a bigger project. Here I concentrated more on the aesthetic
and learning how to create weird looking shapes. This prototype does not contain
any interactive elements and is more of a visual experience.
*/

"use strict";

let bigShapes = [];
let numBigShapes = 2;

let smallShapes = [];
let numSmallShapes = 3;

let lines = [];
let numLines = 3;

// let myShape;

function setup() {
  createCanvas(windowWidth, 500);

  background(0);

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
  background(0, 40);

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    line.makeLine();
  }

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

  // myShape.display();
}
