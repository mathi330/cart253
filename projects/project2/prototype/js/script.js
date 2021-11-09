/**
Prototype
Mathilde Davan

*/

"use strict";

let shapes = [];
let numShapes = 5;

let lines = [];
let numLines = 3;

function setup() {
  createCanvas(windowWidth, 500);
  background(0);

  for (let i = 0; i < numShapes; i++) {
    let shape = new Shape(i);
    shapes.push(shape);
  }

  for (let i = 0; i < numLines; i++) {
    let line = new Line(i);
    lines.push(line);
  }
}

function draw() {
  background(0, 50);

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    line.makeLine();
  }

  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    shape.move();
    shape.distort();
    shape.display();
  }
}
