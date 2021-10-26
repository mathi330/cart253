class Anger {
  constructor() {
    this.x = random(0, width);
    this.y = random(-400, -100);
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.maxSpeed = 10.5;
    this.gravityForce = 0.0027;
    this.size = 80;
    this.color = color(255, 100, 100);
    this.active = true;
  }

  gravity() {
    this.ay += this.gravityForce;
  }

  move() {
    this.vx = this.vx + this.ax;
    this.vy = this.vy + this.ay;

    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

    //Make the ball bounce of the sides of the canvas when they touch.
    if (this.x - this.size / 2 <= 0 || this.x + this.size / 2 >= width) {
      this.vx = -this.vx;
    }

    //Adding the velocity to the x position.
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    if (this.y - this.size / 2 > height) {
      this.active = false;
    }
  }

  //Make the ball bounce when it is on the paddle.
  bounce(paddle) {
    if (
      this.x > paddle.x - paddle.width / 2 &&
      this.x < paddle.x + paddle.width / 2 &&
      this.y + this.size / 2 > paddle.y - paddle.height / 2 &&
      this.y - this.size / 2 < paddle.y + paddle.height / 2
    ) {
      // Bounce
      let dx = this.x - paddle.x;
      this.vx = this.vx + map(dx, -paddle.width / 2, paddle.width / 2, -2, 2);

      this.vy = -this.vy;
      this.ay = 0;

      //Makes the paddle get smaller when they touch.
      if (paddle.width <= 30) {
        paddle.width = 0;
      } else {
        paddle.width -= 10;
      }
    }
  }

  display() {
    push();
    strokeWeight(5);
    stroke(this.color);
    noFill();
    ellipse(this.x, this.y, this.size);
    pop();
  }

  reset() {}
}
