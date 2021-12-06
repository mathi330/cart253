/**
This is a class to create a line with independent points. The line moves like waves.
*/
class Line {
  constructor(origin) {
    this.myNoise = 1000 * origin;

    //speed at which the line moves
    this.speed = random(0.000004, 0.000005);
    // distance between each point of the line
    this.spaceBetweenPoints = random(1, 6);

    this.strokeWeight = 1.5;
    // colors
    this.chooseRed = random(150, 200);
    this.chooseGreen = random(10, 80);
    this.chooseBlue = random(100, 200);
    this.chooseAlpha = random(230, 255);
    this.r = this.chooseRed;
    this.g = this.chooseGreen;
    this.b = this.chooseBlue;
    this.a = this.chooseAlpha;

    //Sound
    this.freqRange = [20, 1200]; //100, 500? 20, 940? 300, 800?
    this.ampChoice = random(0.01, 0.03); //choose the amplitude of the oscillators
    this.numPoints = []; //Array to count the number of points in the line

    this.playingSound = false; //Sees if the sound is playing

    //The number of oscillators per line
    this.numOscillators = 15;
    this.listOscillators = [];
    //Create all the oscillators that will be used in the line
    for (let i = 0; i < this.numOscillators; i++) {
      let myOscillator = new p5.Oscillator(440, `sine`);
      this.listOscillators.push(myOscillator);
      // If statement to see if the sound is playing from the start of the program or not
      if (!this.playingSound) {
        myOscillator.stop(); //Start the program without sound
      } else if (this.playingSound) {
        myOscillator.start();
      }
    }
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

  makeLine() {
    stroke(this.r, this.g, this.b, this.a);
    strokeWeight(this.strokeWeight);

    //Create each point of the line
    for (let i = 0; i < width; i += this.spaceBetweenPoints) {
      //Choose the y position of the point to create a continuity between previous and next points
      let y = height * noise(this.myNoise, i / 1000);

      //Create the point and store its informations in the MyPoint class
      let aPoint = new MyPoint();
      aPoint.point = point(i, y);
      aPoint.y = y;

      //Counting the points by adding the last one in the array
      this.numPoints.push(aPoint);

      //Make the line move
      this.myNoise += this.speed;
    }

    //Find the number of points between each oscillators to place them at equal distance from one another
    let incrPointForOscillator = Math.floor(
      this.numPoints.length / this.numOscillators
    );

    //Place/associate each oscillator to a point using the incrPointForOscillator variable
    for (let i = 0; i < this.listOscillators.length; i++) {
      let osc = this.listOscillators[i];
      let indPoint = i * incrPointForOscillator;

      //If statement to make sure the last oscillator is not outside of the canvas
      if (indPoint < this.numPoints.length) {
        //Map the freq for that point
        let myFreq = map(
          this.numPoints[indPoint].y,
          height,
          0,
          this.freqRange[0],
          this.freqRange[1]
        );

        //Set the frequence and amplitude of the oscillator
        osc.freq(myFreq);
        osc.amp(this.ampChoice);
      }
    }
  }

  stopSound() {
    for (let i = 0; i < this.listOscillators.length; i++) {
      let myOscillator = this.listOscillators[i];
      this.playingSound = false;
      myOscillator.stop();
    }
  }

  startSound() {
    for (let i = 0; i < this.listOscillators.length; i++) {
      let myOscillator = this.listOscillators[i];
      this.playingSound = true;
      myOscillator.start();
    }
  }
}

/**
Inspiration and original code for the movement of the line from John Connolly (teacher in Cegep)
https://editor.p5js.org/Mat412/sketches/ZvfGtIyX6
*/
