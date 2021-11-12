/**
Make Some Noise
Mathilde Davan

In this exercise, I experiment with sound and the oscillator. This project pairs
sound with the movements of circles on a canvas. Each circle has a sound with a
frequency that changes depending on the x position of the circle and an amplitude
that varies with the y position. The viewer can interact with the piece by adding
circles, and therefore sounds, by clicking with their mouse. They can also mute
and unmute the sound by clicking on the spacebar and delete a circle by clicking
on the backspace key of their keyboard (stopping the sound of that circle at the
same time).
The circles visual also changes with audio input. If the viewer makes a loud sound,
the circles will get bigger and turn more red/pink.
*/

"use strict";

let mic;

let reverb;

let circles = [];
let numCircles = 1;

let playingSound = false;

/**
setup()

Setup the circle and sound information necessary in the program
*/
function setup() {
  createCanvas(windowWidth, 500);
  userStartAudio();

  //Call Reverb and AudioIn to use them in the program
  reverb = new p5.Reverb();
  mic = new p5.AudioIn();
  mic.start();

  //Create the original circle(s) that are present at the beginning of the program
  for (let i = 0; i < numCircles; i++) {
    let circle = new Circle(i, false); //create the circle

    circle.oscillator = new p5.Envelope(
      circle.t1,
      circle.l1,
      circle.t2,
      circle.l2
    ); //create an envelop for the sound
    circle.oscillator = new p5.Oscillator(circle.freq, `sine`); //add/associate a sound to the circle
    circles.push(circle); //put the newly created circle in the circles array

    reverb.process(circle.oscillator, 3, 2); //Creates a reverb effect for the created circle
  }
}

/**
draw()

Display the circles and play the sound when necessary
*/
function draw() {
  background(0, 100);

  //Display the circles
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    //call the functions from the circle class
    circle.move();
    circle.sound();
    circle.colorChange();
    circle.display();

    //add sound to the circle using the information from the circle class
    circle.oscillator.freq(circle.freq);
    circle.oscillator.amp(circle.amp);
  }
}

/**
mousePressed()

Add a circle every time the mouse is pressed
*/
function mousePressed() {
  //If statement to determine wether the sound associated with the new circle should be heard or not
  //If the other circles' sound are not playing
  if (playingSound === false) {
    let circle = new Circle(circles.length, false); //create a new circle

    circle.oscillator = new p5.Envelope(
      circle.t1,
      circle.l1,
      circle.t2,
      circle.l2
    ); //create an envelop for the sound of the new circle
    circle.oscillator = new p5.Oscillator(circle.freq, `sine`); //create a new oscillator for the new circle
    circles.push(circle); //adds the circle to the array of already existing circles

    reverb.process(circle.oscillator, 3, 2); //adds a reverb effect to the sound

    //If the other circles' sound are playing
  } else if (playingSound === true) {
    let circle = new Circle(circles.length, true);

    circle.oscillator = new p5.Envelope(
      circle.t1,
      circle.l1,
      circle.t2,
      circle.l2
    );
    circle.oscillator = new p5.Oscillator(circle.freq, `sine`);
    circles.push(circle);

    reverb.process(circle.oscillator, 3, 2);
    circle.oscillator.start(); //starts the sound for this circle too
  }
}

/**
keyPressed()

Make the sound start and stop playing when pressing the spacebar.
*/
function keyPressed() {
  //Sees if the key that is pressed is the spacebar
  if (keyCode === 32) {
    for (let i = 0; i < circles.length; i++) {
      let circle = circles[i];

      //If the playingSound variable is false (the sound is not playing)
      if (circle.playingSound === false) {
        circle.oscillator.start(); //Start the sound
        //Set the playingSound variables to true
        circle.playingSound = true;
        playingSound = true;

        //If the playingSound variable is true (the sound is playing)
      } else if (circle.playingSound === true) {
        circle.oscillator.stop(); //Stop the sound
        //Set the playingSound variables to false
        circle.playingSound = false;
        playingSound = false;
      }
    }
  }
  //Sees if the key that is pressed is the backspace
  if (keyCode === BACKSPACE) {
    circles[0].oscillator.stop(); //stops the sound of the first circle in the array
    circles.splice(0, 1); //deletes the first circle in the array
  }
}
