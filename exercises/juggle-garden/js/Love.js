class Love {
  constructor() {
    this.x = random(0, width);
    this.y = random(-400, -100);
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.maxSpeed = 10;
    this.gravityForce = 0.0025;
    this.size = 10;
    this.color = color(255, 51, 255);
    this.active = true;
    this.win = false;
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

    //Sees if the ball fell.
    if (this.y - this.size / 2 > height) {
      this.active = false;
    }
  }

  //Make the ball bounce when it is on the paddle.
  bounce(paddle) {
    //Sees if the ball is on the paddle.
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

      this.size += 2;
    }
  }

  display() {
    push();
    strokeWeight(5);
    stroke(this.color);
    noFill();
    ellipse(this.x, this.y, this.size);

    //Win the game if the love bubble gets big enough.
    if (this.size >= 100) {
      this.win = true;
    }
    pop();
  }
}
