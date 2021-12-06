/**
Prototype
Mathilde Davan

This file is the main script for the project. It is used to setup and display the
shapes from the different classes. It is also mainly for the interactions with the
keyboard.
*/

"use strict";

//background
let bgColor = 0;

//Shapes
let bigShapes = [];
let numBigShapes = 2;

let smallShapes = [];
let numSmallShapes = 3;

let shapes = [];
let numShapes = 0;

//Lines
let lines = [];
let numLines = 2;

//Sound
let reverb;
let bigPlayingSound = false;
let smallPlayingSound = false;

// let myShape;

/**
setup()

Setup the canvas, background, the shapes and the necessary sound elements
*/
function setup() {
  //Basics
  createCanvas(windowWidth, windowHeight);
  background(40); //Added to make sure that at the beginning of the program the backgroung is not transparent

  //Call Reverb to use in program
  reverb = new p5.Reverb();

  //Creating 2 seperate for loops makes the big and small shapes of the same i be at the same center coordinates
  for (let i = 0; i < numBigShapes + numSmallShapes; i++) {
    if (i < numBigShapes) {
      let bigShape = new BigShape(i, false);

      bigShape.oscillator = new p5.Envelope(
        bigShape.t1,
        bigShape.l1,
        bigShape.t2,
        bigShape.l2
      ); //create an envelop for the sound
      bigShape.oscillator = new p5.Oscillator(bigShape.freq, `sine`); //add/associate a sound to the shape

      bigShapes.push(bigShape);
      bigShape.choosePoints();

      shapes.push(bigShape);
      numShapes += 1;

      reverb.process(bigShape.oscillator, 3, 2); //Creates a reverb effect for the created shape
    } else if (i >= numBigShapes && i < numBigShapes + numSmallShapes) {
      let smallShape = new SmallShape(i, false);

      smallShape.oscillator = new p5.Envelope(
        smallShape.t1,
        smallShape.l1,
        smallShape.t2,
        smallShape.l2
      ); //create an envelop for the sound
      smallShape.oscillator = new p5.Oscillator(smallShape.freq, `sine`); //add/associate a sound to the shape

      smallShapes.push(smallShape);
      smallShape.choosePoints();

      shapes.push(smallShape);
      numShapes += 1;

      reverb.process(smallShape.oscillator, 3, 2); //Creates a reverb effect for the created shape
    }
  }

  for (let i = 0; i < numLines; i++) {
    let line = new Line(i);
    lines.push(line);
  }

  ///

  // myShape = new ShapeNotMoving();
}

/**
draw()
Creates a background (on top of the setup backgrounds) and calls the functions
used to display the lines and shapes
*/
function draw() {
  background(bgColor, 40);

  displayLines();
  displayShapes();

  // myShape.display();
}

/**
displayLines()
Displays the lines according to their class
*/
function displayLines() {
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    line.makeLine();
  }
}

/**
displayShapes()
Displays the big and small shapes according to their class
*/
function displayShapes() {
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];

    shape.move();
    shape.sound();
    shape.distort();
    shape.display();

    //add sound to the circle using the information from the shape class
    shape.oscillator.freq(shape.freq);
    shape.oscillator.amp(shape.amp);
  }
}

/**
keyPressed()

All the keyboard interactions
*/
function keyPressed() {
  // change background color when pressing the spacebar
  if (keyCode === 32) {
    if (bgColor === 0) {
      bgColor = 255;
    } else {
      bgColor = 0;
    }
  }

  // change shapes and lines' color when pressing enter
  else if (keyCode === ENTER) {
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

  // change the color of one moving thing at random
  else if (keyCode === SHIFT) {
    let randomRed = random(20, 255);
    let randomGreen = random(20, 255);
    let randomBlue = random(20, 255);
    let randomAlpha = random(210, 255);

    let chooseLineOrShape = Math.floor(random(shapes.length + lines.length));
    if (chooseLineOrShape < shapes.length) {
      let chooseShape = Math.floor(random(shapes.length));
      shapes[chooseShape].r = randomRed;
      shapes[chooseShape].g = randomGreen;
      shapes[chooseShape].b = randomBlue;
      shapes[chooseShape].a = randomAlpha;
    } else {
      let chooseLine = Math.floor(random(lines.length));
      lines[chooseLine].r = randomRed;
      lines[chooseLine].g = randomGreen;
      lines[chooseLine].b = randomBlue;
      lines[chooseLine].a = randomAlpha;
    }
  }

  //start and stop the sound of lines
  else if (keyCode === UP_ARROW) {
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      //If statement to see if the sound is already playing and change accordingly
      if (!line.playingSound) {
        line.startSound();
      } else if (line.playingSound) {
        line.stopSound();
      }
    }
  }

  // start and stop the sound of big shapes
  else if (keyCode === RIGHT_ARROW) {
    for (let i = 0; i < bigShapes.length; i++) {
      let bigShape = bigShapes[i];

      //If the playingSound variable is false (the sound is not playing)
      if (bigShape.playingSound === false) {
        bigShape.oscillator.start(); //Start the sound
        //Set the playingSound variables to true
        bigShape.playingSound = true;
        bigPlayingSound = true;

        //If the playingSound variable is true (the sound is playing)
      } else if (bigShape.playingSound === true) {
        bigShape.oscillator.stop(); //Stop the sound
        //Set the playingSound variables to false
        bigShape.playingSound = false;
        bigPlayingSound = false;
      }
    }
  }

  //start and stop the sound of small shapes
  else if (keyCode === DOWN_ARROW) {
    for (let i = 0; i < smallShapes.length; i++) {
      let smallShape = smallShapes[i];

      //If the playingSound variable is false (the sound is not playing)
      if (smallShape.playingSound === false) {
        smallShape.oscillator.start(); //Start the sound
        //Set the playingSound variables to true
        smallShape.playingSound = true;
        smallPlayingSound = true;

        //If the playingSound variable is true (the sound is playing)
      } else if (smallShape.playingSound === true) {
        smallShape.oscillator.stop(); //Stop the sound
        //Set the playingSound variables to false
        smallShape.playingSound = false;
        smallPlayingSound = false;
      }
    }
  }

  //create a new big shape taking the sound into consideration when pressing the left arrow
  else if (keyCode === LEFT_ARROW) {
    //If statement to determine wether the sound associated with the new shape should be heard or not
    //If the other shapes' sound are not playing
    if (!bigPlayingSound) {
      let bigShape = new BigShape(shapes.length + 1, false); //create a new shape

      bigShape.oscillator = new p5.Envelope(
        bigShape.t1,
        bigShape.l1,
        bigShape.t2,
        bigShape.l2
      ); //create an envelop for the sound of the new shape
      bigShape.oscillator = new p5.Oscillator(bigShape.freq, `sine`); //create a new oscillator for the new shape
      bigShapes.push(bigShape); //adds the shape to the array of already existing shapes
      bigShape.choosePoints();

      shapes.push(bigShape);

      reverb.process(bigShape.oscillator, 3, 2); //adds a reverb effect to the sound

      //If the other shapes' sound are playing
    } else {
      let bigShape = new BigShape(shapes.length + 1, true);

      bigShape.oscillator = new p5.Envelope(
        bigShape.t1,
        bigShape.l1,
        bigShape.t2,
        bigShape.l2
      );
      bigShape.oscillator = new p5.Oscillator(bigShape.freq, `sine`);
      bigShapes.push(bigShape);
      bigShape.choosePoints();

      shapes.push(bigShape);

      reverb.process(bigShape.oscillator, 3, 2);
      bigShape.oscillator.start(); //starts the sound for this shape too
    }
  }

  //create a new small shape taking the sound into consideration when pressing "m"
  else if (keyCode === 109 || keyCode === 77) {
    //If statement to determine wether the sound associated with the new shape should be heard or not
    //If the other shapes' sound are not playing
    if (!smallPlayingSound) {
      let smallShape = new SmallShape(shapes.length + 1, false); //create a new shape

      smallShape.oscillator = new p5.Envelope(
        smallShape.t1,
        smallShape.l1,
        smallShape.t2,
        smallShape.l2
      ); //create an envelop for the sound of the new shape
      smallShape.oscillator = new p5.Oscillator(smallShape.freq, `sine`); //create a new oscillator for the new shape
      smallShapes.push(smallShape); //adds the shape to the array of already existing shapes
      smallShape.choosePoints();

      shapes.push(smallShape);

      reverb.process(smallShape.oscillator, 3, 2); //adds a reverb effect to the sound

      //If the other shapes' sound are playing
    } else {
      let smallShape = new SmallShape(shapes.length + 1, true);

      smallShape.oscillator = new p5.Envelope(
        smallShape.t1,
        smallShape.l1,
        smallShape.t2,
        smallShape.l2
      );
      smallShape.oscillator = new p5.Oscillator(smallShape.freq, `sine`);
      smallShapes.push(smallShape);
      smallShape.choosePoints();

      shapes.push(smallShape);

      reverb.process(smallShape.oscillator, 3, 2);
      smallShape.oscillator.start(); //starts the sound for this shape too
    }
  }

  // add a lightning-like line (it appears and disappears in a flash)
  else if (keyCode === BACKSPACE) {
    let line = new Line(random(1000));
    line.spaceBetweenPoints = 0.1; //continuous line (no visible space between points)
    // color white
    line.r = 255;
    line.g = 255;
    line.b = 255;
    line.a = 255;

    line.makeLine();
  }

  // delete a shape when pressing ctrl
  else if (keyCode === CONTROL) {
    shapes[0].oscillator.stop();
    shapes.splice(0, 1);
  }

  //change the thickness of all the shapes and lines
  else if (keyCode === 97 || keyCode === 65) {
    if (lines[0].strokeWeight > 2) {
      for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        let chooseThickness = random(1, 5);
        shape.strokeWeight = chooseThickness;
      }
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let chooseThickness = random(0.5, 2);
        let chooseSpaceBetweenPoints = random(1, 6);
        line.strokeWeight = chooseThickness;
        line.spaceBetweenPoints = chooseSpaceBetweenPoints;
      }
    } else {
      for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        let chooseThickness = random(5, 12);
        shape.strokeWeight = chooseThickness;
      }
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let chooseThickness = random(3, 6);
        let chooseSpaceBetweenPoints = random(6, 10);
        line.strokeWeight = chooseThickness;
        line.spaceBetweenPoints = chooseSpaceBetweenPoints;
      }
    }
  }

  // change the thickness of one shape or line when pressing 'c'
  else if (keyCode === 99 || keyCode === 67) {
    let chooseLineOrShape = Math.floor(random(shapes.length + lines.length));
    if (chooseLineOrShape < shapes.length) {
      let chooseShape = Math.floor(random(shapes.length));
      let chooseThickness;

      if (shapes[chooseShape].strokeWeight > 5) {
        chooseThickness = random(1, 5);
      } else {
        chooseThickness = random(5, 12);
      }
      shapes[chooseShape].strokeWeight = chooseThickness;
    } else {
      let chooseLine = Math.floor(random(lines.length));
      let chooseThickness;
      let chooseSpaceBetweenPoints;

      if (lines[chooseLine].strokeWeight > 5) {
        chooseThickness = random(0.7, 2);
        chooseSpaceBetweenPoints = random(1, 6);
      } else {
        chooseThickness = random(3, 6);
        chooseSpaceBetweenPoints = random(6, 10);
      }
      lines[chooseLine].strokeWeight = chooseThickness;
      lines[chooseLine].spaceBetweenPoints = chooseSpaceBetweenPoints;
    }
  }

  // change the distortion range of the shapes

  // change number of oscillators?

  // add audio input to change the color?
}
