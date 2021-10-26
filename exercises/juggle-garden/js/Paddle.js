class Paddle {
  constructor() {
    this.width = 300;
    this.height = 20;
    this.x = width / 2;
    this.y = height - this.height / 2 - 10;
    this.ax = 0;
    this.acceleration = 1;
    this.vx = 0;
    this.friction = 0.93;
    this.maxSpeed = 100;
    this.active = true;
  }

  // Creates friction when moving.
  handleFriction() {
    if (keyIsDown(RIGHT_ARROW)) {
      this.ax = this.acceleration;
    } else if (keyIsDown(LEFT_ARROW)) {
      this.ax = -this.acceleration;
    } else {
      this.ax = 0;
    }
  }

  // Applies the friction to the movements.
  move() {
    this.vx += this.ax;
    this.vx *= this.friction;
    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.x += this.vx;
    this.x = constrain(this.x, this.width / 2, width - this.width / 2);
  }

  display() {
    push();
    fill(255);
    noStroke();
    this.width = constrain(this.width, 0, width / 2);
    ellipse(this.x, this.y, this.width, this.height);
    if (this.width <= 5) {
      this.active = false;
    }
    pop();
  }
  reset() {
    push();
    fill(255);
    noStroke();
    this.width = 300;
    this.x = width / 2;
    this.active = true;
  }
}
