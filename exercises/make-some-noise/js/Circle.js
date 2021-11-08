class Circle {
  constructor(start) {
    this.x = random(0, width);
    this.y = random(0, height);
    this.size = random(20, 100);
    this.strokeWeight = random(1, 7);
    this.stroke = color(
      random(100, 255),
      random(100, 255),
      random(100, 255),
      random(100, 200)
    );

    this.t = 1000 * start;
    this.speed = 0.003;

    this.shape = [`sine`, `triangle`, `square`, `sawtooth`];
    this.chooseShape = random(this.shape);
    this.freq = random(20, 2000);
    this.amp = 0.2;
    this.oscillator = undefined;
  }

  move() {
    this.x = map(noise(this.t), 0, 1, 0, width);
    this.y = map(noise(this.t + 200), 0, 1, 0, height);
    this.t += this.speed;
  }

  sound() {
    this.freq = map(this.x, 0, width, 20, 990);
    this.amp = map(this.y, 0, height, 0, 0.2);
  }

  display() {
    push();
    noFill();
    strokeWeight(this.strokeWeight);
    stroke(this.stroke);

    ellipse(this.x, this.y, this.size);
    pop();
  }
}
