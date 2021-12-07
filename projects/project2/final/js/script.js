/**
Prototype
Mathilde Davan

This file is the main script for the project. It is used to setup and display the
shapes from the different classes to code the interactions.

The sound for the big and small shapes was taken from the make some noise exercise:
https://mathi330.github.io/cart253/exercises/make-some-noise/
*/

"use strict";

//Background
let bgColor = 0;

//Shapes
let bigShapes = [];
let numBigShapes = 2;

let smallShapes = [];
let numSmallShapes = 3;

let shapes = [];

//Lines
let lines = [];
let numLines = 2;

//Sound
let reverb;
let bigPlayingSound = false;
let smallPlayingSound = false;

//Variables for the change in distortion in the keyboard interactions
let currentDistRange = 0;

//Array with all the possible changes
let randomChange = [
  `bg color`,
  `one color`,
  `all colors`,
  `lightning`,
  `one thickness`,
  `all thickness`,
];
let chooseChange;

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
      createShape(bigShape, bigShapes);
    }
    // Create the small shapes
    else if (i >= numBigShapes) {
      let smallShape = new SmallShape(i, false); //create a new small shape
      createShape(smallShape, smallShapes);
    }
  }

  //Create the lines
  for (let i = 0; i < numLines; i++) {
    let line = new Line(i); //create a new line
    lines.push(line); //add the line at the end of the lines array
  }
}

/**
createShape()
Create a shape and pushes it into the appropriate array
*/
function createShape(shape, shapeArray) {
  shape.oscillator = new p5.Envelope(shape.t1, shape.l1, shape.t2, shape.l2); //create an envelop for the sound of the new shape
  shape.oscillator = new p5.Oscillator(shape.freq, `sine`); //create an oscillator for the new shape
  shapeArray.push(shape); //add the shape to the bigShapes array
  shape.choosePoints(); //create/choose the points of the shape

  shapes.push(shape); //add the shape to the shapes array

  reverb.process(shape.oscillator, 3, 2); //adds a reverb effect to the sound
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
modifications
depending on what the text in the chooseChange array, a different modification will happen
*/
function modifications() {
  // Change of color for the background
  if (chooseChange === `bg color`) {
    if (bgColor === 0) {
      bgColor = 255; // if black background, it turns white
    } else {
      bgColor = 0; // if white background, it turns black
    }
  }
  // Change the color of one shape or line
  else if (chooseChange === `one color`) {
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
  // Change the color of all the shapes and lines
  else if (chooseChange === `all color`) {
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
  // Create a lightning-like line (appears and disappears quickly)
  else if (chooseChange === `lightning`) {
    let line = new Line(random(1000)); //create the line
    line.spaceBetweenPoints = 0.1; //continuous line (no visible space between points)

    // If the background is black
    if (bgColor === 0) {
      // white colored line
      line.r = 255;
      line.g = 255;
      line.b = 255;
      line.a = 255;
    }
    // If the background is white
    else {
      // black colored line
      line.r = 0;
      line.g = 0;
      line.b = 0;
      line.a = 255;
    }

    line.makeLine(); //create the line point by point
  }
  // Change the thickness of one shape or line
  else if (chooseChange === `one thickness`) {
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
  // Change the thickness of all the shapes and lines
  else if (chooseChange === `all thickness`) {
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
    // If the first line of the array is thin
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
}

/**
keyPressed()
All the keyboard interactions
*/
function keyPressed() {
  //(Z) change the thickness of a shape or line
  if (keyCode === 122 || keyCode === 90) {
    chooseChange = `one thickness`;
    modifications();
  }

  // (Y) change the color of one moving object at random
  else if (keyCode === 121 || keyCode === 89) {
    chooseChange = `one color`;
    modifications();
  }

  // (C) start and stop the sound of big shapes
  else if (keyCode === 99 || keyCode === 67) {
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

  // (V) start and stop the sound of small shapes
  else if (keyCode === 118 || keyCode === 86) {
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

  // (X) start and stop the sound of lines
  else if (keyCode === 120 || keyCode === 88) {
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

  // (A) delete a shape when pressing
  else if (keyCode === 97 || keyCode === 65) {
    shapes[0].oscillator.stop(); //stops the sound for the first shape of the array
    shapes.splice(0, 1); //deletes the first shape of the array
  }

  // (BACKSPACE) create a new big shape taking the sound into consideration
  else if (keyCode === BACKSPACE) {
    //If statement to determine wether the sound associated with the new shape should be heard or not

    //If the other shapes' sound are NOT playing
    if (!bigPlayingSound) {
      let bigShape = new BigShape(shapes.length + 1, false); //create a new shape
      createShape(bigShape, bigShapes);
    }
    //If the other shapes' sound are playing
    else {
      let bigShape = new BigShape(shapes.length + 1, true); //create a new shape
      createShape(bigShape, bigShapes);

      bigShape.oscillator.start(); //starts the sound for this shape too
    }
  }

  // (ENTER) create a new small shape taking the sound into consideration
  else if (keyCode === ENTER) {
    //If statement to determine wether the sound associated with the new shape should be heard or not

    //If the other shapes' sound are NOT playing
    if (!smallPlayingSound) {
      let smallShape = new SmallShape(shapes.length + 1, false); //create a new shape
      createShape(smallShape, smallShapes);
    }
    //If the other shapes' sound are playing
    else {
      let smallShape = new SmallShape(shapes.length + 1, true); //create a new shape
      createShape(smallShape, smallShapes);

      smallShape.oscillator.start(); //starts the sound for this shape too
    }
  }

  // (SHIFT) add a lightning-like line (it appears and disappears in a flash)
  else if (keyCode === SHIFT) {
    chooseChange = `lightning`;
    modifications();
  }

  // (UP_ARROW) change background color
  if (keyCode === UP_ARROW) {
    chooseChange = `bg color`;
    modifications();
  }

  // (DOWN_ARROW) change all the shapes and lines' color
  else if (keyCode === DOWN_ARROW) {
    chooseChange = `all color`;
    modifications();
  }

  // (LEFT_ARROW) change the thickness of all the shapes and lines
  else if (keyCode === LEFT_ARROW) {
    chooseChange = `all thickness`;
    modifications();
  }

  // (RIGHT_ARROW) change the distortion range of the shapes
  else if (keyCode === RIGHT_ARROW) {
    // Choose a coordinate of the array
    let chooseDistRange = Math.floor(random(shapes[0].distortion.length));
    // As long as the chosen coordinate is the same as the current one
    while (chooseDistRange === currentDistRange) {
      // Continue choosing one (to make sure there is a change everytime the key is pressed)
      chooseDistRange = Math.floor(random(shapes[0].distortion.length));
    }

    // For every shape
    for (let i = 0; i < shapes.length; i++) {
      let shape = shapes[i];
      // If the shape is a small one
      if (shape.numCoordinates === 8) {
        // apply the small distortion range chosen from the array
        shape.distortionRange = shape.distortion[chooseDistRange];
      }
      // If the shape is a big one
      else if (shape.numCoordinates === 16) {
        // apply the big distortion range chosen from the array
        shape.distortionRange = shape.distortion[chooseDistRange];
      }
    }
    // Change the current distortion range to the one that was just applied
    currentDistRange = chooseDistRange;
  }

  // If it is none of the keys from above (using 'else' alone or 'keyCode !== (keys mentioned above)' does not work properly)
  // In the if() those are the key codes for every key except the ones for the keys mentioned in the ifs above
  else if (
    keyCode === 0 ||
    keyCode === 9 ||
    keyCode === 17 ||
    keyCode === 18 ||
    keyCode === 20 ||
    keyCode === 27 ||
    keyCode === 32 ||
    keyCode === 33 ||
    keyCode === 34 ||
    keyCode === 35 ||
    keyCode === 36 ||
    keyCode === 45 ||
    keyCode === 46 ||
    keyCode === 48 ||
    keyCode === 49 ||
    keyCode === 50 ||
    keyCode === 51 ||
    keyCode === 52 ||
    keyCode === 53 ||
    keyCode === 54 ||
    keyCode === 55 ||
    keyCode === 56 ||
    keyCode === 57 ||
    keyCode === 76 ||
    keyCode === 59 ||
    keyCode === 61 ||
    keyCode === 66 ||
    keyCode === 68 ||
    keyCode === 69 ||
    keyCode === 70 ||
    keyCode === 71 ||
    keyCode === 72 ||
    keyCode === 73 ||
    keyCode === 74 ||
    keyCode === 75 ||
    keyCode === 77 ||
    keyCode === 78 ||
    keyCode === 79 ||
    keyCode === 80 ||
    keyCode === 81 ||
    keyCode === 82 ||
    keyCode === 83 ||
    keyCode === 84 ||
    keyCode === 85 ||
    keyCode === 87 ||
    keyCode === 91 ||
    keyCode === 96 ||
    keyCode === 97 ||
    keyCode === 98 ||
    keyCode === 99 ||
    keyCode === 100 ||
    keyCode === 101 ||
    keyCode === 102 ||
    keyCode === 103 ||
    keyCode === 104 ||
    keyCode === 105 ||
    keyCode === 106 ||
    keyCode === 107 ||
    keyCode === 109 ||
    keyCode === 110 ||
    keyCode === 111 ||
    keyCode === 128 ||
    keyCode === 144 ||
    keyCode === 173 ||
    keyCode === 181 ||
    keyCode === 182 ||
    keyCode === 183 ||
    keyCode === 188 ||
    keyCode === 190 ||
    keyCode === 191 ||
    keyCode === 192 ||
    keyCode === 219 ||
    keyCode === 220 ||
    keyCode === 221 ||
    keyCode === 222
  ) {
    // choose a random change from the randomChange array
    chooseChange = random(randomChange);
    modifications();
  }
}

/**
keyboard organization:

13 changes:
  1- Z = change the thickness of one thing
  2- Y = change the color of one thing
  3- C = big shape sound
  4- V = small shape sound
  5- X = line sound
  6- A = delete shape
  7- backspace = create new big shape
  8- enter = create new small shape
  9- shift = lightning
  10- up arrow = change background color
  11- down arrow = change everything's color
  12- left arrow = change everything's thickness
  13- rigth arrow = change everything's distortion range


Not working for the "else if" at the end...
  keyCode !== 122 ||
  keyCode !== 90 ||
  keyCode !== 121 ||
  keyCode !== 89 ||
  keyCode !== 99 ||
  keyCode !== 67 ||
  keyCode !== 118 ||
  keyCode !== 86 ||
  keyCode !== 120 ||
  keyCode !== 88 ||
  keyCode !== 97 ||
  keyCode !== 65 ||
  keyCode !== BACKSPACE ||
  keyCode !== ENTER ||
  keyCode !== SHIFT ||
  keyCode !== UP_ARROW ||
  keyCode !== DOWN_ARROW ||
  keyCode !== LEFT_ARROW ||
  keyCode !== RIGHT_ARROW
*/
