/**
This class is the super class for the big and small shape classes
*/
class Shape {
  constructor(origin, smallest, biggest, sound, minFreq, maxFreq, amp) {
    //middle of the shape
    this.xCenter = random(0, width);
    this.yCenter = random(0, height);

    this.size = random(smallest, biggest);
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

  move() {
    this.xCenter = map(noise(this.t), 0, 1, -100, width + 100);
    this.yCenter = map(noise(this.t + 100), 0, 1, -100, height + 100);
    this.t += this.speed;
  }

  //Chooses the range of the sound associated with the circle's coordinates
  sound() {
    //Applies the range of the frequence
    this.freq = map(
      this.xCenter,
      0,
      width,
      this.freqRange[0],
      this.freqRange[1]
    );

    this.amp = map(this.yCenter, 0, height, 0.2, 0.6); //Louder when the circle is at the top and quieter when the circle is closer to the bottom of the canvas
  }

  //puts the info from the xCoordinate and yCoordinate arrays into xDistortedCoordinates and yDistortedCoordinates
  choosePoints() {
    for (let i = 0; i < this.xCoordinate.length; i++) {
      let x = this.xCoordinate[i];
      this.xDistortedCoordinates.push(x);

      let y = this.yCoordinate[i];
      this.yDistortedCoordinates.push(y);
    }
  }

  distort() {
    let a = 0;

    for (let i = 0; i < this.xDistortedCoordinates.length; i++) {
      a += 100;

      let x = map(
        noise(this.t1 + a),
        0,
        1,
        -this.distortionRange / 2,
        this.distortionRange
      );

      a += 100;

      let y = map(
        noise(this.t1 + a),
        0,
        1,
        -this.distortionRange / 2,
        this.distortionRange
      );

      this.xDistortedCoordinates[i] = this.xCoordinate[i] + x;
      this.yDistortedCoordinates[i] = this.yCoordinate[i] + y;
    }
    this.t1 += this.speed;
  }

  colorChange() {
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

  changeThinckness() {
    this.smallStroke = random(1, 5);
    this.bigStroke = random(5, 15);
  }

  display(numCoordinate) {
    push();
    strokeWeight(this.strokeWeight);
    noFill();
    stroke(this.r, this.g, this.b, this.a);

    //forming the shape
    beginShape();
    curveVertex(
      this.xCenter + this.xDistortedCoordinates[numCoordinate],
      this.yCenter + this.yDistortedCoordinates[numCoordinate]
    );
    for (let i = 0; i < this.xDistortedCoordinates.length; i++) {
      curveVertex(
        this.xCenter + this.xDistortedCoordinates[i],
        this.yCenter + this.yDistortedCoordinates[i]
      );
    }
    curveVertex(
      this.xCenter + this.xDistortedCoordinates[0],
      this.yCenter + this.yDistortedCoordinates[0]
    );
    curveVertex(
      this.xCenter + this.xDistortedCoordinates[1],
      this.yCenter + this.yDistortedCoordinates[1]
    );

    // center of the shape
    // ellipse(this.xCenter, this.yCenter, 1);
    endShape();
    pop();
  }
}
