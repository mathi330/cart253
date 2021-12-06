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

// variables for the change in distortion in the keyboard interactions
let currentDistRange = 0;
let smallDistRange = [0, 15, 30, 45, 60];
let bigDistRange = [0, 30, 60, 90, 120];

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
      let bigShape = new BigShape(i, false); //create a new big shape

      bigShape.oscillator = new p5.Envelope(
        bigShape.t1,
        bigShape.l1,
        bigShape.t2,
        bigShape.l2
      ); //create an envelop for the sound
      bigShape.oscillator = new p5.Oscillator(bigShape.freq, `sine`); //add/associate a sound to the shape

      bigShapes.push(bigShape); //add the shape to the bigShapes array
      bigShape.choosePoints(); //create/choose the points of the shape

      shapes.push(bigShape); //add the shape to the shapes array
      numShapes += 1; //count the number of objects in the shapes array

      reverb.process(bigShape.oscillator, 3, 2); //Creates a reverb effect for the created shape
    }
    // Create the small shapes
    else if (i >= numBigShapes) {
      let smallShape = new SmallShape(i, false); //create a new small shape

      smallShape.oscillator = new p5.Envelope(
        smallShape.t1,
        smallShape.l1,
        smallShape.t2,
        smallShape.l2
      ); //create an envelop for the sound
      smallShape.oscillator = new p5.Oscillator(smallShape.freq, `sine`); //add/associate a sound to the shape

      smallShapes.push(smallShape); //add the shape to the smallShapes array
      smallShape.choosePoints(); //create/choose the points of the shape

      shapes.push(smallShape); //add the shape to the shapes array
      numShapes += 1; //count the number of objects in the shapes array

      reverb.process(smallShape.oscillator, 3, 2); //Creates a reverb effect for the created shape
    }
  }

  //Create the lines
  for (let i = 0; i < numLines; i++) {
    let line = new Line(i); //create a new line
    lines.push(line); //add the line at the end of the lines array
  }
}

/**
draw()
Creates a background (on top of the setup backgrounds) and calls the functions
used to display the lines and shapes
*/
function draw() {
  background(bgColor, 40);

  // display the lines and make them move
  displayLines();
  // display the shapes, make them move and distort
  displayShapes();
}

/**
displayLines()
Displays the lines according to their class
*/
function displayLines() {
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    line.makeLine(); //creates the line point by point
  }
}

/**
displayShapes()
Displays the big and small shapes according to their class
*/
function displayShapes() {
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];

    shape.move(); //makes the whole shape move
    shape.sound(); //modifies the frequency and amplitude depending on the shape's position
    shape.distort(); //makes each point of the shape move on its own
    shape.display(); //display

    //apply the frequency and amplitude
    shape.oscillator.freq(shape.freq);
    shape.oscillator.amp(shape.amp);
  }
}

/**
keyPressed()
All the keyboard interactions
*/
function keyPressed() {
  // (SPACEBAR) change background color
  if (keyCode === 32) {
    if (bgColor === 0) {
      bgColor = 255; // if black background, it turns white
    } else {
      bgColor = 0; // if white background, it turns black
    }
  }

  // (ENTER) change all the shapes and lines' color
  else if (keyCode === ENTER) {
    // Make the shapes change color
    for (let i = 0; i < shapes.length; i++) {
      let shape = shapes[i];
      shape.colorChange();
    }
    // Make the lines change color
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      line.colorChange();
    }
  }

  // (SHIFT) change the color of one moving object at random
  else if (keyCode === SHIFT) {
    // Choose a random color and alpha value
    let randomRed = random(20, 255);
    let randomGreen = random(20, 255);
    let randomBlue = random(20, 255);
    let randomAlpha = random(210, 255);

    // choose a random number between 0 and the total number of moving objects (shapes and lines)
    let chooseLineOrShape = Math.floor(random(shapes.length + lines.length));

    // If the number is smaller than the shapes array, modify the color of a shape
    if (chooseLineOrShape < shapes.length) {
      // Choose a specific shape of the array
      let chooseShape = Math.floor(random(shapes.length));
      // Apply the color chosen above
      shapes[chooseShape].r = randomRed;
      shapes[chooseShape].g = randomGreen;
      shapes[chooseShape].b = randomBlue;
      shapes[chooseShape].a = randomAlpha;
    }
    // If the number is bigger than the shapes array, modify the color of a line
    else {
      // Choose a specific line of the array
      let chooseLine = Math.floor(random(lines.length));
      // Apply the color chosen above
      lines[chooseLine].r = randomRed;
      lines[chooseLine].g = randomGreen;
      lines[chooseLine].b = randomBlue;
      lines[chooseLine].a = randomAlpha;
    }
  }

  // (UP ARROW) start and stop the sound of lines
  else if (keyCode === UP_ARROW) {
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      //If the sound is not playing
      if (!line.playingSound) {
        line.startSound(); //play the sound
      }
      // If the sound is playing
      else {
        line.stopSound(); //stop the sound
      }
    }
  }

  // (RIGTH ARROW) start and stop the sound of big shapes
  else if (keyCode === RIGHT_ARROW) {
    for (let i = 0; i < bigShapes.length; i++) {
      let bigShape = bigShapes[i];

      //If the sound is not playing
      if (bigShape.playingSound === false) {
        bigShape.oscillator.start(); //Start the sound
        //Set the playingSound variables to true
        bigShape.playingSound = true;
        bigPlayingSound = true;

        //If the sound is playing
      } else if (bigShape.playingSound === true) {
        bigShape.oscillator.stop(); //Stop the sound
        //Set the playingSound variables to false
        bigShape.playingSound = false;
        bigPlayingSound = false;
      }
    }
  }

  // (DOWN ARROW) start and stop the sound of small shapes
  else if (keyCode === DOWN_ARROW) {
    for (let i = 0; i < smallShapes.length; i++) {
      let smallShape = smallShapes[i];

      //If the sound is not playing
      if (smallShape.playingSound === false) {
        smallShape.oscillator.start(); //Start the sound
        //Set the playingSound variables to true
        smallShape.playingSound = true;
        smallPlayingSound = true;

        //If the sound is playing
      } else if (smallShape.playingSound === true) {
        smallShape.oscillator.stop(); //Stop the sound
        //Set the playingSound variables to false
        smallShape.playingSound = false;
        smallPlayingSound = false;
      }
    }
  }

  // (LEFT ARROW) create a new big shape taking the sound into consideration
  else if (keyCode === LEFT_ARROW) {
    //If statement to determine wether the sound associated with the new shape should be heard or not

    //If the other shapes' sound are NOT playing
    if (!bigPlayingSound) {
      let bigShape = new BigShape(shapes.length + 1, false); //create a new shape

      bigShape.oscillator = new p5.Envelope(
        bigShape.t1,
        bigShape.l1,
        bigShape.t2,
        bigShape.l2
      ); //create an envelop for the sound of the new shape
      bigShape.oscillator = new p5.Oscillator(bigShape.freq, `sine`); //create an oscillator for the new shape
      bigShapes.push(bigShape); //add the shape to the bigShapes array
      bigShape.choosePoints(); //create/choose the points of the shape

      shapes.push(bigShape); //add the shape to the shapes array

      reverb.process(bigShape.oscillator, 3, 2); //adds a reverb effect to the sound
    }
    //If the other shapes' sound are playing
    else {
      let bigShape = new BigShape(shapes.length + 1, true); //create a new shape

      bigShape.oscillator = new p5.Envelope(
        bigShape.t1,
        bigShape.l1,
        bigShape.t2,
        bigShape.l2
      ); //create an envelop for the sound of the new shape
      bigShape.oscillator = new p5.Oscillator(bigShape.freq, `sine`); //create an oscillator for the new shape
      bigShapes.push(bigShape); //add the shape to the bigShapes array
      bigShape.choosePoints(); //create/choose the points of the shape

      shapes.push(bigShape); //add the shape to the shapes array

      reverb.process(bigShape.oscillator, 3, 2); //adds a reverb effect to the sound
      bigShape.oscillator.start(); //starts the sound for this shape too
    }
  }

  // (M) create a new small shape taking the sound into consideration
  else if (keyCode === 109 || keyCode === 77) {
    //If statement to determine wether the sound associated with the new shape should be heard or not

    //If the other shapes' sound are NOT playing
    if (!smallPlayingSound) {
      let smallShape = new SmallShape(shapes.length + 1, false); //create a new shape

      smallShape.oscillator = new p5.Envelope(
        smallShape.t1,
        smallShape.l1,
        smallShape.t2,
        smallShape.l2
      ); //create an envelop for the sound of the new shape
      smallShape.oscillator = new p5.Oscillator(smallShape.freq, `sine`); //create an oscillator for the new shape
      smallShapes.push(smallShape); //add the shape to the smallShapes array
      smallShape.choosePoints(); //create/choose the points of the shape

      shapes.push(smallShape); //add the shape to the shapes array

      reverb.process(smallShape.oscillator, 3, 2); //adds a reverb effect to the sound
    }
    //If the other shapes' sound are playing
    else {
      let smallShape = new SmallShape(shapes.length + 1, true); //create a new shape

      smallShape.oscillator = new p5.Envelope(
        smallShape.t1,
        smallShape.l1,
        smallShape.t2,
        smallShape.l2
      ); //create an envelop for the sound of the new shape
      smallShape.oscillator = new p5.Oscillator(smallShape.freq, `sine`); //create an oscillator for the new shape
      smallShapes.push(smallShape); //add the shape to the smallShapes array
      smallShape.choosePoints(); //create/choose the points of the shape

      shapes.push(smallShape); //add the shape to the shapes array

      reverb.process(smallShape.oscillator, 3, 2); //adds a reverb effect to the sound
      smallShape.oscillator.start(); //starts the sound for this shape too
    }
  }

  // (BACKSPACE) add a lightning-like line (it appears and disappears in a flash)
  else if (keyCode === BACKSPACE) {
    let line = new Line(random(1000)); //create the line
    line.spaceBetweenPoints = 0.1; //continuous line (no visible space between points)
    // color white
    line.r = 255;
    line.g = 255;
    line.b = 255;
    line.a = 255;

    line.makeLine(); //create the line point by point
  }

  // (CTRL) delete a shape when pressing
  else if (keyCode === CONTROL) {
    shapes[0].oscillator.stop(); //stops the sound for the first shape of the array
    shapes.splice(0, 1); //deletes the first shape of the array
  }

  // (A) change the thickness of all the shapes and lines
  else if (keyCode === 97 || keyCode === 65) {
    // If the first line of the array is thick
    if (lines[0].strokeWeight > 2) {
      for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        shape.changeThinckness(); //changes the thickness of the shape everytime
        shape.strokeWeight = shape.smallStroke; //make the shapes' stroke thin
      }
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        line.changeThinckness(); //changes the thickness of the line everytime
        line.strokeWeight = line.smallStroke; //make the lines thin
        line.spaceBetweenPoints = line.smallSpaceBetweenPoints; //make space between points smaller
      }
    }
    // If the first line fo the array is thin
    else {
      for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        shape.changeThinckness(); //changes the thickness of the shape everytime
        shape.strokeWeight = shape.bigStroke; //make the shapes' stroke thick
      }
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        line.changeThinckness(); //changes the thickness of the line everytime
        line.strokeWeight = line.bigStroke; //make the lines thick
        line.spaceBetweenPoints = line.bigSpaceBetweenPoints; //make space between points bigger
      }
    }
  }

  // (C) change the thickness of a shape or line
  else if (keyCode === 99 || keyCode === 67) {
    // choose a random number between 0 and the total number of moving objects
    let chooseLineOrShape = Math.floor(random(shapes.length + lines.length));

    // If the number is smaller than the shapes array, modify the thickness of a shape
    if (chooseLineOrShape < shapes.length) {
      // Choose a specific shape of the array
      let chooseShape = Math.floor(random(shapes.length));

      shapes[chooseShape].changeThinckness(); //changes the thickness of the shape everytime

      // If the stroke is thick
      if (shapes[chooseShape].strokeWeight > 5) {
        // Make it thin
        shapes[chooseShape].strokeWeight = shapes[chooseShape].smallStroke;
      } else {
        // Otherwise, make it thick
        shapes[chooseShape].strokeWeight = shapes[chooseShape].bigStroke;
      }
    }
    // If the number is bigger than the shapes array, modify the color of a line
    else {
      // Choose a specific line of the array
      let chooseLine = Math.floor(random(lines.length));

      lines[chooseLine].changeThinckness(); //changes the thickness of the line everytime

      // If the stroke is thick
      if (lines[chooseLine].strokeWeight > 5) {
        // Make it thin
        lines[chooseLine].strokeWeight = lines[chooseLine].smallStroke;
        // Make the space between points small
        lines[chooseLine].spaceBetweenPoints =
          lines[chooseLine].smallSpaceBetweenPoints;
      } else {
        // Otherwise, make it thick
        lines[chooseLine].strokeWeight = lines[chooseLine].bigStroke;
        // Make the space between points big
        lines[chooseLine].spaceBetweenPoints =
          lines[chooseLine].bigSpaceBetweenPoints;
      }
    }
  }

  // (T) change the distortion range of the shapes
  else if (keyCode === 116 || keyCode === 84) {
    // Choose a coordinate of the array
    let chooseDistRange = Math.floor(random(smallDistRange.length));
    // As long as the chosen coordinate is the same as the current one
    while (chooseDistRange === currentDistRange) {
      // Continue choosing one (to make sure there is a change everytime the key is pressed)
      chooseDistRange = Math.floor(random(smallDistRange.length));
    }

    // For every shape
    for (let i = 0; i < shapes.length; i++) {
      let shape = shapes[i];
      // If the shape is a small one
      if (shape.numCoordinates === 8) {
        // apply the small distortion range chosen from the array
        shape.distortionRange = smallDistRange[chooseDistRange];
      }
      // If the shape is a big one
      else if (shape.numCoordinates === 16) {
        // apply the big distortion range chosen from the array
        shape.distortionRange = bigDistRange[chooseDistRange];
      }
    }
    // Change the current distortion range to the one that was just applied
    currentDistRange = chooseDistRange;
  }
}
