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

let reverb;

/**
Description of setup
*/
function setup() {
  createCanvas(700, 700);
  userStartAudio();

  reverb = new p5.Reverb();
  mic = new p5.AudioIn();
  mic.start();

  for (let i = 0; i < numCircles; i++) {
    let circle = new Circle(i);

    circle.oscillator = new p5.Envelope(
      circle.t1,
      circle.l1,
      circle.t2,
      circle.l2
    );
    circle.oscillator = new p5.Oscillator(circle.freq, `sine`);
    circles.push(circle);

    reverb.process(circle.oscillator, 3, 2);
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
    circle.colorChange();
    circle.display();

    circle.oscillator.freq(circle.freq);
    circle.oscillator.amp(circle.amp);
  }
}

// Make the sound start and stop playing when clicking on the canvas.
function mousePressed() {
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    if (circle.playingSound === false) {
      circle.oscillator.start();
      circle.playingSound = true;
    } else if (circle.playingSound === true) {
      circle.oscillator.stop();
      circle.playingSound = false;
    }
  }
}
