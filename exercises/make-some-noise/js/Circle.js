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

    this.freq = random(20, 2000);
    this.amp = 0.2;
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
    let r = map(micLevel, 0, 1, 0, 255 - this.stroke.r);
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
