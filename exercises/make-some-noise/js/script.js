/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// let oscillators = [];

let circles = [];
let numCircles = 10;

/**
Description of setup
*/
function setup() {
  createCanvas(700, 700);
  userStartAudio();

  for (let i = 0; i < numCircles; i++) {
    let circle = new Circle(i);
    circle.oscillator = new p5.Oscillator(440, `sine`);
    circles.push(circle);
  }
}

/**
Description of draw()
*/
function draw() {
  background(0, 100);

  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    circle.move();
    circle.sound();
    circle.display();

    circle.oscillator.freq(circle.freq);
    circle.oscillator.amp(circle.amp);
  }
}

function mousePressed() {
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    circle.oscillator.start();
  }
}
// function mouseReleased() {
//   oscillator.stop();
// }
