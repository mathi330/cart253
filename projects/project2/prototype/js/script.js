/**
Prototype
Mathilde Davan

*/

"use strict";

let shapes = [];
let numShapes = 3;

function setup() {
  createCanvas(700, 700);

  for (let i = 0; i < numShapes; i++) {
    let shape = new Shape();
    shapes.push(shape);
  }
}

function draw() {
  background(0);

  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    shape.move();
    shape.distort();
    shape.display();
  }
}
