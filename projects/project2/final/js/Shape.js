/**
This class is the super class for the big and small shape classes
*/
class Shape {
  constructor(origin, smallest, biggest, sound, minFreq, maxFreq, amp) {
    //middle of the shape
    this.xCenter = random(0, width);
    this.yCenter = random(0, height);

    this.size = random(smallest, biggest);
    // different stroke size
    this.smallStroke = random(1, 5);
    this.bigStroke = random(5, 15);
    this.strokeWeight = this.smallStroke;
    // colors
    this.chooseRed = random(50, 100);
    this.chooseGreen = random(80, 120);
    this.chooseBlue = random(100, 255);
    this.chooseAlpha = random(120, 210);
    this.r = this.chooseRed;
    this.g = this.chooseGreen;
    this.b = this.chooseBlue;
    this.a = this.chooseAlpha;

    //movements
    this.t = -1000 * origin;
    this.speed = 0.002;
    //movement points
    this.t1 = random(0, 1000);
    this.distortionRange = 0;

    // Everything related to sound in that class is from the make some noise exercise
    this.freqRange = [minFreq, maxFreq];
    this.freq = random(20, 840); //initial frequency
    this.amp = amp;

    //envelop test (taken from the p5.js envelop library: https://p5js.org/reference/#/p5.Envelope)
    this.t1 = random(10); // attack time in seconds
    this.l1 = random(10); // attack level 0.0 to 1.0
    this.t2 = random(10); // decay time in seconds
    this.l2 = random(10); // decay level  0.0 to 1.0

    this.reverbTime = random(0.5, 15);
    this.reverbDecay = random(0.0, 10);
    this.oscillator = undefined;
    this.playingSound = sound; //Sees if the sound is playing
  }

  // Makes the whole shape move across the canvas
  move() {
    // Uses noise to move the center coordinates of the shape
    this.xCenter = map(noise(this.t), 0, 1, -100, width + 100);
    this.yCenter = map(noise(this.t + 100), 0, 1, -100, height + 100);
    // add speed to t to make the shape actually move
    this.t += this.speed;
  }

  //Chooses the range of the sound associated with the circle's coordinates
  sound() {
    //Applies the range of the frequency
    this.freq = map(
      this.xCenter,
      0,
      width,
      this.freqRange[0],
      this.freqRange[1]
    );

    //Louder when the shape is at the top and quieter when the shape is closer to the bottom of the canvas
    this.amp = map(this.yCenter, 0, height, 0.2, 0.6);
  }

  //Puts the info from the xCoordinate and yCoordinate arrays into xDistortedCoordinates and yDistortedCoordinates
  choosePoints() {
    for (let i = 0; i < this.xCoordinate.length; i++) {
      let x = this.xCoordinate[i];
      this.xDistortedCoordinates.push(x);

      let y = this.yCoordinate[i];
      this.yDistortedCoordinates.push(y);
    }
  }

  // Make each point of the shape move in a certain margin from its original position
  distort() {
    let a = 0; //so that not every point has the movements

    for (let i = 0; i < this.xDistortedCoordinates.length; i++) {
      a += 100;

      // map by how much the original x coordinate can move (what is the range of motion possible)
      let x = map(
        noise(this.t1 + a),
        0,
        1,
        -this.distortionRange / 2,
        this.distortionRange
      );

      a += 100;

      // map by how much the original y coordinate can move (what is the range of motion possible)
      let y = map(
        noise(this.t1 + a),
        0,
        1,
        -this.distortionRange / 2,
        this.distortionRange
      );

      // Add the distortion (x and y) to the original coordinates to get the coordinates of the distorted point
      this.xDistortedCoordinates[i] = this.xCoordinate[i] + x;
      this.yDistortedCoordinates[i] = this.yCoordinate[i] + y;
    }
    // add speed to t1 to make the points actually move
    this.t1 += this.speed;
  }

  // Set the order the colors go through when they change
  colorChange() {
    // Create a rotation with the colors being blueish -> orange/pink -> green
    if (this.r === this.chooseRed) {
      this.r = this.chooseBlue;
      this.g = this.chooseRed;
      this.b = this.chooseGreen;
    } else if (this.r === this.chooseBlue) {
      this.r = this.chooseGreen;
      this.g = this.chooseBlue;
      this.b = this.chooseRed;
    } else if (this.r === this.chooseGreen) {
      this.r = this.chooseRed;
      this.g = this.chooseGreen;
      this.b = this.chooseBlue;
    } else {
      this.r = this.chooseGreen;
      this.g = this.chooseBlue;
      this.b = this.chooseRed;
    }
  }

  // change the thickness of the shape's stroke
  changeThinckness() {
    this.smallStroke = random(1, 5);
    this.bigStroke = random(5, 15);
  }

  // display the shape
  display(numCoordinate) {
    push();
    strokeWeight(this.strokeWeight);
    noFill();
    stroke(this.r, this.g, this.b, this.a);

    //forming the shape
    beginShape();
    // last point of the array (not drawn but used to curve the beginning of the shape)
    curveVertex(
      this.xCenter + this.xDistortedCoordinates[numCoordinate],
      this.yCenter + this.yDistortedCoordinates[numCoordinate]
    );
    // loop to draw all the points
    for (let i = 0; i < this.xDistortedCoordinates.length; i++) {
      curveVertex(
        this.xCenter + this.xDistortedCoordinates[i],
        this.yCenter + this.yDistortedCoordinates[i]
      );
    }
    // first point to close the shape
    curveVertex(
      this.xCenter + this.xDistortedCoordinates[0],
      this.yCenter + this.yDistortedCoordinates[0]
    );
    // second point (not drawn but used to curve the end of the shape => same use as the first curveVertex)
    curveVertex(
      this.xCenter + this.xDistortedCoordinates[1],
      this.yCenter + this.yDistortedCoordinates[1]
    );

    endShape();
    pop();
  }
}
