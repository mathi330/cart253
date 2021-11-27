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

    this.stroke = {
      r: random(150, 200),
      g: random(10, 80),
      b: random(100, 200),
      a: random(230, 255),
    };
    this.strokeWeight = 1.5;

    //Sound
    this.freqRange = [20, 940]; //100, 500?
    this.numPoints = []; //Array to count the number of points in the line
    this.numOscillators = 50;
    this.listOscillators = [];
    for (let i = 0; i < this.numOscillators; i++) {
      let myOscillator = new p5.Oscillator(440, `sine`);
      this.listOscillators.push(myOscillator);
      myOscillator.start();
    }
    this.playingSound = undefined; //Sees if the sound is playing
  }

  makeLine() {
    stroke(this.stroke.r, this.stroke.g, this.stroke.b, this.stroke.a);
    strokeWeight(this.strokeWeight);

    //Create each point of the line
    for (let i = 0; i < width; i += this.spaceBetweenPoints) {
      let y = height * noise(this.myNoise, i / 1000);

      let aPoint = new MyPoint();
      aPoint.point = point(i, y); //Create a point for the line
      aPoint.y = y;

      //Counting the points
      this.numPoints.push(aPoint);

      this.myNoise += this.speed;
    }
    let incrPointForOscillator = Math.floor(
      this.numPoints.length / this.numOscillators
    );

    for (let i = 0; i < this.listOscillators.length; i++) {
      let osc = this.listOscillators[i];
      let indPoint = i * incrPointForOscillator;

      if (indPoint < this.numPoints.length) {
        //Map the freq for that point
        let myFreq = map(
          this.numPoints[indPoint].y,
          height,
          0,
          this.freqRange[0],
          this.freqRange[1]
        );
        osc.freq(myFreq);
      }
    }
  }
}

/**
Inspiration and original code for the movement of the line from John Connolly (teacher in Cegep)
https://editor.p5js.org/Mat412/sketches/ZvfGtIyX6
*/
