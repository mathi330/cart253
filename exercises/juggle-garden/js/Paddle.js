class Paddle {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.x = width / 2;
    this.y = height - this.height / 2;
    this.ax = 0;
    this.acceleration = 1;
    this.vx = 0;
    this.friction = 0.93;
    this.maxSpeed = 100;
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

  die(state) {
    if (this.width <= 5) {
      state = `dead`;
    }
  }

  display() {
    push();
    fill(255);
    noStroke();
    rectMode(CENTER);
    this.width = constrain(this.width, 0, width / 2);
    ellipse(this.x, this.y, this.width, this.height);
    pop();
  }
}
