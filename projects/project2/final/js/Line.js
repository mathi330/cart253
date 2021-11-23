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
    this.freq = random(20, 940);
    this.amp = 0.05;
    this.numPoints = []; //Array to count the number of points in the line
    this.freqPoint = []; //Keeps the frequency for each point
    this.playingSound = undefined; //Sees if the sound is playing
  }

  makeLine() {
    stroke(this.stroke.r, this.stroke.g, this.stroke.b, this.stroke.a);
    strokeWeight(this.strokeWeight);

    //Create each point of the line
    for (let i = 0; i < width; i += this.spaceBetweenPoints) {
      let y = height * noise(this.myNoise, i / 1000);

      let newPoint = point(i, y); //Create a point for the line
      let newFreq = map(y, height, 0, this.freqRange[0], this.freqRange[1]); //Map the freq for that point

      //Counting the points
      this.numPoints.push(newPoint);
      //Associating the point with a frequency
      this.freqPoint.push(newFreq);

      this.myNoise += this.speed;
    }
  }

  // makeSound() {
  //   for (let j = 0; j < this.numPoints.length; j++) {
  //     this.numPoints[j].freq;
  //     this.numPoints[j].amp;
  //     this.numPoints[j].start;
  //   }
  // }
}

/**
Inspiration and original code for the movement of the line from John Connolly (teacher in Cegep)
https://editor.p5js.org/Mat412/sketches/ZvfGtIyX6
*/
