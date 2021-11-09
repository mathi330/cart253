/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let mic;

let circles = [];
let numCircles = 10;

// let circleColor = {
//   r: undefined,
//   g: undefined,
//   b: undefined,
// };

/**
Description of setup
*/
function setup() {
  createCanvas(700, 700);
  userStartAudio();

  for (let i = 0; i < numCircles; i++) {
    // circleColor.r = random(50, 120);
    // circleColor.g = random(80, 180);
    // circleColor.b = random(150, 255);
    let circle = new Circle(i);
    circle.oscillator = new p5.Oscillator(440, `sine`);
    circles.push(circle);
  }

  mic = new p5.AudioIn();
  mic.start();
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

    let micLevel = mic.getLevel();
    let r = map(micLevel, 0, 1, circle.stroke.r, 255);
    circle.stroke.r = r;
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
