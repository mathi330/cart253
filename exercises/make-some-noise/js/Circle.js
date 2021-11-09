class Circle {
  constructor(start) {
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

    this.freq = random(20, 800);
    this.amp = 0.2;

    //envelop test (taken from the p5.js envelop library: https://p5js.org/reference/#/p5.Envelope)
    this.t1 = random(10); // attack time in seconds
    this.l1 = random(10); // attack level 0.0 to 1.0
    this.t2 = random(10); // decay time in seconds
    this.l2 = random(10); // decay level  0.0 to 1.0

    this.reverbTime = random(0.5, 15);
    this.reverbDecay = random(0.0, 10);
    this.oscillator = undefined;
    this.playingSound = false;
  }

  move() {
    this.x = map(noise(this.t), 0, 1, -100, width + 100);
    this.y = map(noise(this.t + 200), 0, 1, -100, height + 100);
    this.t += this.speed;
  }

  sound() {
    this.freq = map(this.x, 0, width, 20, 990);
    this.amp = map(this.y, 0, height, 0, 0.2);
  }

  colorChange() {
    let micLevel = mic.getLevel();

    //size
    let newSize = this.size + micLevel * 10;
    newSize = constrain(newSize, this.minSize, this.maxSize);
    this.size = newSize;

    //color
    let red = this.stroke.r + micLevel * 255;
    this.stroke.r = red;
  }

  display() {
    push();
    noFill();
    strokeWeight(this.strokeWeight);
    stroke(this.stroke.r, this.stroke.g, this.stroke.b, this.stroke.a);

    ellipse(this.x, this.y, this.size);
    pop();
  }
}
