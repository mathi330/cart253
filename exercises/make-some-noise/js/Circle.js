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
  }

  move() {
    this.x = map(noise(this.t), 0, 1, 0, width);
    this.y = map(noise(this.t + 200), 0, 1, 0, height);
    this.t += this.speed;
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
