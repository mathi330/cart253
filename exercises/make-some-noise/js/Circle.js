class Circle {
  constructor(start, sound) {
    this.x = random(0, width);
    this.y = random(0, height);
    this.size = random(20, 100);
    this.minSize = this.size;
    this.maxSize = this.size * 3;
    this.strokeWeight = random(1, 7);
    this.stroke = {
      r: random(50, 120),
      g: random(80, 180),
      b: random(150, 255),
      a: random(100, 200),
    };

    this.t = 1000 * start;
    this.speed = 0.003;

    //2 possible ranges of frequency
    this.freqRange1 = [-50, 440];
    this.freqRange2 = [440, 840];
    this.freqRange3 = [20, 940];
    this.freq = random(20, 840); //initial frequency
    this.amp = 0.1;

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

  //Makes the circle move using noise
  move() {
    this.x = map(noise(this.t), 0, 1, -100, width + 100);
    this.y = map(noise(this.t + 200), 0, 1, -100, height + 100);
    this.t += this.speed;
  }

  //Chooses the range of the sound associated with the circle's coordinates
  sound() {
    let myFreq = random(this.freqRange1, this.freqRange2, this.freqRange3); //Chooses the range of the frequence for the circle
    //Applies the reange of the frequence according to the range chosen above
    if (myFreq === this.freqRange1) {
      this.freq = map(this.x, 0, width, this.freqRange1[0], this.freqRange1[1]);
    } else if (myFreq === this.freqRange2) {
      this.freq = map(this.x, 0, width, this.freqRange2[0], this.freqRange2[1]);
    } else if (myFreq === this.freqRange3) {
      this.freq = map(this.x, 0, width, this.freqRange3[0], this.freqRange3[1]);
    }

    this.amp = map(this.y, 0, height, 0.1, 0); //Louder when the circle is at the top and quieter when the circle is closer to the bottom of the canvas
  }

  //Make the color and size of the circle change by using the audio input from a mic
  colorChange() {
    let micLevel = mic.getLevel();

    //size
    let newSize = this.size + micLevel * 10;
    newSize = constrain(newSize, this.minSize, this.maxSize); //Stops the circle from becoming too big or too small.
    this.size = newSize;

    //color => becomes more red/pink
    let red = this.stroke.r + micLevel * 255;
    this.stroke.r = red;
  }

  //Creates and displays the circle
  display() {
    push();
    noFill();
    strokeWeight(this.strokeWeight);
    stroke(this.stroke.r, this.stroke.g, this.stroke.b, this.stroke.a);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
