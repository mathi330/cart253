/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let oscillator;

let circles = [];
let numCircles = 3;

/**
Description of setup
*/
function setup() {
  createCanvas(700, 700);
  userStartAudio();

  for (let i = 0; i < numCircles; i++) {
    let circle = new Circle(i);
    circles.push(circle);
  }

  oscillator = new p5.Oscillator(440, `sine`);
}

/**
Description of draw()
*/
function draw() {
  background(0, 100);

  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    circle.move();
    circle.display();
  }
}

function mousePressed() {
  oscillator.start();
}
