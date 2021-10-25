class Paddle {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.x = width / 2;
    this.y = height - this.height / 2;
    this.ax = 0;
    this.acceleration = 0.3;
    this.vx = 0;
    this.friction = 0.93;
    this.maxSpeed = 30;
  }

  handleFriction() {
    if (keyIsDown(RIGHT_ARROW)) {
      this.ax = this.acceleration;
    } else if (keyIsDown(LEFT_ARROW)) {
      this.ax = -this.acceleration;
    } else {
      this.ax = 0;
    }
  }

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
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
